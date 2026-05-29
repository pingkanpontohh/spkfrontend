import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "./Admin.css";

function AdminJurusan() {
  const [jurusan, setJurusan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // State untuk form input tambah/edit jurusan baru
  const [namaJurusanInput, setNamaJurusanInput] = useState("");
  const [kategoriIdInput, setKategoriIdInput] = useState("1");
  const [deskripsiInput, setDeskripsiInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- BERIKUT STATE BARU UNTUK KEBUTUHAN MODAL EDIT ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchJurusan();
  }, []);

  // 1. FUNGSI AMBIL DATA DARI BACKEND
  const fetchJurusan = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get("https://spkbackend-gamma.vercel.app/api/jurusan");
      
      if (response.data && Array.isArray(response.data.data)) {
        setJurusan(response.data.data);
      } else if (Array.isArray(response.data)) {
        setJurusan(response.data);
      } else {
        setErrorMessage("Format data dari server tidak dikenali.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Gagal menyambung ke server backend.");
    } finally {
      setLoading(false);
    }
  };

  // 2. FUNGSI UNTUK MEMBUKA FORM EDIT DATA
  const handleEditClick = (item) => {
    setIsEditMode(true);
    setSelectedId(item.id); // Mengunci ID jurusan yang dipilih
    setNamaJurusanInput(item.nama_jurusan);
    setKategoriIdInput(item.kategori_id ? item.kategori_id.toString() : "1");
    setDeskripsiInput(item.deskripsi);
    setIsModalOpen(true);
  };

  // 3. FUNGSI UTAMA SAAT SUBMIT FORM (MENDUKUNG TAMBAH & EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaJurusanInput.trim()) {
      alert("Nama jurusan tidak boleh kosong!");
      return;
    }

    const dataPayload = {
      kategori_id: parseInt(kategoriIdInput),
      nama_jurusan: namaJurusanInput,
      deskripsi: deskripsiInput || "Deskripsi belum diisi",
      gambar: "default.png"
    };

    try {
      if (isEditMode) {
        // JIKA DALAM MODE EDIT: Kirim req PUT ke endpoint backend yang spesifik membawa ID
        await axios.put(`https://spkbackend-gamma.vercel.app/api/jurusan/${selectedId}`, dataPayload);
        alert("Data jurusan berhasil diperbarui!");
      } else {
        // JIKA DALAM MODE TAMBAH BARU: Kirim req POST
        await axios.post("https://spkbackend-gamma.vercel.app/api/jurusan", dataPayload);
        
        // Peringatan pengingat pengisian bobot kriteria agar tidak merusak rumus TOPSIS
        alert("Jurusan baru berhasil ditambahkan! PENTING: Mohon pastikan untuk segera mengisi bobot penilaian kriteria untuk alternatif baru ini di database agar perhitungan TOPSIS tidak mengalami crash.");
      }
      
      // Bersihkan dan tutup modal form
      handleCloseModal();
      fetchJurusan(); 
    } catch (error) {
      console.error(error);
      alert(`Gagal ${isEditMode ? "memperbarui" : "menambahkan"} jurusan. Periksa rute api atau koneksi database backend Anda.`);
    }
  };

  // 4. FUNGSI UNTUK HAPUS DATA JURUSAN
  const handleHapusClick = async (id) => {
    if (!id) {
      alert("ID Jurusan tidak valid.");
      return;
    }

    if (window.confirm("Apakah Anda yakin ingin menghapus jurusan ini? Tindakan ini mungkin memengaruhi data relasi penilaian kriteria.")) {
      try {
        await axios.delete(`https://spkbackend-gamma.vercel.app/api/jurusan/${id}`);
        alert("Jurusan berhasil dihapus dari database!");
        fetchJurusan();
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus jurusan. Pastikan backend mendukung metode DELETE pada endpoint /api/jurusan/:id");
      }
    }
  };

  // FUNGSI UTILS: Reset form jika modal ditutup
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedId(null);
    setNamaJurusanInput("");
    setDeskripsiInput("");
    setKategoriIdInput("1");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <div className="topbar">
          <h1>Kelola Jurusan</h1>
          <button className="add-btn" onClick={() => { setIsEditMode(false); setIsModalOpen(true); }}>
            + Tambah Jurusan
          </button>
        </div>

        {loading && <div style={{ padding: "20px", color: "#666" }}>Memuat data jurusan...</div>}
        {errorMessage && <div style={{ padding: "20px", color: "red" }}>{errorMessage}</div>}

        {!loading && !errorMessage && (
          <div className="table-card">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Jurusan</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(jurusan) && jurusan.length > 0 ? (
                  jurusan.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td style={{ fontWeight: "bold" }}>{item.nama_jurusan}</td>
                      <td style={{ color: "#555", fontSize: "14px" }}>{item.deskripsi}</td>
                      <td>
                        <div className="action-buttons">
                          {/* SEKARANG TOMBOL EDIT AKAN MENGIRIMKAN SELURUH DATA ITEM TERPILIH */}
                          <button 
                            className="edit-btn" 
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          {/* SEKARANG TOMBOL HAPUS AKAN MENGIRIMKAN ID SPESIFIK JURUSAN */}
                          <button 
                            className="delete-btn" 
                            onClick={() => handleHapusClick(item.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "#aaa", padding: "20px" }}>
                      Tidak ada data jurusan tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL POPUP FORM UNTUK INPUT / EDIT DATA */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="modal-content" style={{ background: "white", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "450px" }}>
            {/* Judul modal berubah dinamis sesuai aksi yang dipilih */}
            <h3 style={{ marginBottom: "15px", color: "#7b112c" }}>
              {isEditMode ? "Ubah Data Jurusan" : "Tambah Jurusan Baru"}
            </h3>
            <form onSubmit={handleSubmit}>
              
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Kategori Kelompok</label>
                <select value={kategoriIdInput} onChange={(e) => setKategoriIdInput(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}>
                  <option value="1">1 - Rekayasa / Teknik</option>
                  <option value="2">2 - Tata Niaga / Bisnis</option>
                  <option value="3">3 - Pariwisata / Sosial</option>
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Nama Jurusan</label>
                <input type="text" placeholder="Masukkan nama jurusan..." value={namaJurusanInput} onChange={(e) => setNamaJurusanInput(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} required />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Deskripsi Singkat</label>
                <textarea rows="3" placeholder="Deskripsi mengenai kompetensi kelulusan jurusan..." value={deskripsiInput} onChange={(e) => setDeskripsiInput(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd", resize: "none" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: "10px 15px", borderRadius: "6px", border: "1px solid #ccc", background: "#f9f9f9", cursor: "pointer" }}>Batal</button>
                <button type="submit" style={{ padding: "10px 20px", borderRadius: "6px", border: "none", background: "#7b112c", color: "white", fontWeight: "bold", cursor: "pointer" }}>
                  {isEditMode ? "Simpan Perubahan" : "Simpan Data"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJurusan;