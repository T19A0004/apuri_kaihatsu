"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function formatTime(timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).format(new Date());
}

export default function TimeClocks() {
  const [localTime, setLocalTime] = useState<string | null>(null);
  const [japanTime, setJapanTime] = useState<string | null>(null);

  useEffect(() => {
    // Set the initial time after component mounts
    setLocalTime(formatTime(Intl.DateTimeFormat().resolvedOptions().timeZone));
    setJapanTime(formatTime("Asia/Tokyo"));

    const interval = setInterval(() => {
      setLocalTime(formatTime(Intl.DateTimeFormat().resolvedOptions().timeZone));
      setJapanTime(formatTime("Asia/Tokyo"));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-8 px-4 py-2 rounded-md shadow-sm">
      {/* Local Time */}
      <div className="flex items-center gap-4">
        <Clock className="h-6 w-6 text-primary" />
        <div>
          <div className="text-sm font-medium text-muted-foreground text-nowrap">Local Time</div>
          <div className="text-xl font-bold">
            {localTime ?? "--:--"} {/* Placeholder for server render */}
          </div>
        </div>
      </div>
      {/* Japan Time */}
      <div className="flex items-center gap-4">
        <Clock className="h-6 w-6 text-primary" />
        <div>
          <div className="text-sm font-medium text-muted-foreground text-nowrap">Japan Time</div>
          <div className="text-xl font-bold">
            {japanTime ?? "--:--"} {/* Placeholder for server render */}
          </div>
        </div>
      </div>
    </div>
  );
}
