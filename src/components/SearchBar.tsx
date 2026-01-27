import { Search, ArrowDown } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (url: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-6">
      <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-4 py-3 shadow-card">
        <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste YouTube Link or Search..."
          className="flex-1 bg-transparent text-card-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
        />
        <button 
          type="submit" 
          className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center flex-shrink-0 hover:bg-muted transition-colors"
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </form>
  );
}
