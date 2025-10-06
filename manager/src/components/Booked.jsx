import { useEffect, useState } from "react";

const Booked = () => {
  const [booked, setBooked] = useState([]);

  const fetchBooked = async () => {
    try {
      const response = await fetch("http://localhost:8081/get-booked");
      const data = await response.json();
      console.log(data);
      setBooked(data);
    } catch (err) {
      console.log("Error Fetching Booked:", err);
      return;
    }
  };

  const deleteBooked = async (id) => {
    try {
      await fetch('http://localhost:8081/delete-booked', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      console.log('Deleted Booked id = ', id, ' Successfully!');
      fetchBooked();
    }

    catch(err) {
      console.log("Error Delete Booked:", err)
      return   
    }
  }

  useEffect(() => {
    fetchBooked();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center p-5 mt-5">
        <h1 className="text-3xl font-bold">รายการคิวทั้งหมด</h1>
      </div>

      <div className="w-300 justify-self-start ml-5 h-1 bg-gray-300"></div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>ที่</th>
            <th>บริการ</th>
            <th>ชื่อช่าง</th>
            <th>วันที่</th>
            <th>เวลา</th>
            <th>ข้อมูลลูกค้า</th>
          </tr>
        </thead>
        <tbody>
          {booked.map((book) => {
            let customer = {};
            try {
              // ถ้าเป็น string JSON ให้ parse
              customer =
                typeof book.customer === "string"
                  ? JSON.parse(book.customer)
                  : book.customer;
            } catch (e) {
              console.error("Error parsing customer:", e);
            }

            return (
              <tr id="data" key={book.id}>
                <td>{book.id}</td>
                <td>
                  {book.service === "haircut"
                    ? "ตัดผม"
                    : book.service === "straightening"
                    ? "ยืดผม"
                    : book.service === "perm"
                    ? "ดัดผม"
                    : book.service}
                </td>
                <td>{book.stylist}</td>
                <td>{book.date}</td>
                <td>{book.time}</td>
                <td>
                  {customer?.firstName} {customer?.lastName} <br />
                  {customer?.phone} <br />
                  {customer?.email}
                </td>
                <td className="text-center align-middle">
                  <button
                    onClick={() => deleteBooked(book.id)}
                    className="px-5 py-3 bg-red-500 rounded-lg text-white hover:bg-red-700 cursor-pointer font-bold"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Booked;
