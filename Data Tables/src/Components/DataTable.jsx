import { useState, useEffect } from "react";
import Table from "./Table";

const DataTable = () => {
  // State Management
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("data");
    return saved ? JSON.parse(saved) : [];
  });

  // Search and Sort
  const [search, setSearch] = useState("");

  // Input Fields
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Local Storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form Validation
    if (!id || !name || !email || !phone || !total) {
      alert("Please fill all fields");
      return;
    }

    // Form Data
    const formData = {
      id,
      name,
      email,
      phone,
      total,
    };

    // Update or Add Record
    if (isEditing) {
      setData(data.map((item) => (item.id === id ? formData : item)));
      setIsEditing(false);
    } else {
      if (data.some((item) => item.id === id)) {
        alert("ID already exists!");
        return;
      }
      // Add Record
      setData([...data, formData]);
    }

    // Clear Input Fields After Form Submit
    setId("");
    setName("");
    setEmail("");
    setPhone("");
    setTotal("");
  };

  // Edit Record
  const handleEdit = (item) => {
    setId(item.id);
    setName(item.name);
    setEmail(item.email);
    setPhone(item.phone);
    setTotal(item.total);
    setIsEditing(true);
  };

  // Delete Record
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  // Search
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSortAZ = () => {
    const sorted = [...data].sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });

    setData(sorted);
  };

  const handleSortZA = () => {
    const sorted = [...data].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });

    setData(sorted);
  };

  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Data Management</h1>
      </div>

      <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg mb-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-3 items-center"
        >
          <input
            type="text"
            placeholder="ID"
            className="flex-1 min-w-[60px] max-w-[100px] border border-gray-300 p-2 rounded focus:outline-blue-500 bg-white"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isEditing}
          />
          <input
            type="text"
            placeholder="Full Name"
            className="flex-2 min-w-[150px] border border-gray-300 p-2 rounded focus:outline-blue-500 bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="flex-2 min-w-[200px] border border-gray-300 p-2 rounded focus:outline-blue-500 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="flex-1 min-w-[150px] border border-gray-300 p-2 rounded focus:outline-blue-500 bg-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Total Amount"
            className="flex-1 min-w-[120px] border border-gray-300 p-2 rounded focus:outline-blue-500 bg-white"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
          <button
            type="submit"
            className={`px-6 py-2 text-white font-medium rounded transition-colors ${
              isEditing ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
      </div>


      <Table
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleSortAZ={handleSortAZ}
        handleSortZA={handleSortZA}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default DataTable;
