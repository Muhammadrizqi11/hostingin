import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const Booking = ({ studio, bookings = [] }) => {
  const [duration, setDuration] = useState(1);
  const [rentDate, setRentDate] = useState("");
  const [rentTime, setRentTime] = useState("");
  const [msg, setMsg] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const user = true; // Ganti dengan kondisi autentikasi pengguna Anda

  useEffect(() => {
    // Ambil data pengguna dari accessToken di localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const { userid, name, email } = JSON.parse(atob(accessToken.split(".")[1]));
      const [first_name, last_name] = name.split(" ");
      setCustomerDetails({
        id: userid,
        first_name: first_name || "",
        last_name: last_name || "",
        email,
        phone: "08996961797", // Default phone number
      });
    }
  }, []);

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    validateDateTime(rentDate, rentTime);
  };

  const handleRentDateChange = (event) => {
    setRentDate(event.target.value);
    validateDateTime(event.target.value, rentTime);
  };

  const handleRentTimeChange = (event) => {
    setRentTime(event.target.value);
    validateDateTime(rentDate, event.target.value);
  };

  const handleMinusClick = () => {
    setDuration((prevDuration) => Math.max(1, prevDuration - 1));
    validateDateTime(rentDate, rentTime);
  };

  const handlePlusClick = () => {
    setDuration((prevDuration) => Math.min(4, prevDuration + 1));
    validateDateTime(rentDate, rentTime);
  };

  const isDateTimeAvailable = (date, time) => {
    if (!Array.isArray(bookings)) {
      return true;
    }

    const startDateTime = new Date(`${date}T${time}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + duration);

    for (const booking of bookings) {
      const bookingStart = new Date(booking.tanggalMulai);
      const bookingEnd = new Date(booking.tanggalSelesai);

      if ((startDateTime >= bookingStart && startDateTime < bookingEnd) || (endDateTime > bookingStart && endDateTime <= bookingEnd) || (startDateTime <= bookingStart && endDateTime >= bookingEnd)) {
        return false;
      }
    }
    return true;
  };

  const priceString = studio.price.toString();
  const totalPrice = duration * parseInt(priceString.replace(/[^0-9]/g, ""));

  const validateDateTime = (date, time) => {
    if (!date || !time) {
      console.log("valid");
      setMsg("");
      return;
    }
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < now) {
      console.log("Waktu pemesanan harus dari waktu sekarang dan seterusnya");
      setMsg("Waktu pemesanan harus dari waktu sekarang dan seterusnya.");
      return;
    }
    if (!isDateTimeAvailable(date, time)) {
      console.log("Tanggal dan jam sudah dibooking. Silahkan pilih waktu yang lain.");
      setMsg("Tanggal dan jam sudah dibooking. Silahkan pilih waktu yang lain.");
      return;
    }

    setMsg(""); // Clear the message if validation passes
  };

  const kirim = async (e) => {
    e.preventDefault();
    validateDateTime(rentDate, rentTime);
    if (msg) {
      return;
    }
    const startDateTime = new Date(`${rentDate}T${rentTime}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + duration);
    const accessToken = localStorage.getItem("accessToken");
    const { userId } = JSON.parse(atob(accessToken.split(".")[1]));
    
    const orderData = {
      amount: totalPrice,
      customerDetails: customerDetails,
      datapemesanan: {
        totalHarga: totalPrice,
        tanggalMulai: startDateTime.toISOString(),
        tanggalSelesai: endDateTime.toISOString(),
        durasi: duration,
        studioId: studio.id,
        userId: userId, // Ganti dengan ID pengguna yang sesuai
      },
    };

    try {
      const response = await axios.post("http://localhost:5000/pemesanan", orderData);
      const { redirect_url } = response.data;
      alert("Pemesanan berhasil! Klik OK untuk lanjut ke pembayaran.");
      window.location.href = redirect_url;
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Terjadi kesalahan saat melakukan pemesanan. Silahkan coba lagi.");
      window.location.reload(); // Refresh halaman setelah menampilkan alert
    }
  };

  return (
    <Container>
      <div className="box-payment box border border-secondary rounded-3 p-4">
        <form onSubmit={kirim}>
          <h4 className="fw-bold fs-5 text-center">Mulai Pemesanan Studio</h4>
          <input type="hidden" value={studio.id} name="studioId" id="studioId" />
          <h3 className="fw-bold text-success fs-2 text-center">
            {studio.price} <span className="fw-light fs-3 text-secondary">per jam</span>
          </h3>
          <input type="hidden" value={studio.price} name="priceStudio" id="priceStudio" />
          <input type="hidden" value={totalPrice} name="totalPayment" id="totalPayment" />

          <p className="mt-4">Berapa lama ingin sewa studio?</p>
          <div className="btn-package d-flex justify-content-center">
            <button type="button" className="fw-bold btn btn-danger" id="btn-minus" onClick={handleMinusClick}>
              -
            </button>
            <input className="bg-body-secondary" type="number" value={duration} min="1" max="4" onChange={handleDurationChange} name="duration" id="duration" required />
            <button type="button" className="fw-bold btn btn-success" id="btn-plus" onClick={handlePlusClick}>
              +
            </button>
          </div>

          <p className="mt-4">Pilih tanggal</p>
          <div className="btn-date d-flex">
            <button className="btn btn-dark">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="3" width="23" height="23" rx="2" stroke="white" strokeWidth="2" />
                <rect x="5" y="15" width="5" height="5" rx="1" stroke="white" strokeWidth="2" />
                <rect x="15" y="15" width="5" height="5" rx="1" stroke="white" strokeWidth="2" />
                <path d="M1 9H24" stroke="white" strokeWidth="2" />
                <path d="M5 1L5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 1L20 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <input className="bg-body-secondary" type="date" value={rentDate} onChange={handleRentDateChange} name="rentDate" id="rentDate" required />
          </div>

          <p className="mt-4">Pilih jam</p>
          <div className="btn-time d-flex">
            <select className="bg-body-secondary form-control" value={rentTime} onChange={handleRentTimeChange} name="rentTime" id="rentTime" required>
              <option value="">Pilih jam</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={`${i}:00`}>
                  {`${i}:00`}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-5">
            Anda akan membayar sewa studio sebesar:{" "}
            <span className="fw-semibold" id="showTotalPrice">
              Rp{totalPrice}
            </span>{" "}
            per{" "}
            <span className="fw-semibold" id="hourRentStudio">
              {duration} jam
            </span>
          </p>

          {msg && <p className="text-danger">{msg}</p>}

          {!user ? (
            <>
              <button type="submit" className="btn btn-primary w-100 p-2" disabled>
                Lanjut Pembayaran
              </button>
              <p className="text-danger mt-2">*Silahkan login dahulu sebelum Anda melakukan pemesanan Studio</p>
            </>
          ) : (
            <button type="submit" className="btn btn-primary w-100 p-2">
              Lanjut Pembayaran
            </button>
          )}
        </form>
      </div>
    </Container>
  );
};

export default Booking;
