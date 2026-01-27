import { useState } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack = false }: HeaderProps) {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const handleSelectFolder = async () => {
    // This would typically open a file picker or settings modal
    // For now, show an alert - in a real app this would integrate with file system API
    alert("Download folder selection would open here. This feature requires native app integration.");
    setShowSettings(false);
  };

  return (
    <>
      <header className="bg-primary/80 backdrop-blur-sm pt-12 pb-6 px-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
          {showBack ? (
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          ) : (
            <div className="w-10" />
          )}
          <h1 className="text-xl font-semibold text-primary-foreground">{title}</h1>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/10 transition-colors"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Settings dropdown */}
      {showSettings && (
        <div className="absolute top-24 right-4 z-50 bg-card/90 backdrop-blur-sm rounded-xl shadow-card p-3 min-w-48">
          <button
            onClick={handleSelectFolder}
            className="w-full text-left px-3 py-2 text-sm font-medium text-card-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            Select Download Folder
          </button>
        </div>
      )}
    </>
  );
}
