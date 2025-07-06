import { useEffect } from "react";


import {
  MoreHorizontal,
  Plus,
  Briefcase,
  Calendar,
  CircleCheck,
  User,
  Globe,
  Handshake,
  RefreshCcw,
  Link,
} from "lucide-react";
import { useState } from "react";

type Status = "In-process" | "Need to start" | "Complete" | "Blocked";
type Priority = "High" | "Medium" | "Low";

interface DataRow {
  id: number;
  jobRequest: string;
  submitted: string;
  status: Status;
  submitter: string;
  url: string;
  assigned: string;
  priority: Priority;
  dueDate: string;
  value: string;
}

const data: DataRow[] = [
  {
    id: 1,
    jobRequest: "Launch social media campaign for product",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel.com",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    value: "₹6,200,000",
  },
  {
    id: 2,
    jobRequest: "Update press kit for company redesign",
    submitted: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhanportfolio.com",
    assigned: "Tejas Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    value: "₹3,500,000",
  },
  {
    id: 3,
    jobRequest: "Finalize user testing feedback for app relaunch",
    submitted: "05-12-2024",
    status: "In-process",
    submitter: "Mark Johnson",
    url: "www.markjohnson.com",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    value: "₹4,750,000",
  },
  {
    id: 4,
    jobRequest: "Design new features for the website",
    submitted: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen.io",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    value: "₹5,900,000",
  },
  {
    id: 5,
    jobRequest: "Prepare financial report for Q4",
    submitted: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabrown.net",
    assigned: "Kevin Smith",
    priority: "Low",
    dueDate: "30-01-2025",
    value: "₹2,800,000",
  },
];

const statusColor: Record<Status, string> = {
  "In-process": "bg-yellow-100 text-yellow-800",
  "Need to start": "bg-gray-200 text-gray-700",
  "Complete": "bg-green-100 text-green-700",
  "Blocked": "bg-red-100 text-red-700",
};

const priorityColor: Record<Priority, string> = {
  High: "text-red-600 font-medium",
  Medium: "text-yellow-700 font-medium",
  Low: "text-blue-600 font-medium",
};


//key navigations(arrows)
const TableSection = () => {
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  const handleKeyNavigation = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
    const current = e.currentTarget;
    const row = current.parentElement;
    if (!row) return;

    const cells = Array.from(row.children).filter((el) =>
      (el as HTMLElement).tabIndex === 0
    ) as HTMLElement[];
    const index = cells.indexOf(current);

    let target: HTMLElement | null = null;

    switch (e.key) {
      case "ArrowRight":
        target = cells[index + 1];
        break;
      case "ArrowLeft":
        target = cells[index - 1];
        break;
      case "ArrowUp": {
        const prevRow = row.previousElementSibling as HTMLTableRowElement;
        if (prevRow) {
          const targetCell = Array.from(prevRow.children).filter(
            (el) => (el as HTMLElement).tabIndex === 0
          )[index];
          target = targetCell as HTMLElement;
        }
        break;
      }
      case "ArrowDown": {
        const nextRow = row.nextElementSibling as HTMLTableRowElement;
        if (nextRow) {
          const targetCell = Array.from(nextRow.children).filter(
            (el) => (el as HTMLElement).tabIndex === 0
          )[index];
          target = targetCell as HTMLElement;
        }
        break;
      }
    }

    if (target) {
      e.preventDefault();
      target.focus();
    }
  };

  const toggleColumn = (key: string) => {
    setHiddenColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };


  //resizing col.

