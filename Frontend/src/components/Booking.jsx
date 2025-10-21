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
    <div className="booking-card max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800"
        style={{
          fontFamily: "Kanit",
        }}
      >
        เลือกบริการ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={`service-card p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedService === service.id
                ? "border-purple-500 bg-purple-50 shadow-lg transform scale-105"
                : "border-gray-200 hover:border-purple-300 hover:shadow-md"
            }`}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "Kanit" }}>
              {service.name}
            </h3>
            <p className="text-base sm:text-lg text-purple-600 font-bold" style={{ fontFamily: "Kanit" }}>
              {service.price.toLocaleString()} บาท
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="booking-card max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800"
        style={{
          fontFamily: "Kanit",
        }}
      >
        เลือกช่างบริการ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {stylists[selectedService]?.map((stylist) => (
          <div
            key={stylist.id}
            onClick={() => setSelectedStylist(stylist.name)}
            className={`stylist-card p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedStylist === stylist.name
                ? "border-purple-500 bg-purple-50 shadow-lg transform scale-105"
                : "border-gray-200 hover:border-purple-300 hover:shadow-md"
            }`}
          >
            <h3
              className="text-lg sm:text-xl font-semibold mb-2 text-gray-800"
              style={{
                fontFamily: "Kanit",
              }}
            >
              {stylist.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-1" style={{ fontFamily: "Kanit" }}>
              ประสบการณ์: {stylist.experience} ปี
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="booking-card max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800"
        style={{
          fontFamily: "Kanit",
        }}
      >
        เลือกวันและเวลา
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-700" style={{ fontFamily: "Kanit" }}>
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
            className="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-700" style={{ fontFamily: "Kanit" }}>
            เลือกเวลา
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableTimeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`time-slot p-2 sm:p-3 border rounded-lg transition-all duration-300 ${
                  selectedTime === time
                    ? "border-purple-500 bg-purple-500 text-white shadow-md"
                    : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                }`}
                style={{ fontFamily: "Kanit" }}
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
    <div className="booking-card max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800"
        style={{
          fontFamily: "Kanit",
        }}
      >
        ข้อมูลลูกค้า
      </h2>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Kanit" }}>
              ชื่อ
            </label>
            <input
              type="text"
              value={customerInfo.firstName}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, firstName: e.target.value })
              }
              className="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="กรอกชื่อ"
              style={{ fontFamily: "Kanit" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Kanit" }}>
              นามสกุล
            </label>
            <input
              type="text"
              value={customerInfo.lastName}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, lastName: e.target.value })
              }
              className="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="กรอกนามสกุล"
              style={{ fontFamily: "Kanit" }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Kanit" }}>
            เบอร์โทรศัพท์ที่ติดต่อได้
          </label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, phone: e.target.value })
            }
            className="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="กรอกเบอร์โทรศัพท์"
            style={{ fontFamily: "Kanit" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Kanit" }}>
            อีเมล
          </label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, email: e.target.value })
            }
            className="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="กรอกอีเมล"
            style={{ fontFamily: "Kanit" }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-container min-h-screen py-6 sm:py-8 px-4">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 mt-20 sm:mt-24 md:mt-28">
        {/* Desktop Progress */}
        <div className="hidden sm:flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`progress-step w-10 h-10 rounded-full flex items-center justify-center font-semibold relative transition-all duration-300 ${
                  step < currentStep
                    ? "bg-purple-500 text-white completed"
                    : step === currentStep
                    ? "bg-white text-black active border-2 border-purple-500"
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
              {step < 4 && (
                <div
                  className={`progress-line w-12 h-1 mx-3 rounded-full transition-all duration-500 ${
                    step < currentStep ? "bg-purple-500 animated" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden flex items-center justify-center mb-4">
          <div className="text-white text-center">
            <div className="text-3xl font-bold mb-2" style={{ fontFamily: "Kanit" }}>
              {currentStep} / 4
            </div>
            <div className="text-sm text-purple-200" style={{ fontFamily: "Kanit" }}>
              {currentStep === 1 && "เลือกบริการ"}
              {currentStep === 2 && "เลือกช่าง"}
              {currentStep === 3 && "เลือกเวลา"}
              {currentStep === 4 && "ข้อมูลลูกค้า"}
            </div>
          </div>
        </div>

        {/* Desktop Labels */}
        <div className="hidden sm:flex justify-between mt-2 text-xs sm:text-sm text-white">
          <span
            className={`step-label ${
              1 <= currentStep ? "text-purple-200" : ""
            }`}
            style={{ fontFamily: "Kanit" }}
          >
            เลือกบริการ
          </span>
          <span
            className={`step-label ${
              2 <= currentStep ? "text-purple-200" : ""
            }`}
            style={{ fontFamily: "Kanit" }}
          >
            เลือกช่าง
          </span>
          <span
            className={`step-label ${
              3 <= currentStep ? "text-purple-200" : ""
            }`}
            style={{ fontFamily: "Kanit" }}
          >
            เลือกเวลา
          </span>
          <span
            className={`step-label ${
              4 <= currentStep ? "text-purple-200" : ""
            }`}
            style={{ fontFamily: "Kanit" }}
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
      <div className="max-w-4xl mx-auto px-4 flex justify-between mt-6 sm:mt-8 gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl text-sm sm:text-base transition-all duration-300 ${
            currentStep === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "btn-secondary btn-loading text-white hover:shadow-lg"
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
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl text-sm sm:text-base transition-all duration-300 ${
              !customerInfo.firstName ||
              !customerInfo.lastName ||
              !customerInfo.phone ||
              !customerInfo.email
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "btn-primary btn-loading text-white hover:shadow-lg"
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
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl text-sm sm:text-base transition-all duration-300 ${
              (currentStep === 1 && !selectedService) ||
              (currentStep === 2 && !selectedStylist) ||
              (currentStep === 3 && (!selectedDate || !selectedTime))
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "btn-primary btn-loading text-white hover:shadow-lg"
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