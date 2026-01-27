import { Trash2 } from "lucide-react";

interface BottomActionsProps {
  onClear: () => void;
  onDownloadAll: () => void;
  hasItems: boolean;
}

export function BottomActions({ onClear, onDownloadAll, hasItems }: BottomActionsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="flex gap-3 max-w-md mx-auto">
        <button
          onClick={onClear}
          disabled={!hasItems}
          className="flex-1 py-3 px-6 rounded-xl bg-card/70 backdrop-blur-sm shadow-card font-medium text-card-foreground flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-4 w-4" />
          Clear List
        </button>
        <button
          onClick={onDownloadAll}
          disabled={!hasItems}
          className="flex-1 py-3 px-6 rounded-xl bg-destructive/90 backdrop-blur-sm text-destructive-foreground font-medium shadow-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download All
        </button>
      </div>
    </div>
  );
}
