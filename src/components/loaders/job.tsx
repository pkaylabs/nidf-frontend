import React from "react";

export default function JobLoader({ title }: { title: string }) {
  return (
    <div className="fixed z-40 inset-0 bg-gray-400 bg-opacity-60 transition-opacity">
      <div className="flex min-h-full justify-center p-4 text-center items-center">
        <div className="relative transform overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all my-8 w-full max-w-xs p-6">
          <div className="flex flex-col items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-xs font-medium ">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
