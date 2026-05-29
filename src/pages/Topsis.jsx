import "./Topsis.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import "../components/Loader.css";

// MENGGUNAKAN INSTANCE CONFIG API DARI src/api.js
import API from "../services/api";

function Topsis() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // =========================
  // STATE BIODATA
  // =========================
  const [formData, setFormData] = useState({
    nama: "",
    sekolah: "",
    nilai_ijazah: "",
    jenis_kelamin: "",
    minat_utama: ""
  });

  // =========================
  // STATE JAWABAN
  // =========================
  const [jawaban, setJawaban] = useState({
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: ""
  });

  const pertanyaan = [
    "Saya tertarik pada komputer, pemrograman, dan teknologi digital.",
    "Saya suka berhitung dan memecahkan masalah logika.",
    "Saya suka berbicara dan bekerja sama dengan orang lain.",
    "Saya tertarik pada bisnis, penjualan, dan pemasaran.",
    "Saya suka menggambar, desain, atau visual kreatif.",
    "Saya tertarik pada mesin, listrik, atau peralatan teknik.",
    "Saya suka melayani orang lain dan tertarik pada dunia pariwisata."
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJawaban = (e) => {
    setJawaban({ ...jawaban, [e.target.name]: e.target.value });
  };

  // =========================
  // SUBMIT DATA
  // =========================
  const handleSubmit = async () => {
    // Amankan pengecekan input kosong sebelum menembak server
    if (!formData.nama || !formData.sekolah) {
      alert("Mohon lengkapi data nama dan asal sekolah Anda lebih dulu.");
      return;
    }

    setLoading(true);
    try {
      // 1. Kirim data ke route saveUser (/api/topsis/save)
      const response = await API.post("/api/topsis/save", {
        nama: formData.nama,
        sekolah: formData.sekolah,
        nilai_ijazah: formData.nilai_ijazah,
        jenis_kelamin: formData.jenis_kelamin,
        minat_utama: formData.minat_utama
      });
      console.log("Simpan User Berhasil:", response.data);

      // 2. Kirim data ke route prosesTopsis (/api/topsis/proses)
      const hasilTopsis = await API.post("/api/topsis/proses", {
        nama: formData.nama,
        jawaban: [
          jawaban.q1, jawaban.q2, jawaban.q3,
          jawaban.q4, jawaban.q5, jawaban.q6, jawaban.q7
        ]
      });
      console.log("Kalkulasi TOPSIS Berhasil:", hasilTopsis.data);

      // 3. Simpan data hasil kalkulasi array ke dalam LocalStorage
      localStorage.setItem("biodata", JSON.stringify(formData));
      localStorage.setItem("jawaban", JSON.stringify(jawaban));
      localStorage.setItem("hasil_topsis", JSON.stringify(hasilTopsis.data.hasil));

      // Navigasi ke halaman output hasil perhitungan
      navigate("/hasil");

    } catch (error) {
      console.error("Detail Error saat Submit:", error);
      alert("Gagal memproses TOPSIS. Periksa kembali log konsol backend atau koneksi TiDB Anda.");
    } finally {
      // JAMINAN MUTLAK: Loading ditutup dalam kondisi sukses maupun gagal
      setLoading(false); 
    }
  };

  return (
    <div className="topsis-page">
      {/* ========================================================= */}
      {/* OVERLAY LOADING MODAL (Menggunakan CSS Terintegrasi)       */}
      {/* ========================================================= */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-card">
            {/* Memanfaatkan Komponen Loader bawaan Anda di dalam kartu */}
            <Loader /> 
            <h3>Memproses Data</h3>
            <p>Sistem sedang menghitung rekomendasi program studi menggunakan metode TOPSIS. Mohon tunggu...</p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* KONTEN UTAMA FORMULIR KUESIONER                           */}
      {/* ========================================================= */}
      <div className="topsis-container">
        <h1>Tes Pemilihan Prodi</h1>
        <p className="subtitle">Jawab pertanyaan berikut sesuai minat dan kemampuanmu</p>

        {/* SECTION BIODATA */}
        <div className="section">
          <h2>Biodata</h2>
          <div className="form-grid">
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input type="text" name="nama" placeholder="Masukkan nama lengkap" value={formData.nama} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Asal Sekolah</label>
              <input type="text" name="sekolah" placeholder="Masukkan asal sekolah" value={formData.sekolah} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Nilai Rata-rata Ijazah</label>
              <input type="number" name="nilai_ijazah" placeholder="Masukkan nilai rata-rata" value={formData.nilai_ijazah} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Jenis Kelamin</label>
              <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="input-group full">
              <label>Minat Utama</label>
              <select name="minat_utama" value={formData.minat_utama} onChange={handleChange}>
                <option value="">Pilih Minat</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Teknik">Teknik</option>
                <option value="Bisnis">Bisnis</option>
                <option value="Pariwisata">Pariwisata</option>
                <option value="Desain">Desain</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION PERTANYAAN */}
        <div className="section">
          <h2>Pertanyaan</h2>
          <p className="skala">Skala: 1 = Sangat Tidak Suka sampai 5 = Sangat Suka</p>
          {pertanyaan.map((item, index) => (
            <div className="question-box" key={index}>
              <label>{index + 1}. {item}</label>
              <select name={`q${index + 1}`} value={jawaban[`q${index + 1}`]} onChange={handleJawaban}>
                <option value="">Pilih</option>
                <option value="1">1 - Sangat Tidak Suka</option>
                <option value="2">2 - Tidak Suka</option>
                <option value="3">3 - Netral</option>
                <option value="4">4 - Suka</option>
                <option value="5">5 - Sangat Suka</option>
              </select>
            </div>
          ))}
        </div>

        <div className="button-group" style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
          <button 
            className="btn-back" 
            onClick={() => navigate("/")}
            disabled={loading}
            style={{ padding: "18px", borderRadius: "18px", border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: "18px", fontWeight: "600" }}
          >
            ← Kembali
          </button>
          <button 
            className="btn-topsis" 
            onClick={handleSubmit}
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? "Sedang Menghitung..." : "Proses TOPSIS"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topsis;