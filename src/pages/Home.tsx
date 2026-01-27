import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { FloatingActions } from "@/components/FloatingActions";
import backgroundImage from "@/assets/background-home.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (url: string) => {
    // Navigate to downloads with the URL
    navigate("/downloads", { state: { newUrl: url } });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Subtle overlay for better text visibility at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Clock display */}
        <div className="pt-16 pb-8 text-center">
          <p className="text-primary-foreground/90 text-sm font-medium tracking-wider drop-shadow-lg">
            {formatDate(currentTime)}
          </p>
          <h1 className="text-7xl font-bold text-primary-foreground tracking-tight drop-shadow-lg mt-1">
            {formatTime(currentTime)}
          </h1>
        </div>

        {/* Search bar - positioned in upper third */}
        <div className="mt-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Spacer to push floating actions down */}
        <div className="flex-1" />

        {/* Floating action buttons */}
        <FloatingActions />
      </div>
    </div>
  );
}
