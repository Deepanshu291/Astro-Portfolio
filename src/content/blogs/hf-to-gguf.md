---
title: 'From Hugging Face to GGUF: Building and Running Qwen3 Locally with llama.cpp and Ollama'
description: 'A hands-on walkthrough of converting a Hugging Face model into GGUF using llama.cpp, quantizing it, and running it locally with Ollama while sharing the challenges faced during the process.'
pubDate: 'Jul 28 2026'
heroImage: 'src/assets/blogimage/hf-to-gguf-llama-cpp-ollama.png'
tags: ['AI', 'LLM', 'GGUF', 'llama.cpp', 'Ollama', 'Qwen3', 'Hugging Face', 'Local AI', 'Python']
readtime: '10 min read'
---
# Building My First GGUF Model with llama.cpp and Running It on Ollama

When I first started learning about running Large Language Models locally, I kept seeing terms like **GGUF**, **llama.cpp**, and **Ollama** everywhere. Most tutorials showed how to download an already-converted GGUF model, but I wanted to understand what actually happens behind the scenes.

So I decided to build one myself.

This wasn't a perfectly smooth journey. I made a few wrong choices, ran into unsupported architectures, learned how GGUF conversion works, and eventually got everything running locally. This post is a summary of that experience.

---

## Why GGUF?

Most Hugging Face models are distributed as PyTorch checkpoints with files like:

* `config.json`
* `model.safetensors`
* `tokenizer.json`
* `generation_config.json`

These work well with the Transformers library, but they're not ideal if your goal is lightweight local inference.

GGUF is a format designed for efficient inference with tools such as:

* llama.cpp
* Ollama
* LM Studio
* KoboldCpp

Instead of dealing with multiple files and a Python environment, everything is packaged into a single optimized file.

That made me curious enough to learn how the conversion process actually works.

---

# My First Attempt: BananaMind2

Initially, I decided to use **BananaMind2 Medium**.

The model looked interesting, and I thought converting it would be straightforward.

I cloned `llama.cpp`, downloaded the model, and ran the conversion script.

Instead of getting a GGUF file, I was greeted with this:

```text
Model BananaMind2MediumForCausalLM is not supported
```

At first, I assumed I had done something wrong.

I rebuilt `llama.cpp`, updated it, checked the documentation, and tried again.

Same result.

---

# Digging Deeper

Rather than giving up immediately, I wanted to understand *why* it wasn't supported.

I started reading the model's source code.

That led me into exploring files like:

* `modeling_bananamind2medium.py`
* `configuration_bananamind2medium.py`

I also inspected the model's weight names and configuration.

While comparing them with supported architectures in `llama.cpp`, I learned that the converter only supports architectures that have explicit conversion and runtime implementations.

BananaMind2 uses its own architecture class:

```python
BananaMind2MediumForCausalLM
```

Since `llama.cpp` doesn't recognize that architecture, the converter stops before producing a GGUF file.

Although I couldn't convert it, this turned out to be one of the most valuable parts of the project because it helped me understand how model architectures differ and why support has to be added explicitly.

---

# Switching to Qwen3 Nano

Since my goal was to learn the complete GGUF workflow, I decided to continue with a model that is officially supported.

I chose **Qwen3 Nano**.

This time the process was much smoother.

I downloaded the model from Hugging Face, cloned the latest version of `llama.cpp`, and converted the model into GGUF.

After conversion, I generated different quantized versions, including:

* Q4_K_M
* Q5_K_M

These quantized models require less memory while still maintaining good quality for local inference.

---

# Running the Model with llama.cpp

Once the GGUF file was ready, testing it was straightforward.

Using `llama-cli`, I verified that the model loaded correctly and generated responses locally.

This was the first time I saw the entire pipeline working—from a Hugging Face checkpoint to a locally running GGUF model.

---

# Importing into Ollama

The next step was integrating the model with Ollama.

I created a simple `Modelfile`, pointed it to my GGUF file, and created a custom model.

After that, I could simply run:

```bash
ollama run qwen3-nano
```

Seeing the model respond through Ollama made the whole workflow feel complete.

---

# What I Learned

This project taught me much more than just running a command.

I learned:

* how Hugging Face models are structured
* what GGUF actually contains
* why quantization matters
* how `llama.cpp` performs model conversion
* how Ollama uses GGUF models internally
* why not every Hugging Face model can be converted immediately

More importantly, I became comfortable reading model code instead of treating it as a black box.

---

# Challenges I Faced

Every project has a few obstacles, and this one was no different.

Some of the issues I ran into included:

* `IndentationError` caused by an extra space after a line-continuation (`\`) in a Kaggle notebook.
* Understanding why `trust_remote_code=True` wasn't the real issue when converting BananaMind2.
* Discovering that `llama.cpp` only supports specific model architectures.
* Learning how to inspect `config.json`, model implementation files, and tensor names to understand compatibility.
* Figuring out the correct workflow for creating and using GGUF models with Ollama.
* Creating a proper Hugging Face repository with a model card and metadata.

Each challenge pushed me to read documentation, inspect source code, and understand the tools instead of simply copying commands.

---

# Resources

## Kaggle Notebook

Complete notebook used throughout this project:

https://www.kaggle.com/code/devdt21/hf-to-gguf-using-llama-cpp

## Hugging Face Repository

Generated GGUF models:

https://huggingface.co/Dev218/Qwen3-nano-GGUF

---

# What's Next?

Although I paused the BananaMind2 conversion for now, I didn't abandon it.

After spending time reading its implementation, configuration, and weight mappings, I now have a much better understanding of why it isn't supported by `llama.cpp` out of the box.

My next goal is to explore what it would take to add support for BananaMind2 by studying its architecture in more detail and comparing it with existing implementations such as Llama and Gemma.

I'll share that journey in a future post once I have a working prototype.

Thanks for reading, and I hope this write-up helps anyone who wants to understand what really happens between a Hugging Face model and a GGUF model running locally.
