import Sidebar from "../../components/Sidebar";

import {

  Users,
  GraduationCap,
  ClipboardList

} from "lucide-react";

import "./Admin.css";

function DashboardAdmin(){

  return(

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">

        <div className="topbar">

          <h1>
            Dashboard Admin
          </h1>

        </div>

        {/* CARD */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon users">

              <Users size={32} />

            </div>

            <div>

              <h3>Total User</h3>
              <p>120</p>

            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-icon jurusan">

              <GraduationCap size={32} />

            </div>

            <div>

              <h3>Total Jurusan</h3>
              <p>6</p>

            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-icon hasil">

              <ClipboardList size={32} />

            </div>

            <div>

              <h3>Total Hasil</h3>
              <p>300</p>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="chart-card">

          <h2>
            Statistik Pengguna
          </h2>

          <div className="fake-chart">

            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
            <div className="bar bar4"></div>
            <div className="bar bar5"></div>

          </div>

        </div>

        {/* ACTIVITY */}

        <div className="activity-card">

          <h2>
            Aktivitas Terbaru
          </h2>

          <ul>

            <li>
              User baru melakukan tes TOPSIS
            </li>

            <li>
              Admin mengubah data jurusan
            </li>

            <li>
              Hasil rekomendasi berhasil dicetak
            </li>

            <li>
              Sistem berhasil menyimpan history
            </li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default DashboardAdmin;