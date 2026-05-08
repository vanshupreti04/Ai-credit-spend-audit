import { NextResponse } from "next/server";
import { buildGeminiAuditPrompt } from "@/lib/gemini-report";
import type { AuditResult } from "@/lib/audit-engine";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function POST(request: Request) {
  console.log("Generate report API called");

  try {
    let body;

    try {
      body = await request.json();
      console.log("Request body received:", body);
    } catch (err) {
      console.error("Invalid JSON body:", err);

      return NextResponse.json(
        {
          error: "Invalid request JSON body",
          details: err instanceof Error ? err.message : "Unknown JSON error",
        },
        { status: 400 },
      );
    }

    const result = body?.result as AuditResult;

    if (!result) {
      console.error("Missing result in request body:", body);

      return NextResponse.json(
        { error: "Missing audit result in request body" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    console.log("Gemini API key exists:", Boolean(apiKey));

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 },
      );
    }

    let prompt;

    try {
      prompt = buildGeminiAuditPrompt(result);
      console.log("Prompt created successfully");
      console.log("Prompt length:", prompt.length);
    } catch (err) {
      console.error("Prompt build failed:", err);

      return NextResponse.json(
        {
          error: "Failed to build Gemini prompt",
          details: err instanceof Error ? err.message : "Unknown prompt error",
        },
        { status: 500 },
      );
    }

    console.log("Sending request to Gemini...");

    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
        },
      }),
    });

    console.log("Gemini response status:", response.status);
    console.log("Gemini response statusText:", response.statusText);

    const rawText = await response.text();

    console.log("Gemini raw response:", rawText);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Gemini request failed",
          status: response.status,
          statusText: response.statusText,
          rawResponse: rawText,
        },
        { status: 500 },
      );
    }

    let data;

    try {
      data = JSON.parse(rawText);
      console.log("Gemini JSON parsed successfully:", data);
    } catch (err) {
      console.error("Failed to parse Gemini response JSON:", err);

      return NextResponse.json(
        {
          error: "Gemini response was not valid JSON",
          rawResponse: rawText,
        },
        { status: 500 },
      );
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("Gemini generated text:", text);

    if (!text) {
      return NextResponse.json(
        {
          error: "No text returned from Gemini",
          rawGeminiResponse: data,
        },
        { status: 500 },
      );
    }

    let report;

    try {
      report = JSON.parse(text);
      console.log("Final report JSON parsed:", report);
    } catch (err) {
      console.error("Gemini returned invalid report JSON:", text);

      return NextResponse.json(
        {
          error: "Gemini returned invalid JSON report",
          rawText: text,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Unexpected generate report route error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate AI report",
        details: error instanceof Error ? error.message : "Unknown error",
        stack:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 },
    );
  }
}