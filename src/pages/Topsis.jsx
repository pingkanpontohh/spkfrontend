// src/pages/Topsis.jsx
import "./Topsis.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import "../components/Loader.css";

// MENGGUNAKAN INSTANCE API YANG SUDAH DIATUR BASEURL-NYA
import API from "../api"; 

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
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: ""
  });

  // =========================
  // PERTANYAAN
  // =========================
  const pertanyaan = [
    "Saya tertarik pada komputer, pemrograman, dan teknologi digital.",
    "Saya suka berhitung dan memecahkan masalah logika.",
    "Saya suka berbicara dan bekerja sama dengan orang lain.",
    "Saya tertarik pada bisnis, penjualan, dan pemasaran.",
    "Saya suka menggambar, desain, atau visual kreatif.",
    "Saya tertarik pada mesin, listrik, atau peralatan teknik.",
    "Saya suka melayani orang lain dan tertarik pada dunia pariwisata."
  ];

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // HANDLE JAWABAN
  // =========================
  const handleJawaban = (e) => {
    setJawaban({
      ...jawaban,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // ======================================
      // 1. SIMPAN USER (Diabaikan jika endpoint registrasi Anda berbeda)
      // ======================================
      const response = await API.post("/api/auth/register", {
        nama: formData.nama,
        sekolah: formData.sekolah,
        nilai_ijazah: formData.nilai_ijazah,
        jenis_kelamin: formData.jenis_kelamin,
        minat_utama: formData.minat_utama
      });
      console.log("Simpan User Berhasil:", response.data);

      // ======================================
      // 2. PROSES TOPSIS (Menembak router /api/topsis di backend)
      // ======================================
      const hasilTopsis = await API.post("/api/topsis", {
        nama: formData.nama,
        jawaban: [
          jawaban.q1,
          jawaban.q2,
          jawaban.q3,
          jawaban.q4,
          jawaban.q5,
          jawaban.q6,
          jawaban.q7
        ]
      });
      console.log("Kalkulasi TOPSIS Berhasil:", hasilTopsis.data);

      // ======================================
      // 3. SIMPAN LOCAL STORAGE
      // ======================================
      localStorage.setItem("biodata", JSON.stringify(formData));
      localStorage.setItem("jawaban", JSON.stringify(jawaban));
      localStorage.setItem("hasil_topsis", JSON.stringify(hasilTopsis.data.hasil));

      // ======================================
      // 4. PINDAH HALAMAN
      // ======================================
      navigate("/hasil");

    } catch (error) {
      console.error("Detail Error saat Submit:", error);
      alert("Gagal memproses TOPSIS. Pastikan koneksi backend aktif.");
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="topsis-page">
      <div className="topsis-container">
        {/* TITLE */}
        <h1>Tes Pemilihan Prodi</h1>
        <p className="subtitle">
          Jawab pertanyaan berikut sesuai minat dan kemampuanmu
        </p>

        {/* ========================= */}
        {/* BIODATA */}
        {/* ========================= */}
        <div className="section">
          <h2>Biodata</h2>
          <div className="form-grid">
            {/* NAMA */}
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={handleChange}
              />
            </div>

            {/* SEKOLAH */}
            <div className="input-group">
              <label>Asal Sekolah</label>
              <input
                type="text"
                name="sekolah"
                placeholder="Masukkan asal sekolah"
                value={formData.sekolah}
                onChange={handleChange}
              />
            </div>

            {/* NILAI */}
            <div className="input-group">
              <label>Nilai Rata-rata Ijazah</label>
              <input
                type="number"
                name="nilai_ijazah"
                placeholder="Masukkan nilai rata-rata"
                value={formData.nilai_ijazah}
                onChange={handleChange}
              />
            </div>

            {/* JK */}
            <div className="input-group">
              <label>Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleChange}
              >
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* MINAT */}
            <div className="input-group full">
              <label>Minat Utama</label>
              <select
                name="minat_utama"
                value={formData.minat_utama}
                onChange={handleChange}
              >
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

        {/* ========================= */}
        {/* PERTANYAAN */}
        {/* ========================= */}
        <div className="section">
          <h2>Pertanyaan</h2>
          <p className="skala">
            Skala: 1 = Sangat Tidak Suka sampai 5 = Sangat Suka
          </p>

          {pertanyaan.map((item, index) => (
            <div className="question-box" key={index}>
              <label>
                {index + 1}. {item}
              </label>
              <select
                name={`q${index + 1}`}
                value={jawaban[`q${index + 1}`]}
                onChange={handleJawaban}
              >
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

        {/* ========================= */}
        {/* BUTTON */}
        {/* ========================= */}
        <div className="button-group">
          <button className="btn-back" onClick={() => navigate("/")}>
            ← Kembali
          </button>
          <button className="btn-topsis" onClick={handleSubmit}>
            Proses TOPSIS
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topsis;