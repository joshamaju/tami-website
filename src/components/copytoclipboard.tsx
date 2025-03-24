import { useOptimistic, useTransition } from "react";

import { ClipboardCheck, ClipboardCopy } from "lucide-react";

export const CopyToClipboard = ({ text }: { text: string }) => {
  const [state, set_state] = useOptimistic<"idle" | "copied">("idle");
  const [_, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(async () => {
          navigator.clipboard.writeText(text);
          set_state("copied");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          set_state("idle");
        });
      }}
    >
      {state === "idle" ? (
        <ClipboardCopy className="w-4 h-4 text-stone-500 dark:text-stone-400 hover:text-stone-600 dark:hover:text-stone-300" />
      ) : (
        <div>
          <ClipboardCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
      )}
    </button>
  );
};
