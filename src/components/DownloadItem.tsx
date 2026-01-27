import { Check, Clock, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type DownloadStatus = "downloading" | "completed" | "queued" | "paused";

export interface Download {
  id: string;
  title: string;
  thumbnail: string;
  quality?: string;
  size: string;
  progress?: number;
  status: DownloadStatus;
  timestamp?: string;
}

interface DownloadItemProps {
  download: Download;
  isExpanded?: boolean;
  onTogglePause?: (id: string) => void;
  onClick?: () => void;
}

export function DownloadItem({
  download,
  isExpanded = false,
  onTogglePause,
  onClick,
}: DownloadItemProps) {
  const { id, title, thumbnail, quality, size, progress, status, timestamp } = download;

  return (
    <div
      className={cn(
        "bg-card/70 backdrop-blur-sm rounded-2xl shadow-card overflow-hidden transition-all duration-300",
        isExpanded && "ring-2 ring-primary/30"
      )}
    >
      <div className="p-3 flex gap-3 cursor-pointer" onClick={onClick}>
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground text-sm truncate">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {quality || "Video"} • {size}
          </p>
          {status === "downloading" && progress !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          {status === "completed" && timestamp && (
            <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
          )}
          {status === "queued" && (
            <p className="text-xs text-muted-foreground mt-1">Queued</p>
          )}
        </div>

        {/* Status indicator */}
        <div className="flex items-center">
          {status === "downloading" && progress !== undefined && (
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="3"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeDasharray={`${progress} 100`}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-card-foreground">
                {progress}%
              </span>
            </div>
          )}
          {status === "completed" && (
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <Check className="h-5 w-5 text-success-foreground" />
            </div>
          )}
          {status === "queued" && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Expanded controls */}
      {isExpanded && status === "downloading" && (
        <div className="px-3 pb-3">
          <button
            onClick={() => onTogglePause?.(id)}
            className="w-full py-2 rounded-lg bg-destructive/90 text-destructive-foreground font-medium text-sm flex items-center justify-center gap-2 shadow-button"
          >
            <Pause className="h-4 w-4" />
            Pause
          </button>
        </div>
      )}
    </div>
  );
}
