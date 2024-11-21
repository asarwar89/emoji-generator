import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const prediction = await replicate.predictions.create({
      version:
        "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      input: {
        prompt: `A TOK emoji of ${prompt}`,
        apply_watermark: false,
      },
    });

    // Poll until the prediction is complete
    let result;
    while (!result?.output) {
      result = await replicate.predictions.get(prediction.id);
      if (result.status === "succeeded") {
        break;
      }
      if (result.status === "failed") {
        throw new Error("Prediction failed");
      }
      // Wait for a second before polling again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ output: result.output });
  } catch (error) {
    console.error("Error generating emoji:", error);
    return NextResponse.json(
      { error: "Failed to generate emoji" },
      { status: 500 }
    );
  }
}
