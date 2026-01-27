import { useState } from "react";
import { Header } from "@/components/Header";
import { FilterTabs } from "@/components/FilterTabs";
import { DownloadItem, Download } from "@/components/DownloadItem";
import { BottomActions } from "@/components/BottomActions";
import backgroundImage from "@/assets/background-downloads.jpg";

export default function Downloads() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "downloaded">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredDownloads = activeTab === "downloaded"
    ? downloads.filter((d) => d.status === "completed")
    : downloads;

  const activeDownloads = filteredDownloads.filter((d) => d.status === "downloading" || d.status === "queued");
  const completedDownloads = filteredDownloads.filter((d) => d.status === "completed");

  const handleTogglePause = (id: string) => {
    setDownloads((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "downloading" ? "paused" : "downloading" }
          : d
      )
    );
  };

  const handleClear = () => {
    setDownloads((prev) => prev.filter((d) => d.status !== "completed"));
  };

  const handleDownloadAll = () => {
    setDownloads((prev) =>
      prev.map((d) => (d.status === "queued" ? { ...d, status: "downloading", progress: 0 } : d))
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-24">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay for transparency effect */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10">
      <Header title="Downloads" showBack />
      
      <div className="mt-4">
        <FilterTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-4 px-4 space-y-3">
        {activeDownloads.map((download) => (
          <DownloadItem
            key={download.id}
            download={download}
            isExpanded={expandedId === download.id}
            onClick={() => setExpandedId(expandedId === download.id ? null : download.id)}
            onTogglePause={handleTogglePause}
          />
        ))}

        {completedDownloads.length > 0 && (
          <>
            <p className="text-sm font-medium text-muted-foreground pt-2">Completed</p>
            {completedDownloads.map((download) => (
              <DownloadItem
                key={download.id}
                download={download}
                onClick={() => setExpandedId(expandedId === download.id ? null : download.id)}
              />
            ))}
          </>
        )}
      </div>

        <BottomActions
          hasItems={downloads.length > 0}
          onClear={handleClear}
          onDownloadAll={handleDownloadAll}
        />
      </div>
    </div>
  );
}
