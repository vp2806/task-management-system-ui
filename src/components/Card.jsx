export default function Card({ title, description, dueDate, onClick }) {
  return (
    <div
      className="block max-w-sm p-6 mb-3 bg-white border border-gray-200 rounded-lg shado dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description.length > 170
          ? description.slice(0, 171) + "..."
          : description}
      </p>
      <div className="flex items-center gap-3 mt-3">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
          />
        </svg>
        <span className="font-normal text-gray-700 dark:text-gray-400">
          {dueDate}
        </span>
      </div>
    </div>
  );
}
