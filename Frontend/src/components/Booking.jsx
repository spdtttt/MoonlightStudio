import { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [successBooking, setSuccessBooking] = useState(false);
  const API_URL = "https://moonlightstudio-backend.onrender.com";

  const navigate = useNavigate();

  // รายการงานบริการทั้งหมด & ราคา
  const services = [
    { id: "haircut", name: "ตัดผม", price: 300 },
    { id: "straightening", name: "ยืดผม", price: 1500 },
    { id: "perm", name: "ดัดผม", price: 1200 },
  ];

  // รายชื่อช่างบริการทุกงานบริการ
  const [stylists, setStylists] = useState({
    haircut: [],
    straightening: [],
    perm: [],
  });

  // เวลาที่ลูกค้าเลือกได้
  const timeSlots = ["09:00", "11:00", "13:00", "15:00", "17:00"];
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // เลือกงานบริการ
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedStylist(""); // รีเซ็ตช่างเมื่อเปลี่ยนบริการ
  };

  // ยืนยันการชำระเงิน
  const handleSuccessBooking = () => {
    setSuccessBooking(true);
    // ส่งข้อมูลการจอง
    console.log("ข้อมูลการจอง:", {
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
    });
  
    Swal.fire({
      title: "ต้องการจองคิวใช่มั้ย?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/users/save-booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service: selectedService,
            stylist: selectedStylist,
            date: selectedDate,
            time: selectedTime,
            customer: customerInfo,
          }),
        })
          .then(() =>
            Swal.fire({
              title: "จองคิวสำเร็จ!",
              icon: "success",
              text: "ทางร้านจะติดต่อกลับไปโดยเร็ว",
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#16a34a",
            })
          )
          .then(() => {
            navigate("/");
          });
      }
    });
  };

  const getServicePrice = () => {
    const service = services.find((s) => s.id === selectedService);
    return service ? service.price : 0;
  };

  useEffect(() => {
    if (!selectedStylist || !selectedDate) {
      setAvailableTimeSlots(timeSlots);
      return;
    }

    fetch(`${API_URL}/users/get-booking?stylist=${selectedStylist}`)
      .then((res) => res.json())
      .then((data) => {
        const timeBooked = Array.isArray(data)
          ? data.filter((b) => b.date === selectedDate).map((b) => b.time)
          : [];

        const filtered = timeSlots.filter((t) => !timeBooked.includes(t));
        setAvailableTimeSlots(filtered);

        if (selectedTime && !filtered.includes(selectedTime)) {
          setSelectedTime("");
        }
      })
      .catch(() => {
        setAvailableTimeSlots(timeSlots);
      });
  }, [selectedStylist, selectedDate]);

  useEffect(() => {
    fetch(`${API_URL}/stylists/haircut`)
      .then((res) => res.json())
      .then((data) =>
        setStylists((prev) => ({
          ...prev,
          haircut: data,
        }))
      )
      .catch((err) => console.log(err));

    fetch(`${API_URL}/stylists/straightening`)
      .then((res) => res.json())
      .then((data) =>
        setStylists((prev) => ({
          ...prev,
          straightening: data,
        }))
      )
      .catch((err) => console.log(err));

    fetch(`${API_URL}/stylists/perm`)
      .then((res) => res.json())
      .then((data) =>
        setStylists((prev) => ({
          ...prev,
          perm: data,
        }))
      )
      .catch((err) => console.log(err));
  }, []);

  // ขั้นตอนที่ 1
  const renderStep1 = () => (
    <div className="booking-card max-w-4xl mx-auto p-8 2xl:max-w-4xl sm:max-w-xl">
      <h2
        className="text-3xl font-bold text-center mb-8 text-gray-800 2xl:text-3xl sm:text-2xl"
        style={{
          fontFamily: "Kanit",
        }}
      >
        เลือกบริการ
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={`service-card p-6 border-2 cursor-pointer ${
              selectedService === service.id
                ? "border-purple-500 bg-purple-50 shadow-lg"
                : "border-gray-200 hover:border-purple-300 hover:shadow-md"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800 2xl:text-xl sm:text-lg">
              {service.name}
            </h3>
            <p className="text-lg text-purple-600 font-bold">
              {service.price.toLocaleString()} บาท
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="booking-card max-w-4xl mx-auto p-8 2xl:max-w-4xl sm:max-w-xl">
      <h2
        className="text-3xl font-bold text-center mb-8 text-gray-800 2xl:text-3xl sm:text-2xl"
        style={{
          fontFamily: "Kanit",
        }}
      >
        เลือกช่างบริการ
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {stylists[selectedService]?.map((stylist) => (
          <div
            key={stylist.id}
            onClick={() => setSelectedStylist(stylist.name)}
            className={`stylist-card p-6 border-2 cursor-pointer ${
              selectedStylist === stylist.name
                ? "border-purple-500 bg-purple-50 shadow-lg"
                : "border-gray-200 hover:border-purple-300 hover:shadow-md"
            }`}
          >
            <h3
              className="text-xl font-semibold mb-2 text-gray-800 2xl:text-xl sm:text-lg"
              style={{
                fontFamily: "Kanit",
              }}
            >
              {stylist.name}
            </h3>
            <p className="text-gray-600 mb-1">
              ประสบการณ์: {stylist.experience} ปี
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="booking-card max-w-4xl mx-auto p-8 2xl:max-w-4xl sm:max-w-xl">
      <h2
        className="text-3xl font-bold text-center mb-8 text-gray-800 2xl:text-3xl sm:text-2xl"
        style={{
          fontFamily: "Kanit",
        }}
      >
        เลือกวันและเวลา
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 2xl:text-xl sm:text-lg">
            เลือกวันที่
          </h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={
              new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }
            className="form-input w-full p-3 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 2xl:text-xl sm:text-lg">
            เลือกเวลา
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {availableTimeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`time-slot p-3 border ${
                  selectedTime === time
                    ? "border-purple-500 bg-purple-500 text-white"
                    : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="booking-card max-w-2xl mx-auto p-8 2xl:max-w-4xl sm:max-w-xl">
      <h2
        className="text-3xl font-bold text-center mb-8 text-gray-800 2xl:text-3xl sm:text-2xl" 
        style={{
          fontFamily: "Kanit",
        }}
      >
        ข้อมูลลูกค้า
      </h2>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ
            </label>
            <input
              type="text"
              value={customerInfo.firstName}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, firstName: e.target.value })
              }
              className="form-input w-full p-3 border border-gray-300"
              placeholder="กรอกชื่อ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              นามสกุล
            </label>
            <input
              type="text"
              value={customerInfo.lastName}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, lastName: e.target.value })
              }
              className="form-input w-full p-3 border border-gray-300"
              placeholder="กรอกนามสกุล"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เบอร์โทรศัพท์ที่ติดต่อได้
          </label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, phone: e.target.value })
            }
            className="form-input w-full p-3 border border-gray-300"
            placeholder="กรอกเบอร์โทรศัพท์"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            อีเมล
          </label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, email: e.target.value })
            }
            className="form-input w-full p-3 border border-gray-300"
            placeholder="กรอกอีเมล"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-container py-8">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8 mt-25 2xl:mt-25 2xl:mb-8 2xl:max-w-4xl sm:max-w-xl sm:mt-20">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`progress-step w-10 h-10 rounded-full flex items-center justify-center font-semibold relative ${
                  step < currentStep
                    ? "bg-purple-500 text-white completed"
                    : step === currentStep
                    ? "bg-white text-black active"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step < currentStep ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 5 && (
                <div
                  className={`progress-line w-12 h-1 mx-3 rounded-full ${
                    step < currentStep ? "bg-green-500 animated" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-white">
          <span
            className={`step-label ${
              1 <= currentStep ? "text-purple-200" : ""
            }`}
          >
            เลือกบริการ
          </span>
          <span
            className={`step-label ${
              2 <= currentStep ? "text-purple-200" : ""
            }`}
          >
            เลือกช่าง
          </span>
          <span
            className={`step-label ${
              3 <= currentStep ? "text-purple-200" : ""
            }`}
          >
            เลือกเวลา
          </span>
          <span
            className={`step-label ${
              4 <= currentStep ? "text-purple-200" : ""
            }`}
          >
            ข้อมูลลูกค้า
          </span>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto px-8 flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-3 font-semibold ${
            currentStep === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl"
              : "btn-secondary btn-loading text-white"
          }`}
          style={{
            fontFamily: "Kanit",
          }}
        >
          ย้อนกลับ
        </button>

        {currentStep === 4 ? (
          <button
            onClick={handleSuccessBooking}
            disabled={
              !customerInfo.firstName ||
              !customerInfo.lastName ||
              !customerInfo.phone ||
              !customerInfo.email
            }
            className={`px-6 py-3 font-semibold ${
              !customerInfo.firstName ||
              !customerInfo.lastName ||
              !customerInfo.phone ||
              !customerInfo.email
                ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl"
                : "btn-primary btn-loading text-white"
            }`}
            style={{
              fontFamily: "Kanit",
            }}
          >
            ยืนยันการจอง
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedService) ||
              (currentStep === 2 && !selectedStylist) ||
              (currentStep === 3 && (!selectedDate || !selectedTime))
            }
            className={`px-6 py-3 font-semibold ${
              (currentStep === 1 && !selectedService) ||
              (currentStep === 2 && !selectedStylist) ||
              (currentStep === 3 && (!selectedDate || !selectedTime))
                ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl"
                : "btn-primary btn-loading text-white"
            }`}
            style={{
              fontFamily: "Kanit",
            }}
          >
            ถัดไป
          </button>
        )}
      </div>
    </div>
  );
}

export default Booking;
