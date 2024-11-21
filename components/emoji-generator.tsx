"use client";

import { Download, Heart, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface EmojiGeneratorProps {
  onGenerate: (prompt: string) => Promise<string>;
}

export function EmojiGenerator({ onGenerate }: EmojiGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmoji, setGeneratedEmoji] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    try {
      const result = await onGenerate(prompt);
      setGeneratedEmoji(result);
    } catch (error) {
      console.error("Failed to generate emoji:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Enter a prompt to generate emoji..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleGenerate} disabled={isGenerating || !prompt}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {generatedEmoji && (
        <Card className="p-4">
          <div className="relative group">
            <img
              src={generatedEmoji}
              alt="Generated emoji"
              className="w-32 h-32 object-contain mx-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="mr-2">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
