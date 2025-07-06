import { Search, Bell, MoreHorizontal } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-3 p-6 ">
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 border border-[#5D7753] rounded-md overflow-hidden flex items-center justify-start cursor-pointer"
          onClick={() => console.log("Color icon clicked")}
        >
          <div className="w-1/2 h-full bg-white" />
          <div className="w-1/2 h-full bg-[#5D7753]" />
        </div>
        <span className="text-gray-500 text-sm">Workspace &gt; Folder 2 &gt;</span>
        <span className="text-black font-medium">Spreadsheet 3</span>
        <MoreHorizontal
          className="ml-2 h-4 w-4 text-gray-500 cursor-pointer"
          onClick={() => console.log("More options clicked")}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search in the spreadsheet"
            className="pl-8 pr-4 py-1.5 rounded-md bg-gray-200 text-sm focus:outline-none"
            onChange={(e) => console.log("Search input:", e.target.value)}
          />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => console.log("Notifications clicked")}
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
            2
          </div>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => console.log("User profile clicked")}
        >
          <img
            src="https://i.pravatar.cc/32"
            alt="user avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="text-sm leading-tight">
            <p className="font-medium">Jane Doe</p>
            <p className="text-gray-500 text-xs">jane@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
