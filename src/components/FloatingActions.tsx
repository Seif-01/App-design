import { Download, FolderOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function FloatingActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="fixed bottom-8 right-6 flex flex-col gap-3">
      <button
        onClick={() => navigate("/downloads")}
        className={`w-14 h-14 rounded-full bg-card/60 backdrop-blur-sm shadow-float flex items-center justify-center transition-colors ${
          !isHome ? "text-primary" : "text-muted-foreground hover:text-primary"
        }`}
      >
        <Download className="h-6 w-6" />
      </button>
      <button
        onClick={() => navigate("/")}
        className={`w-14 h-14 rounded-full bg-card/60 backdrop-blur-sm shadow-float flex items-center justify-center transition-colors ${
          isHome ? "text-primary" : "text-muted-foreground hover:text-primary"
        }`}
      >
        <FolderOpen className="h-6 w-6" />
      </button>
    </div>
  );
}
