import { Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  activeTab: "all" | "downloaded";
  onChange: (tab: "all" | "downloaded") => void;
}

export function FilterTabs({ activeTab, onChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-card/70 backdrop-blur-sm rounded-xl mx-4 shadow-card">
      <button
        onClick={() => onChange("all")}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors",
          activeTab === "all" ? "text-card-foreground" : "text-muted-foreground"
        )}
      >
        <Folder className="h-4 w-4" />
        All
      </button>
      <div className="h-4 w-px bg-border" />
      <button
        onClick={() => onChange("downloaded")}
        className={cn(
          "text-sm font-medium transition-colors",
          activeTab === "downloaded" ? "text-card-foreground" : "text-muted-foreground"
        )}
      >
        Downloaded
      </button>
    </div>
  );
}
