import {
  EyeOff,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  Upload,
  Download,
  Share2,
  Plus,
  ChevronsRight,
} from "lucide-react";

export default function ToolBar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3 p-6">
      <div className="flex items-center gap-4 text-sm text-gray-700">
        <span className="font-medium">Toolbar</span>
        <ChevronsRight className="w-5 h-5 text-gray-600" />

        <div className="h-4 w-px bg-gray-100" />
        <EyeOff className="h-4 w-4 cursor-pointer" onClick={() => console.log("Hide Fields clicked")} />
        <span>Hide Fields</span>
        <div className="h-4 w-px bg-gray-100" />
        <ArrowUpDown className="h-4 w-4 cursor-pointer" onClick={() => console.log("Sort clicked")} />
        <span>Sort</span>
        <div className="h-4 w-px bg-gray-100" />
        <Filter className="h-4 w-4 cursor-pointer" onClick={() => console.log("Filter clicked")} />
        <span>Filter</span>
        <div className="h-4 w-px bg-gray-100" />
        <LayoutGrid className="h-4 w-4 cursor-pointer" onClick={() => console.log("Cell View clicked")} />
        <span>Cell View</span>
      </div>

      <div className="flex gap-2">
        <button
          className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-sm rounded-md"
          onClick={() => console.log("Import clicked")}
        >
          <Upload className="h-4 w-4" /> Import
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-sm rounded-md"
          onClick={() => console.log("Export clicked")}
        >
          <Download className="h-4 w-4" /> Export
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 border border-blue-300 text-sm rounded-md"
          onClick={() => console.log("Share clicked")}
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1.5 bg-[#4C6B53] text-white text-sm rounded-md"
          onClick={() => console.log("New Action clicked")}
        >
          <Plus className="h-4 w-4" /> New Action
        </button>
      </div>
    </div>
  );
}
