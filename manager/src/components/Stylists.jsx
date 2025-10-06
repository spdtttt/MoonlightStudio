import { useEffect, useState } from "react";

// ย้าย AddModal ออกมาข้างนอก
const AddModal = ({ isOpen, onClose, formData, setFormData, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">เพิ่มช่างใหม่</h2>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ชื่อช่าง</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">บริการ</label>
            <select
              name="service"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>
                -- เลือกบริการ --
              </option>
              <option value="ตัดผม">ตัดผม</option>
              <option value="ดัดผม">ดัดผม</option>
              <option value="ยืดผม">ยืดผม</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ประสบการณ์ (ปี)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Stylists = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    service: "",
    experience: "",
  });
  const [stylists, setStylists] = useState([]);

  const fetchStylists = async () => {
    try {
      const response = await fetch("http://localhost:8081/stylists");
      const data = await response.json();
      setStylists(data);
    } catch (error) {
      console.log("Error fetching stylists: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8081/add-stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("New Stylist Added!");
      fetchStylists();
      setIsModalOpen(false);
      setFormData({
        id: "",
        name: "",
        service: "",
        experience: "",
      });
    } catch (error) {
      console.log("Error add stylist:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: "",
      name: "",
      service: "",
      experience: "",
    });
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  const deleteStylist = async (id) => {
    try {
      await fetch("http://localhost:8081/delete-stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      console.log("Deleted Stylist!");
      fetchStylists();
    } catch (error) {
      console.log("Error deleted stylist:", error);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">ช่างทั้งหมด</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mr-10 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-5 text-xl rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Add
        </button>
      </div>

      <div className="w-300 justify-self-start ml-5 h-1 bg-gray-300"></div>

      <div className="p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>ที่</th>
              <th>ชื่อ</th>
              <th>บริการ</th>
              <th>ประสบการณ์</th>
            </tr>
          </thead>
          <tbody>
            {stylists.map((stylist, index) => (
              <tr id="data" key={index}>
                <td>{index + 1}</td>
                <td>{stylist.name}</td>
                <td>{stylist.service}</td>
                <td>{stylist.experience}</td>
                <td className="text-center align-middle">
                  <button onClick={() => deleteStylist(stylist.id)} className="px-5 py-3 bg-red-500 rounded-lg text-white hover:bg-red-700 cursor-pointer font-bold">
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Stylists;
