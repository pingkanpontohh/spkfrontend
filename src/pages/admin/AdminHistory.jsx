import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "./Admin.css";

function HistoryHasil() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // 1. PASTIKAN URL ENDPOINT SUDAH BENAR (Menembak router topsis/history)
      const response = await axios.get("https://spkbackend-gamma.vercel.app/api/topsis/history");
      
      // 2. AMBIL ARRAY DENGAN AMAN (Mendukung format objek .data atau array langsung)
      if (response.data && Array.isArray(response.data.data)) {
        setHistory(response.data.data);
      } else if (Array.isArray(response.data)) {
        setHistory(response.data);
      } else {
        setErrorMsg("Format data history dari server tidak valid.");
      }
    } catch (error) {
      console.error("Gagal memuat history:", error);
      setErrorMsg("Gagal terhubung ke server untuk mengambil data history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div className="topbar">
          <h1>History Hasil</h1>
        </div>

        {/* NOTIFIKASI STATE AGAR USER TAHU SIKLUS DATA */}
        {loading && <div style={{ padding: "20px", color: "#666" }}>Memuat riwayat penilaian...</div>}
        {errorMsg && <div style={{ padding: "20px", color: "red", fontWeight: "bold" }}>{errorMsg}</div>}

        {!loading && !errorMsg && (
          <div className="table-card">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Jurusan Rekomendasi</th>
                  <th>Skor Akhir</th>
                  <th>Tanggal Uji</th>
                </tr>
              </thead>
              <tbody>
                {/* 3. DIBERI PENGAMAN Array.isArray AGAR TIDAK PERNAH LAYAR PUTIH */}
                {Array.isArray(history) && history.length > 0 ? (
                  history.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td style={{ fontWeight: "600" }}>{item.nama || item.nama_user}</td>
                      <td>{item.jurusan || item.nama_jurusan || "Tidak Diketahui"}</td>
                      <td style={{ color: "#7b112c", fontWeight: "bold" }}>
                        {item.skor ? Number(item.skor).toFixed(4) : "0.0000"}
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
                    <td colSpan="5" style={{ textAlign: "center", color: "#999", padding: "30px" }}>
                      Belum ada riwayat hasil perhitungan TOPSIS yang tersimpan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryHasil;