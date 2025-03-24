import { useOptimistic, useTransition } from "react";

import { Check, Code } from "lucide-react";
import { cn } from "../lib/utils";
import { button } from "./button";

export const CopyToClipboard = () => {
  const [state, set_state] = useOptimistic<"idle" | "copied">("idle");
  const [_, startTransition] = useTransition();

  return (
    <button
      className={cn(
        button({ variant: "ghost", size: "sm" }),
        "absolute right-1 h-8 w-8 p-0 cursor-pointer"
      )}
      onClick={() => {
        startTransition(async () => {
          navigator.clipboard.writeText("npx tami-client");
          set_state("copied");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          set_state("idle");
        });
      }}
    >
      <span className="sr-only">Copy</span>

      {state === "idle" ? (
        <Code className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4" />
      )}
    </button>
  );
};
