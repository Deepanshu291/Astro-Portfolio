---
title: 'From Hugging Face to Ollama: Converting Models to GGUF with llama.cpp'
description: 'A step-by-step, code-focused guide to downloading a Hugging Face model, converting it to GGUF with llama.cpp, quantizing it, and running it locally with Ollama.'
pubDate: 'Jul 28 2026'
heroImage: 'src/assets/blogimage/hf-gguf.jfif'
tags:
  - AI
  - LLM
  - GGUF
  - llama.cpp
  - Ollama
  - Hugging Face
  - Qwen3
  - Local AI
  - Python
  - Machine Learning
readtime: '12 min read'
---

Running Large Language Models locally has become much easier with tools like **llama.cpp** and **Ollama**. However, many models on Hugging Face are distributed in the Transformers format, while local inference engines typically expect the **GGUF** format.

In this guide, we'll walk through the complete pipeline:

```
Hugging Face
      │
      ▼
Download Model
      │
      ▼
Convert to GGUF
      │
      ▼
Quantize
      │
      ▼
Test with llama.cpp
      │
      ▼
Import into Ollama
      │
      ▼
Run Locally
```

We'll use **Qwen3 Nano** as the example model because it is supported by `llama.cpp`.

---

# Prerequisites

You'll need:

* Python 3.10+
* Git
* CMake
* A C++ compiler (GCC, Clang, or Visual Studio)
* Hugging Face account (optional, for gated models)
* Ollama (optional, for the final step)

---

# Step 1 — Clone llama.cpp

Clone the latest repository:

```bash
git clone https://github.com/ggml-org/llama.cpp.git

cd llama.cpp
```

Why?

`llama.cpp` provides:

* GGUF converter
* Quantization tools
* CPU inference engine
* GPU acceleration (CUDA, Metal, Vulkan, HIP)
* OpenAI-compatible server

---

# Step 2 — Build llama.cpp

Linux/macOS

```bash
cmake -B build

cmake --build build --config Release
```

Windows

```powershell
cmake -B build

cmake --build build --config Release
```

After building you'll have:

```
build/bin/

├── llama-cli
├── llama-server
├── llama-quantize
├── llama-bench
└── ...
```

---

# Step 3 — Install Hugging Face Hub

Install the Python client.

```bash
pip install -U huggingface_hub
```

This library allows us to download models directly from Hugging Face.

---

# Step 4 — Authenticate (Optional)

If the model is gated or private:

```bash
huggingface-cli login
```

Paste your access token.

Public models do not require authentication.

---

# Step 5 — Download the Model

Using the CLI:

```bash
huggingface-cli download \
Qwen/Qwen3-nano \
--local-dir model
```

The downloaded directory looks like this:

```
model/

├── config.json
├── generation_config.json
├── model.safetensors
├── tokenizer.json
├── tokenizer_config.json
├── special_tokens_map.json
└── ...
```

---

# Understanding These Files

## model.safetensors

Contains the neural network weights.

This is the largest file.

---

## config.json

Contains architecture information.

Example:

```json
{
    "hidden_size": 1024,
    "num_attention_heads": 16,
    "num_hidden_layers": 24
}
```

The converter reads this file to understand how tensors should be mapped.

---

## tokenizer.json

Contains vocabulary and tokenizer rules.

Without it, the model cannot convert text into tokens.

---

# Step 6 — Convert to GGUF

Navigate to llama.cpp.

Run:

```bash
python convert_hf_to_gguf.py \
model \
--outfile Qwen3-nano-f16.gguf \
--outtype f16
```

What happens internally?

The converter:

* loads the Hugging Face configuration
* reads every tensor
* converts tensor names
* embeds tokenizer metadata
* embeds architecture metadata
* writes everything into a single GGUF file

Output:

```
Qwen3-nano-f16.gguf
```

---

# Understanding GGUF

GGUF stores:

* weights
* tokenizer
* vocabulary
* context length
* architecture metadata
* rope configuration
* special tokens

Everything is packed into one file.

---

# Step 7 — Quantize the Model

FP16 models are large.

Example:

```
2–4 GB
```

Quantization compresses weights.

Run:

```bash
./build/bin/llama-quantize \
Qwen3-nano-f16.gguf \
Qwen3-nano-Q4_K_M.gguf \
Q4_K_M
```

You can generate multiple versions.

```
Q4_K_M
Q5_K_M
Q6_K
Q8_0
```

---

# Which Quantization Should You Choose?

| Type   | Speed   | RAM     | Quality |
| ------ | ------- | ------- | ------- |
| F16    | Slow    | Highest | ⭐⭐⭐⭐⭐   |
| Q8_0   | Medium  | High    | ⭐⭐⭐⭐☆   |
| Q6_K   | Fast    | Medium  | ⭐⭐⭐⭐☆   |
| Q5_K_M | Fast    | Medium  | ⭐⭐⭐⭐☆   |
| Q4_K_M | Fastest | Lowest  | ⭐⭐⭐☆☆   |

For most users:

**Q4_K_M** is the sweet spot.

---

# Step 8 — Test the Model

Before using Ollama, verify the GGUF file.

```bash
./build/bin/llama-cli \
-m Qwen3-nano-Q4_K_M.gguf \
-i
```

Example:

```
> Explain transformers.

Transformers are neural networks...
```

If this works, your GGUF file is valid.

---

# Step 9 — Run an API Server

llama.cpp can also expose an OpenAI-compatible API.

```bash
./build/bin/llama-server \
-m Qwen3-nano-Q4_K_M.gguf
```

Default endpoint:

```
http://localhost:8080
```

Useful for integrating with applications.

---

# Step 10 — Install Ollama

Download Ollama from:

https://ollama.com

Verify installation:

```bash
ollama --version
```

---

# Step 11 — Create a Modelfile

Create:

```
Modelfile
```

Contents:

```text
FROM ./Qwen3-nano-Q4_K_M.gguf

PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER num_ctx 8192

SYSTEM """
You are a helpful AI assistant.
"""
```

This tells Ollama:

* where the model is
* context size
* generation parameters
* default system prompt

---

# Step 12 — Create the Ollama Model

```bash
ollama create qwen3-nano -f Modelfile
```

Internally, Ollama:

* reads the GGUF file
* stores it in its local model registry
* creates a reusable model

---

# Step 13 — Run the Model

```bash
ollama run qwen3-nano
```

Now you can chat with the model locally.

---

# Understanding the Entire Pipeline

```
Hugging Face

config.json
tokenizer.json
model.safetensors
        │
        ▼

convert_hf_to_gguf.py

        │
        ▼

FP16 GGUF

        │
        ▼

llama-quantize

        │
        ▼

Q4_K_M.gguf

        │
        ▼

llama-cli

(verification)

        │
        ▼

Modelfile

        │
        ▼

ollama create

        │
        ▼

ollama run
```

---

# Common Errors

## Unsupported Architecture

```
Model XXXForCausalLM is not supported
```

This means the converter does not yet support that model architecture.

Only supported architectures can be converted.

---

## Missing Tokenizer

```
Tokenizer not found
```

Ensure the tokenizer files were downloaded with the model.

---

## Incorrect Python Version

Some conversion scripts require recent versions of Python and the `transformers` library. If you encounter import or compatibility errors, update your environment before retrying.

---

# Project Resources

## Kaggle Notebook

Complete notebook covering the workflow:

https://www.kaggle.com/code/devdt21/hf-to-gguf-using-llama-cpp

## Hugging Face Repository

Generated GGUF models:

https://huggingface.co/Dev218/Qwen3-nano-GGUF

---

# Conclusion

The workflow from Hugging Face to Ollama consists of four key stages:

1. Download the original model from Hugging Face.
2. Convert it into GGUF using `llama.cpp`.
3. Quantize the GGUF model for efficient local inference.
4. Import the GGUF file into Ollama and run it locally.

Understanding each stage makes it easier to troubleshoot issues, experiment with different quantization methods, and deploy supported open-weight models efficiently on your own hardware.
