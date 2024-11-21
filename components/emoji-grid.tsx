"use client";

import { Download, Heart } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmojiItem {
  id: string;
  url: string;
  likes: number;
}

export function EmojiGrid() {
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);

  useEffect(() => {
    // Fetch emojis from Supabase here
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      {emojis.map((emoji) => (
        <Card key={emoji.id} className="p-4">
          <div className="relative group">
            <img
              src={emoji.url}
              alt="Generated emoji"
              className="w-full aspect-square object-contain"
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
      ))}
    </div>
  );
}
