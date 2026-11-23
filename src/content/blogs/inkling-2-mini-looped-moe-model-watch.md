---
title: 'Inkling 2 Mini: A Looped MoE Model Worth Testing on a 32GB Laptop'
description: 'A practical look at Thinking Machines Lab’s trending Inkling 2 Mini: its looped MoE architecture, memory trade-offs, multimodal use, and a quick Transformers test.'
pubDate: '2026-11-23'
tags: ['AI', 'Hugging Face', 'LLM', 'Open Models', 'Multimodal', 'Local AI', 'Model Watch']
readtime: '11 min read'
---

# Inkling 2 Mini: A Looped MoE Model Worth Testing on a 32GB Laptop

Inkling 2 Mini is one of the models drawing the most attention on Hugging Face this week. Thinking Machines Lab released it on November 20, 2026, and it appeared at the top of the Hub's trending list on November 23. The interest is not just about another 26-billion-parameter checkpoint: the model reuses a set of transformer layers three times, combining a relatively compact stored model with additional computation during inference.

That architecture makes Inkling 2 Mini worth examining for developers experimenting with local coding assistants, image-aware applications, and agent workflows. It is not a universal replacement for hosted models, and the memory requirements are more substantial than the word *Mini* suggests.

## 1. Why it is trending

The [Hugging Face model page](https://huggingface.co/thinkingmachines/Inkling-2-Mini) lists Inkling 2 Mini as a multimodal, open-weight model with an Apache 2.0 license. It accepts text and images and generates text. The model is designed for coding assistants, agentic workflows, retrieval-augmented generation, chat and visual tasks.

A dated Hugging Face trending snapshot on November 23 placed the repository at #1. Trending is a measure of recent interest, not a quality ranking, and its position can change. The release itself is more interesting than the chart: it offers a different way to spend inference compute without storing a much deeper model's full set of weights.

## 2. The looped transformer architecture

Inkling 2 Mini stores 24 decoder layers. The middle 12 layers—layers 6 through 17—are run three times with shared weights. The first six and final six layers run once.

The result is 48 layer applications per token, but the model still stores the weights for 24 layers. The repeated middle block is not a separate copy of those weights.

| Property | Inkling 2 Mini |
|---|---|
| Stored parameters | 26.4B |
| Active parameters (single pass) | 3.4B |
| Effective active parameters, including looping | About 5.4B |
| Decoder | 24 layers; middle 12 run three times |
| Experts | 8 of 128 routed per layer |
| Context window | Up to 1 million tokens |
| Input | Text and images |
| Output | Text |
| Weight format | Mixed NVFP4 and MXFP8 |

The model uses sparse Mixture-of-Experts (MoE) feed-forward layers. Rather than activate every expert for each token, it routes to eight of 128 experts per layer. Looping adds computation through the shared middle block; the model card estimates about 1.0B effective active parameters per extra pass, reaching roughly 5.4B with the three-pass configuration.

The attention pattern also mixes local and global attention. This architecture is designed to balance compute and long-context processing, but the advertised context window should not be mistaken for a promise that a million-token prompt will fit comfortably in every local setup.

## 3. Why looping matters to developers

A traditional way to increase model capacity is to add more layers or parameters. Looped architectures reuse weights while revisiting selected layers. This creates a trade-off: more computation can be spent on a token without storing an entirely new set of parameters for each pass.

Thinking Machines Lab says looping improves reasoning and long-horizon agentic work. Its release reports 48.2% on DeepSWE v1.1, 79.2% on SWE-bench Verified and 77.9% on SWE-bench Pro v2 Hard. Those results are vendor-reported; evaluation setups vary between models and should not be treated as a controlled, independent comparison.

For application developers, the practical questions are:

- Does the model complete repository tasks with fewer retries?
- Does it follow tool schemas reliably?
- Can it inspect screenshots or diagrams as well as text?
- Does its latency and memory usage fit the application's budget?
- Does it perform well on your own tests rather than only the published benchmark?

A looped architecture is a design choice, not proof of better results for every task. More computation may help difficult reasoning, but factual knowledge and task performance still need to be evaluated.

## 4. Can it run locally?

The model card describes a checkpoint of roughly 20GB, using NVFP4 for most weights and MXFP8 for the last four layers. Thinking Machines Lab recommends Apple Silicon systems with at least 32GB of memory, a DGX Spark, or other GPUs with around 32GB or more of VRAM as a starting point.

That is a starting point, not a guarantee:

- **Memory is more than the checkpoint.** Runtime overhead, vision processing, temporary tensors and the KV cache all consume additional memory.
- **Long context is expensive.** The one-million-token maximum does not mean a 32GB device can serve that many tokens at practical speed or memory usage.
- **Image resolution affects workload.** The model card suggests image dimensions between 40 and 4096 pixels for optimal performance; larger inputs or multiple images can increase processing requirements.
- **Platform support matters.** The official card lists Transformers, vLLM, SGLang and other inference frameworks, with Ollama and Exo Labs on Apple Silicon. Check current compatibility before choosing a runtime.

If you have a 16GB laptop, do not assume the standard checkpoint will fit simply because it has a small active-parameter count. Stored weights, not just active parameters, affect memory requirements.

## 5. Try image-and-text inference with Transformers

The model is supported in the current Hugging Face Transformers documentation. This short example uses the pipeline API and a public test image. It is a starting point for testing visual question answering, not a performance benchmark.

Install the dependencies:

```bash
pip install -U transformers accelerate torch
```

The model implementation was contributed to Transformers on November 21. If your installed release does not recognize the `inkling2_loop` architecture, upgrade to a Transformers version that includes the implementation or follow the official documentation's source-install instructions. Keep this experiment in an isolated environment.

Create `test_inkling.py`:

```python
import torch
from transformers import pipeline

model_id = "thinkingmachines/Inkling-2-Mini"

pipe = pipeline(
    "image-text-to-text",
    model=model_id,
    dtype=torch.bfloat16,
    device_map="auto",
)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "image": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/pipeline-cat-chonk.jpeg",
            },
            {
                "type": "text",
                "text": "Describe the animal and the visible surroundings.",
            },
        ],
    },
]

result = pipe(
    messages,
    max_new_tokens=256,
    return_full_text=False,
)

print(result[0]["generated_text"])
```

Run it:

```bash
python test_inkling.py
```

The first run downloads the model files, so allow time and disk space for the download. The pipeline example follows the model's official Transformers documentation. I have not executed this script independently; verify the environment, device placement and generated output on your hardware before relying on it.

## 6. Build a small evaluation before integrating it

If you want to use Inkling 2 Mini in a coding assistant or agent, test it with a repeatable set of tasks instead of a single impressive demo.

Start with a small evaluation set:

1. **Code understanding:** ask it to explain a function and identify an edge case without changing the code.
2. **Patch generation:** give it a small bug and require a patch plus a test.
3. **Visual context:** provide a screenshot of a UI or an error and ask for a structured description.
4. **Tool use:** test a tool call with valid and invalid arguments; ensure your application validates the arguments independently.
5. **Long-context retrieval:** place a fact at the beginning of a long document and ask a question that requires combining it with information near the end.

Record task success, response quality, latency, peak memory and the number of retries. Compare those results with another model using the same prompts, runtime, hardware and evaluation criteria. This will reveal whether the architecture is useful for your workload.

## 7. License, safety and limitations

The model repository lists Apache 2.0, and the model card also links an acceptable-use policy. Read both before distributing a product or deploying it in a regulated or sensitive environment. An open-weight license does not make model outputs reliable or remove the need for application-level safeguards.

For agents, keep tool permissions outside the model. Validate tool arguments, restrict access to data, require approval for consequential actions, and treat model-generated code and external tool output as untrusted. Looping may improve a model's reasoning on some tasks, but it does not make an agent's actions inherently safe.

## Conclusion

Inkling 2 Mini is a notable model release because it combines sparse MoE routing, shared-weight looping, multimodal input and a roughly 20GB checkpoint. It is a promising candidate for local experiments on devices with 32GB or more of memory, particularly when coding, visual context or multi-step reasoning matters.

The best way to evaluate it is to run a small workload-specific test and measure the trade-offs. The architecture is interesting, the release is accessible, and the reported results are worth investigating—but your own evaluation should decide whether it belongs in your application.

## References

- [Thinking Machines Lab: Introducing Inkling 2 Mini (November 20, 2026)](https://thinkingmachines.ai/news/inkling-2-mini/)
- [Official Inkling 2 Mini model card](https://thinkingmachines.ai/model-card/inkling-2-mini/)
- [Hugging Face repository](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
- [Hugging Face Transformers documentation for Inkling 2 Mini](https://huggingface.co/docs/transformers/model_doc/inkling2_loop)
- [Hugging Face: Welcome Inkling 2 Mini (November 20, 2026)](https://huggingface.co/blog/inkling2mini)
- [Hugging Face Trending snapshot, November 23, 2026](https://trendoday.com/hugging-face/models/2026/11/23)
