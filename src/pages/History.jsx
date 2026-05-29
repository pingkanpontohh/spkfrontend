import { useEffect, useState } from "react";
import axios from "axios";

// Jika Anda ingin menggunakan CSS yang sama dengan halaman admin, pastikan import ini aktif:
// import "./Admin.css"; 

function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // 1. MENYESUAIKAN: Arahkan ke endpoint rute history topsis yang tepat
      const response = await axios.get("https://spkbackend-gamma.vercel.app/api/topsis/history");
      
      // 2. MENYESUAIKAN: Tangkap properti '.history' sesuai struktur response data backend
      if (response.data && Array.isArray(response.data.history)) {
        setData(response.data.history);
      } else if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setErrorMsg("Format data history dari server tidak valid.");
      }
    } catch (error) {
      console.error("Gagal memuat riwayat:", error);
      setErrorMsg("Gagal terhubung ke server untuk mengambil data riwayat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page" style={{ padding: "20px" }}>
      <h1>History Hasil</h1>

      {/* NOTIFIKASI LOADING & ERROR AGAR HALAMAN AMAN */}
      {loading && <div style={{ margin: "10px 0", color: "#666" }}>Memuat riwayat...</div>}
      {errorMsg && <div style={{ margin: "10px 0", color: "red", fontWeight: "bold" }}>{errorMsg}</div>}

      {!loading && !errorMsg && (
        <table className="modern-table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>No</th>
              <th>Nama</th>
              <th>Jurusan</th>
              <th>Skor</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. PENGAMAN MAP: Menghindari error '.map is not a function' jika data kosong/salah */}
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "600" }}>{item.nama}</td>
                  <td>{item.jurusan}</td>
                  <td style={{ fontWeight: "bold", color: "#7b112c" }}>
                    {item.skor}
                  </td>
                  <td>
                    {item.created_at 
                      ? new Date(item.created_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short"
                        })
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#999", padding: "20px" }}>
                  Belum ada data riwayat yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;