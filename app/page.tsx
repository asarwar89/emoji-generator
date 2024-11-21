"use client";
import { EmojiGenerator } from "@/components/emoji-generator";
import { EmojiGrid } from "@/components/emoji-grid";

export default function Home() {
  const generateEmoji = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate emoji");
      }

      const data = await response.json();

      // The Replicate API returns an array of image URLs
      // We take the first one since we set num_outputs: 1
      if (Array.isArray(data.output) && data.output.length > 0) {
        return data.output[0];
      }

      throw new Error("No emoji generated");
    } catch (error) {
      console.error("Error generating emoji:", error);
      throw error;
    }
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">✨ Emoji Maker</h1>
      <EmojiGenerator onGenerate={generateEmoji} />
      <EmojiGrid />
    </main>
  );
}
