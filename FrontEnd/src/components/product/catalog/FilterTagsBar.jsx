export default function FilterTagsBar({ filters = [], onRemove, onClear }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => onRemove(filter)}
          className="px-3 py-1 text-sm bg-gray-200 text-black rounded-full hover:bg-gray-300 transition"
        >
          {filter.label} <span className="text-red-500 ml-1">×</span>
        </button>
      ))}

      {filters.length > 0 && (
        <button
          onClick={onClear}
          className="px-3 py-1 text-sm bg-black text-white rounded-full hover:opacity-80 transition"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
