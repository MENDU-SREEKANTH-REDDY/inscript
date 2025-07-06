import { useState } from "react";

export default function TabNav() {
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

  return (
    <div className="sticky bottom-0 z-10 w-full bg-white border-t border-gray-100 flex items-center px-[52px]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            console.log(`Tab changed to: ${tab}`);
          }}
          className={`px-5 py-2 text-sm font-medium border-t-2 transition-all
            ${
              activeTab === tab
                ? "bg-[#EDF1ED] border-[#4F6E54] text-[#4F6E54]"
                : "bg-white border-transparent text-gray-600 hover:bg-[#F1F4F1]"
            }`}
        >
          {tab}
        </button>
      ))}

      <button
        className="ml-3 h-10 px-4 text-[#2d3e2f] text-sm hover:bg-[#5c755e]/20"
        onClick={() => console.log("Plus button clicked")}
      >
        +
      </button>
    </div>
  );
}
