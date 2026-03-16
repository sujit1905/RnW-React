export default function CategoryTag({ category, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(category)}
      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-sm ${
        isActive
          ? 'bg-gray-900 text-white border-gray-900 ring-2 ring-gray-900/20 ring-offset-2'
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900 bg-gradient-to-b from-white to-gray-50'
      }`}
    >
      {category}
    </button>
  );
}
