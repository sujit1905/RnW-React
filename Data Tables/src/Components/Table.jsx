const Table = ({
  data,
  onEdit,
  onDelete,
  handleSortAZ,
  handleSortZA,
  handleSearch,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm font-medium transition-colors cursor-pointer"
            onClick={handleSortAZ}
          >
            Sort A-Z
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm font-medium transition-colors cursor-pointer"
            onClick={handleSortZA}
          >
            Sort Z-A
          </button>
        </div>
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search records..."
            className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-blue-500"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.phone}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{item.total}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium hover:bg-green-100 transition-colors cursor-pointer"
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400 italic">
                  No records to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>


  );
};

export default Table;
