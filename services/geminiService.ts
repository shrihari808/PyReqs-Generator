import { GoogleGenAI, Type } from "@google/genai";

export interface Conflict {
  packages: string[];
  description: string;
}

export interface GenerateRequirementsResponse {
  requirements: string;
  conflicts: Conflict[];
}

// Fix: Directly use process.env.API_KEY as per Google GenAI SDK guidelines.
// The SDK and downstream error handling will manage cases where the key is invalid or missing.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const readFileAsText = (file: File): Promise<{ path: string; content: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const path = (file as any).webkitRelativePath || file.name;
      resolve({ path, content: reader.result as string });
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        requirements: {
            type: Type.STRING,
            description: "The full content of the requirements.txt file, with one package per line.",
        },
        conflicts: {
            type: Type.ARRAY,
            description: "A list of potential dependency conflicts found in the codebase.",
            items: {
                type: Type.OBJECT,
                properties: {
                    packages: {
                        type: Type.ARRAY,
                        description: "The package or packages involved in the conflict.",
                        items: { type: Type.STRING },
                    },
                    description: {
                        type: Type.STRING,
                        description: "A detailed explanation of the conflict, including which files are involved if possible.",
                    },
                },
                required: ["packages", "description"],
            },
        },
    },
    required: ["requirements", "conflicts"],
};


export const generateRequirements = async (files: File[]): Promise<GenerateRequirementsResponse> => {
  // Fix: Removed redundant API key check. The try/catch block below provides robust error handling
  // for API calls, including authentication issues. This aligns with the guideline to assume the
  // API key is configured.

  const fileContents = await Promise.all(files.map(readFileAsText));

  const combinedCode = fileContents.map(file => 
    `--- START FILE: ${file.path} ---\n${file.content}\n--- END FILE: ${file.path} ---`
  ).join('\n\n');

  const prompt = `
You are an expert Python dependency analysis tool. Your task is to generate a requirements.txt file and identify potential dependency conflicts from a given Python codebase.

Analyze the following Python code, which is provided as a set of concatenated files. The file path for each file is provided.

Instructions:
1.  **Generate requirements.txt**:
    *   Identify all external library imports (e.g., 'import pandas', 'from fastapi import FastAPI').
    *   Exclude standard Python libraries (e.g., os, sys, json, etc.).
    *   Scrutinize the code, comments, and docstrings for any hints about specific versions (e.g., "requires requests>=2.25").
    *   If a version is hinted at, use it (e.g., "numpy==1.21.0"). Otherwise, list only the package name.
    *   Format this as a valid requirements.txt string.

2.  **Identify Dependency Conflicts**:
    *   After generating the requirements list, analyze it against the code for potential conflicts.
    *   Look for cases where the code uses features from a newer version of a library than what might be specified or implied elsewhere.
    *   Identify if different files imply different versions of the same library.
    *   If no direct conflicts are found, this array should be empty. Provide a clear, user-friendly description for each conflict found.

3.  **Important Rule on Exclusions**:
    *   Completely ignore any files whose paths contain '/venv/' or '/__pycache__/'. Do not analyze them or derive any dependencies from them, even if they are present in the input.

4.  **Format Output**:
    *   Return the final output as a single JSON object matching the provided schema. The 'requirements' field should be a string, and 'conflicts' should be an array of objects.
    *   DO NOT include any extra text, explanations, or markdown formatting outside of the JSON object.

Python Codebase:
${combinedCode}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
      }
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Basic validation
    if (typeof result.requirements === 'string' && Array.isArray(result.conflicts)) {
        return result;
    } else {
        throw new Error("AI response did not match the expected format.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("The provided Gemini API key is not valid. Please check your configuration.");
    }
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse the AI's response. The model returned invalid JSON.");
    }
    throw new Error("Failed to generate requirements. The AI model could not process the request.");
  }
};