useEffect(() => {
  const resizableHeaders = document.querySelectorAll("th.resizable");

  resizableHeaders.forEach((th) => {
    const thElement = th as HTMLTableCellElement;
    const handle = thElement.querySelector(".resize-handle") as HTMLElement | null;

    if (!handle) return;

    let startX = 0;
    let startWidth = 0;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault(); // prevent unwanted selection
      startX = e.pageX;
      startWidth = thElement.offsetWidth;

      const onMouseMove = (e: MouseEvent) => {
        const newWidth = startWidth + (e.pageX - startX);
        thElement.style.width = `${newWidth}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    handle.addEventListener("mousedown", onMouseDown);
  });

  return () => {
    resizableHeaders.forEach((th) => {
      const handle = th.querySelector(".resize-handle");
      if (handle) {
        handle.removeEventListener("mousedown", () => {});
      }
    });
  };
}, []);



  return (

    //toggle button hides certain cols
    <div className="w-full overflow-auto max-h-[600px] border-t border-gray-200">
     <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-end">
  <button
    onClick={() => toggleColumn("jobRequest")}
    className="px-3 py-1.5 text-sm rounded-md border border-[#4C6B53] text-[#4C6B53] hover:bg-[#4C6B53]/10 transition"
  >
    Toggle Column
  </button>
</div>

{/* labels in the sheet */}
      <table className="w-full text-sm text-left border-collapse">
<thead className="sticky top-0 z-10 bg-white text-xs uppercase text-gray-700 leading-tight">
  <tr>
    <th className="resizable bg-white border border-gray-200">
      <div className="resize-handle-wrapper">
        <div className="resize-handle" />
      </div>
    </th>

    {!hiddenColumns.includes("jobRequest") && (
      <th colSpan={4} className="resizable bg-gray-200 px-4 py-1 border border-gray-200">
        <div className="resize-handle-wrapper">
          <div className="flex items-center gap-2 h-8">
            <div className="bg-white px-3 py-1 rounded-lg inline-flex items-center gap-2 shadow-sm border border-gray-200">
              <Link className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-800">
                Q3 Financial Overview
              </span>
            </div>
            <RefreshCcw className="w-4 h-4 text-red-500 animate-spin-slow" />
          </div>
          <div className="resize-handle" />
        </div>
      </th>
    )}

    <th className="resizable bg-white border border-gray-200">
      <div className="resize-handle-wrapper">
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable bg-green-100 text-green-900 font-semibold text-center py-1 border border-gray-200">
      <div className="resize-handle-wrapper">
        <div className="flex items-center justify-center gap-1 h-6">
          ABC <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>
        <div className="resize-handle" />
      </div>
    </th>

    <th
      colSpan={2}
      className="resizable bg-purple-100 text-purple-900 font-semibold text-center py-1 border border-gray-200"
    >
      <div className="resize-handle-wrapper">
        <div className="flex items-center justify-center gap-1 h-6">
          Answer a question <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable bg-red-100 text-red-900 text-center font-semibold py-1 border border-gray-200">
      <div className="resize-handle-wrapper">
        <div className="flex items-center justify-center gap-1 h-6">
          Extract <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable text-center py-1 bg-white border border-gray-200">
      <div className="resize-handle-wrapper">
        <Plus className="w-4 h-4 text-gray-600 mx-auto" />
        <div className="resize-handle" />
      </div>
    </th>
  </tr>

  <tr className="bg-gray-100 text-gray-700 text-xs uppercase leading-tight">
    <th className="resizable px-4 py-2 border border-gray-200">
      <div className="resize-handle-wrapper">
        #<div className="resize-handle" />
      </div>
    </th>

    {!hiddenColumns.includes("jobRequest") && (
      <>
        <th className="resizable px-4 py-2 border border-gray-200">
          <div className="resize-handle-wrapper">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> Job Request
            </div>
            <div className="resize-handle" />
          </div>
        </th>
        <th className="resizable px-4 py-2 border border-gray-200">
          <div className="resize-handle-wrapper">
            <Calendar className="w-4 h-4" /> Submitted
            <div className="resize-handle" />
          </div>
        </th>
        <th className="resizable px-4 py-2 border border-gray-200">
          <div className="resize-handle-wrapper">
            <CircleCheck className="w-4 h-4" /> Status
            <div className="resize-handle" />
          </div>
        </th>
        <th className="resizable px-4 py-2 border border-gray-200">
          <div className="resize-handle-wrapper">
            <User className="w-4 h-4" /> Submitter
            <div className="resize-handle" />
          </div>
        </th>
      </>
    )}

    <th className="resizable px-4 py-2 border border-gray-200">
      <div className="resize-handle-wrapper">
        <Globe className="w-4 h-4" /> URL
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable px-4 py-2 border border-gray-200 bg-green-50">
      <div className="resize-handle-wrapper">
        <Handshake className="w-4 h-4" /> Assigned
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable px-4 py-2 border border-gray-200 bg-purple-50">
      <div className="resize-handle-wrapper">
        Priority
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable px-4 py-2 border border-gray-200 bg-purple-50">
      <div className="resize-handle-wrapper">
        Due Date
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable px-4 py-2 border border-gray-200 bg-red-50">
      <div className="resize-handle-wrapper">
        Est. Value
        <div className="resize-handle" />
      </div>
    </th>

    <th className="resizable px-4 py-2 border border-gray-200 bg-white">
      <div className="resize-handle-wrapper">
        <div className="resize-handle" />
      </div>
    </th>
  </tr>
</thead>


{/* navigation */}
<tbody className="text-gray-700">
  {data.map((row, idx) => (
    <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
      >
        {row.id}
      </td>

      {!hiddenColumns.includes("jobRequest") && (
        <>
          <td
            tabIndex={0}
            onKeyDown={handleKeyNavigation}
            className="px-4 py-3 border border-gray-200 font-medium truncate max-w-xs hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
          >
            {row.jobRequest}
          </td>
          <td
            tabIndex={0}
            onKeyDown={handleKeyNavigation}
            className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
          >
            {row.submitted}
          </td>
          <td
            tabIndex={0}
            onKeyDown={handleKeyNavigation}
            className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
          >
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[row.status]}`}>
              {row.status}
            </span>
          </td>
          <td
            tabIndex={0}
            onKeyDown={handleKeyNavigation}
            className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
          >
            {row.submitter}
          </td>
        </>
      )}

      <td
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        className="px-4 py-3 border border-gray-200 text-blue-600 hover:underline hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
      >
        <a href={`https://${row.url}`} target="_blank" rel="noopener noreferrer">
          {row.url}
        </a>
      </td>
      <td
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
      >
        {row.assigned}
      </td>
      <td
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
      >
        <span className={priorityColor[row.priority]}>{row.priority}</span>
      </td>
      <td
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
      >
        {row.dueDate}
      </td>
      <td
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
      >
        {row.value}
      </td>
      <td
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
      />
    </tr>
  ))}

  {/* Extra empty rows */}
  {Array.from({ length: 10 }, (_, i) => {
    const rowNum = data.length + i + 1;
    const isEven = rowNum % 2 === 0;
    return (
      <tr key={rowNum} className={isEven ? "bg-white" : "bg-gray-50"}>
        <td
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
          className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
        >
          {rowNum}
        </td>

        {!hiddenColumns.includes("jobRequest") && (
          <>
            <td
              tabIndex={0}
              onKeyDown={handleKeyNavigation}
              className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
            />
            <td
              tabIndex={0}
              onKeyDown={handleKeyNavigation}
              className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
            />
            <td
              tabIndex={0}
              onKeyDown={handleKeyNavigation}
              className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
            />
            <td
              tabIndex={0}
              onKeyDown={handleKeyNavigation}
              className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
            />
          </>
        )}

        <td
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
          className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
        />
        <td
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
          className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
        />
        <td
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
          className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
        />
        <td
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
          className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
        />
        <td
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
          className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
        />
        <td
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
          className="px-4 py-3 border border-gray-200 hover:outline hover:outline-[#4C6B53] focus:outline focus:outline-[#4C6B53]"
        />
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  );
};

export default TableSection;
