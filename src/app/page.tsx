'use client'
import { IpoDashboard } from "@/components/ipo-dashboard";

export default function HomePage() {
  const lastUpdated = new Date(); // Or fetch this from your data source

  const handleRefresh = () => {
    // Add refresh logic here
  };

  return (
    <main>
      <IpoDashboard lastUpdated={lastUpdated} onRefresh={handleRefresh} />
      {/* Rest of your homepage content */}
    </main>
  );
}