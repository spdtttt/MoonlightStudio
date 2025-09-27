import { useState, useEffect } from "react";
import QRCode from "qrcode";
import "../App.css";

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
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");

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
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const handleNext = () => {
    if (currentStep < 5) {
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
  const handlePaymentComplete = () => {
    setPaymentCompleted(true);
    // ส่งข้อมูลการจอง
    console.log("ข้อมูลการจอง:", {
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
      paymentCompleted: true,
    });
    alert("ชำระเงินสำเร็จแล้ว ทางร้านจะติดต่อกลับไปในเร็วๆนี้");
  };

  const getServicePrice = () => {
    const service = services.find((s) => s.id === selectedService);
    return service ? service.price : 0;
  };

  const generatePromptPayQR = () => {
    const amount = getServicePrice();
    const phoneNumber = "0964491903"; // หมายเลข PromptPay ของร้าน

    // สร้าง PromptPay QR Code Data
    const qrData = `00020101021229370016A00000067701011101130066${phoneNumber}5802TH5303764540${amount
      .toString()
      .padStart(2, "0")}6304`;
    return qrData;
  };

  const generateQRCode = async () => {
    try {
      const qrData = generatePromptPayQR();
      const qrCodeURL = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeDataURL(qrCodeURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  useEffect(() => {
    if (currentStep === 5 && selectedService) {
      generateQRCode();
    }
  }, [currentStep, selectedService]);

  useEffect(() => {
    fetch("http://localhost:8081/stylists/haircut")
      .then((res) => res.json())
      .then((data) =>
        setStylists((prev) => ({
          ...prev,
          haircut: data,
        }))
      )
      .catch((err) => console.log(err));

    fetch("http://localhost:8081/stylists/straightening")
      .then((res) => res.json())
      .then((data) =>
        setStylists((prev) => ({
          ...prev,
          straightening: data,
        }))
      )
      .catch((err) => console.log(err));

    fetch("http://localhost:8081/stylists/perm")
      .then((res) => res.json())
      .then((data) =>
        setStylists((prev) => ({
          ...prev,
          perm: data,
        }))
      )
      .catch((err) => console.log(err));
  }, []);

  const renderStep1 = () => (
    <div className="booking-card max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
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
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
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
    <div className="booking-card max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        เลือกช่างบริการ
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {stylists[selectedService]?.map((stylist) => (
          <div
            key={stylist.id}
            onClick={() => setSelectedStylist(stylist.id)}
            className={`stylist-card p-6 border-2 cursor-pointer ${
              selectedStylist === stylist.id
                ? "border-purple-500 bg-purple-50 shadow-lg"
                : "border-gray-200 hover:border-purple-300 hover:shadow-md"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {stylist.name}
            </h3>
            <p className="text-gray-600 mb-1">
              ประสบการณ์: {stylist.experience}
            </p>
            <p className="text-yellow-600 font-semibold">⭐ {stylist.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="booking-card max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        เลือกวันและเวลา
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            เลือกวันที่
          </h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="form-input w-full p-3 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            เลือกเวลา
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
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
    <div className="booking-card max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
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
            เบอร์โทรศัพท์
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

  const renderStep5 = () => (
    <div className="booking-card max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        ชำระเงิน
      </h2>

      {/* สรุปการจอง */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">สรุปการจอง</h3>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>บริการ:</span>
            <span>{services.find((s) => s.id === selectedService)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>ช่าง:</span>
            <span>
              {
                stylists[selectedService]?.find((s) => s.id === selectedStylist)
                  ?.name
              }
            </span>
          </div>
          <div className="flex justify-between">
            <span>วันที่:</span>
            <span>{new Date(selectedDate).toLocaleDateString("th-TH")}</span>
          </div>
          <div className="flex justify-between">
            <span>เวลา:</span>
            <span>{selectedTime}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold text-lg">
            <span>ราคารวม:</span>
            <span className="text-purple-600">
              {getServicePrice().toLocaleString()} บาท
            </span>
          </div>
        </div>
      </div>

      {/* QR Code PromptPay */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          สแกน QR Code เพื่อชำระเงิน
        </h3>
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 inline-block">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            {qrCodeDataURL ? (
              <img
                src={qrCodeDataURL}
                alt="PromptPay QR Code"
                className="w-40 h-40 mx-auto floating"
              />
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="animate-pulse text-gray-500 text-xs">
                    กำลังสร้าง QR Code...
                  </div>
                </div>
                <p className="text-sm text-gray-600">PromptPay QR Code</p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">
            หมายเลข PromptPay: 096-449-1903
          </p>
          <p className="text-lg font-bold text-purple-600">
            {getServicePrice().toLocaleString()} บาท
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-4">
            กรุณาสแกน QR Code ด้วยแอปธนาคารของคุณ และชำระเงินตามจำนวนที่แสดง
          </p>
          <button
            onClick={handlePaymentComplete}
            className="btn-primary btn-loading px-8 py-3 text-white font-semibold"
          >
            ยืนยันการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-container py-8">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8 mt-25">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
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
          <span
            className={`step-label ${
              5 <= currentStep ? "text-purple-200" : ""
            }`}
          >
            ชำระเงิน
          </span>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderStep5()}

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
        >
          ย้อนกลับ
        </button>

        {currentStep === 4 ? (
          <button
            onClick={handleNext}
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
          >
            ถัดไป
          </button>
        ) : currentStep === 5 ? (
          <button
            onClick={handlePaymentComplete}
            className="btn-primary btn-loading px-8 py-3 text-white font-semibold"
          >
            ยืนยันการชำระเงิน
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
          >
            ถัดไป
          </button>
        )}
      </div>
    </div>
  );
}

export default Booking;
