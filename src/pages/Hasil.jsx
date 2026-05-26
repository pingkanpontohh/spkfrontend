// src/pages/Hasil.jsx

import "./Hasil.css";

import jsPDF from "jspdf";

import { useNavigate } from "react-router-dom";
import ChartCard
from "../components/ChartCard";

function Hasil() {

  const navigate = useNavigate();

  // =========================
  // AMBIL DATA LOCAL STORAGE
  // =========================

  const biodata =
    JSON.parse(
      localStorage.getItem("biodata")
    );

  const hasil =
    JSON.parse(
      localStorage.getItem(
        "hasil_topsis"
      )
    );

  // =========================
  // REKOMENDASI UTAMA
  // =========================

  const rekomendasi =
    hasil && hasil.length > 0
    ? hasil[0]
    : null;

  // =========================
  // CETAK PDF
  // =========================

  const handlePrint = () => {

    const pdf = new jsPDF();

    pdf.setFontSize(22);

    pdf.text(
      "HASIL REKOMENDASI PRODI",
      50,
      20
    );

    // =========================
    // BIODATA
    // =========================

    pdf.setFontSize(16);

    pdf.text(
      "Biodata Peserta",
      20,
      40
    );

    pdf.setFontSize(12);

    pdf.text(
      `Nama : ${biodata.nama}`,
      20,
      50
    );

    pdf.text(
      `Asal Sekolah : ${biodata.sekolah}`,
      20,
      60
    );

    pdf.text(
      `Nilai Ijazah : ${biodata.nilai_ijazah}`,
      20,
      70
    );

    pdf.text(
      `Jenis Kelamin : ${biodata.jenis_kelamin}`,
      20,
      80
    );

    pdf.text(
      `Minat Utama : ${biodata.minat_utama}`,
      20,
      90
    );

    // =========================
    // REKOMENDASI
    // =========================

    pdf.setFontSize(16);

    pdf.text(
      "Rekomendasi Utama",
      20,
      110
    );

    pdf.setFontSize(20);

    pdf.text(
      rekomendasi.nama,
      20,
      125
    );

    pdf.setFontSize(12);

    pdf.text(
      `Skor : ${rekomendasi.skor}`,
      20,
      135
    );

    // =========================
    // RANKING
    // =========================

    pdf.setFontSize(16);

    pdf.text(
      "Ranking Prodi",
      20,
      155
    );

    let y = 170;

    hasil.forEach((item) => {

      pdf.text(

        `${item.ranking}. ${item.nama} | Skor: ${item.skor}`,

        20,

        y

      );

      y += 10;

    });

    pdf.save(
      "hasil-rekomendasi.pdf"
    );

  };

  return (

    <div className="hasil-page">

      <div className="hasil-container">

        <h1>
          Hasil Rekomendasi Prodi
        </h1>

        {/* BUTTON PDF */}

        <div className="pdf-button">

          <button
            onClick={handlePrint}
          >
            Cetak PDF
          </button>

        </div>

        <p className="subtitle">

          Berikut hasil rekomendasi
          berdasarkan jawaban yang
          telah diberikan

        </p>

        {/* BIODATA */}

        <div className="section">

          <h2>
            Biodata Peserta
          </h2>

          <table>

            <tbody>

              <tr>
                <td>Nama</td>
                <td>{biodata.nama}</td>
              </tr>

              <tr>
                <td>Asal Sekolah</td>
                <td>{biodata.sekolah}</td>
              </tr>

              <tr>
                <td>Nilai Rata-rata Ijazah</td>
                <td>
                  {biodata.nilai_ijazah}
                </td>
              </tr>

              <tr>
                <td>Jenis Kelamin</td>
                <td>
                  {biodata.jenis_kelamin}
                </td>
              </tr>

              <tr>
                <td>Minat Utama</td>
                <td>
                  {biodata.minat_utama}
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* REKOMENDASI */}

        {

          rekomendasi && (

            <div className="recommendation">

              <h2>
                Rekomendasi Utama
              </h2>

              <h3>
                {rekomendasi.nama}
              </h3>

              <p>

                Skor:
                {" "}
                {rekomendasi.skor}

              </p>

            </div>

          )

        }

        {/* RANKING */}

        <div className="section">

          <h2>
            Ranking Prodi
          </h2>

          <table>

            <thead>

              <tr>

                <th>Ranking</th>
                <th>Jurusan</th>
                <th>Skor</th>

              </tr>

            </thead>
            <div className="section">

              <h2>
                Grafik Ranking
              </h2>

              <ChartCard
                data={hasil}
              />

            </div>

            <tbody>

              {

                hasil &&
                hasil.map((item,index)=>(

                  <tr key={index}>

                    <td>
                      {item.ranking}
                    </td>

                    <td>
                      {item.nama}
                    </td>

                    <td>
                      {item.skor}
                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

        {/* BUTTON */}

        <div className="back-button">

          <button
            onClick={() => navigate("/")}
          >
            Kembali ke Beranda
          </button>

        </div>

      </div>

    </div>

  );

}

export default Hasil;