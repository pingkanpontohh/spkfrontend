// src/pages/Home.jsx

import {
  FaGraduationCap,
  FaChartBar,
  FaLaptopCode,
  FaBolt
} from "react-icons/fa";

import {
  useContext
} from "react";

import {
  ThemeContext
} from "../context/ThemeContext";

import {
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";

import "./Home.css";

function Home() {

  const navigate = useNavigate();

  const [selectedJurusan, setSelectedJurusan] =
    useState(null);

  const {

  darkMode,
  setDarkMode

    } = useContext(
      ThemeContext
    );

  const jurusan = [

    {
      nama: "Teknik Sipil",
      kategori: "Teknik",
      gambar: "/img/jurusan/sipil.png",
      desc:
        "Jurusan yang fokus pada pembangunan infrastruktur, konstruksi, dan desain bangunan.",
      prospek:
        "Kontraktor, Konsultan, Site Engineer, Pengawas Proyek.",
      skill:
        "Desain bangunan, konstruksi, struktur, dan manajemen proyek."
    },

    {
      nama: "Teknik Elektro",
      kategori: "Teknik",
      gambar: "/img/jurusan/elektro.png",
      desc:
        "Mempelajari sistem kelistrikan, elektronika, dan teknologi energi.",
      prospek:
        "Engineer listrik, teknisi industri, automation engineer.",
      skill:
        "Elektronika, instalasi listrik, kontrol industri."
    },

    {
      nama: "Teknik Mesin",
      kategori: "Teknik",
      gambar: "/img/jurusan/mesin.png",
      desc:
        "Fokus pada mesin, manufaktur, dan teknologi industri.",
      prospek:
        "Mechanical Engineer, Teknisi Industri, Quality Control.",
      skill:
        "Mesin industri, CAD, manufaktur."
    },

    {
      nama: "Pariwisata",
      kategori: "Niaga",
      gambar: "/img/jurusan/pariwisata.png",
      desc:
        "Bidang hospitality, perjalanan wisata, dan manajemen destinasi.",
      prospek:
        "Tour Guide, Hotel Management, Travel Consultant.",
      skill:
        "Public speaking, hospitality, pelayanan."
    },

    {
      nama: "Akuntansi",
      kategori: "Niaga",
      gambar: "/img/jurusan/akuntansi.png",
      desc:
        "Jurusan pengelolaan keuangan, perpajakan, dan laporan bisnis.",
      prospek:
        "Akuntan, Auditor, Staff Keuangan.",
      skill:
        "Keuangan, perpajakan, laporan bisnis."
    },

    {
      nama: "Administrasi Bisnis",
      kategori: "Niaga",
      gambar: "/img/jurusan/administrasi-bisnis.png",
      desc:
        "Belajar manajemen bisnis, pemasaran, dan administrasi perusahaan.",
      prospek:
        "HRD, Marketing, Business Consultant.",
      skill:
        "Komunikasi bisnis, manajemen, administrasi."
    }

  ];

  return (

    <div className={
        darkMode
        ? "home dark"
        : "home"
      }>

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">

          <h1>Pemilihan Jurusan</h1>

          <p>Politeknik Negeri Manado</p>

        </div>

        <ul>

          <li>
            <a href="#beranda">
              Beranda
            </a>
          </li>

          <li>
            <a href="#jurusan">
              Jurusan
            </a>
          </li>

          <li>
            <a href="#tentang">
              Tentang
            </a>
          </li>
          <li>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >

              {
                darkMode
                ? "☀ Light"
                : "🌙 Dark"
              }

            </button>

          </li>

          <li>

            <button
              onClick={() => navigate("/topsis")}
            >
              Mulai Tes
            </button>

          </li>

        </ul>

      </nav>

      {/* HERO */}

      <section
        className="hero"
        id="beranda"
      >

        <div className="overlay">

          <h1>
            Temukan Jurusan <br />
            Sesuai Potensimu
          </h1>

          <p>
            Sistem Pendukung Keputusan berbasis
            metode TOPSIS untuk membantu menentukan
            jurusan terbaik sesuai minat dan kemampuanmu.
          </p>

          <button
            onClick={() => navigate("/topsis")}
          >
            Mulai Tes Sekarang
          </button>

        </div>

      </section>

      {/* STATISTIK */}

      <section className="stats">

        <div className="card-stat">

          <FaGraduationCap className="icon" />

          <h2>12+</h2>

          <p>Jurusan</p>

        </div>

        <div className="card-stat">

          <FaChartBar className="icon" />

          <h2>TOPSIS</h2>

          <p>Metode SPK</p>

        </div>

        <div className="card-stat">

          <FaLaptopCode className="icon" />

          <h2>1000+</h2>

          <p>Mahasiswa</p>

        </div>

        <div className="card-stat">

          <FaBolt className="icon" />

          <h2>95%</h2>

          <p>Akurasi</p>

        </div>

      </section>

      {/* JURUSAN */}

      <section
        className="jurusan-section"
        id="jurusan"
      >

        <div className="title">

          <h2>Jurusan Populer</h2>

          <p>
            Pilih jurusan sesuai minat dan potensimu
          </p>

        </div>

        <div className="jurusan-container">

          {jurusan.map((item, index) => (

            <div
              className="jurusan-card"
              key={index}
            >

              <img
                src={item.gambar}
                alt={item.nama}
              />

              <div className="jurusan-content">

                <span className="badge">
                  {item.kategori}
                </span>

                <h3>
                  {item.nama}
                </h3>

                <p>
                  {item.desc}
                </p>

                <button
                  onClick={() =>
                    setSelectedJurusan(item)
                  }
                >
                  Lihat Detail
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* TENTANG */}

      <section
        className="tentang"
        id="tentang"
      >

        <div className="tentang-container">

          <h2>
            Tentang Sistem
          </h2>

          <p>
            Sistem Pendukung Keputusan ini dibuat
            untuk membantu calon mahasiswa memilih
            jurusan yang sesuai berdasarkan minat,
            kemampuan, dan potensi menggunakan
            metode TOPSIS.
          </p>

        </div>

      </section>

      {/* MODAL */}

      {selectedJurusan && (

        <div className="modal-overlay">

          <div className="modal">

            <img
              src={selectedJurusan.gambar}
              alt={selectedJurusan.nama}
            />

            <h2>
              {selectedJurusan.nama}
            </h2>

            <p>
              {selectedJurusan.desc}
            </p>

            <h4>Prospek Kerja</h4>

            <p>
              {selectedJurusan.prospek}
            </p>

            <h4>Keahlian</h4>

            <p>
              {selectedJurusan.skill}
            </p>

            <div className="modal-button">

              <button
                className="btn-close"
                onClick={() =>
                  setSelectedJurusan(null)
                }
              >
                Tutup
              </button>

              <button
                className="btn-test"
                onClick={() =>
                  navigate("/topsis")
                }
              >
                Mulai Tes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Home;