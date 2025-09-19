# AI

This directory contains all the generative AI-related code for the application, leveraging the Genkit framework.

## Files

-   `genkit.ts`: This is the core file for Genkit configuration. It initializes and configures the Genkit instance, including setting up plugins (like `googleAI`) and defining a default model. The exported `ai` object is used throughout the application to define and run AI flows.

-   `dev.ts`: This file is used as the entry point for the Genkit development server (`genkit start`). It is responsible for importing all the defined AI flows so that Genkit's development UI can discover and display them for testing and debugging.
