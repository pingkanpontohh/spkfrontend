import {

  useEffect,
  useState

} from "react";

import axios from "axios";

import Sidebar
from "../../components/Sidebar";

import "./Admin.css";

function HistoryHasil(){

  const [history,setHistory] =
  useState([]);

  useEffect(()=>{

    fetchHistory();

  },[]);

  const fetchHistory = async () => {

    try{

      const response =
      await axios.get(

        "http://localhost:5000/api/topsis/history"

      );

      setHistory(response.data);

    }catch(error){

      console.log(error);

    }

  };

  return(

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">

        <div className="topbar">

          <h1>
            History Hasil
          </h1>

        </div>

        <div className="table-card">

          <table className="modern-table">

            <thead>

              <tr>

                <th>No</th>
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Skor</th>
                <th>Tanggal</th>

              </tr>

            </thead>

            <tbody>

              {

                history.map((item,index)=>(

                  <tr key={index}>

                    <td>
                      {index+1}
                    </td>

                    <td>
                      {item.nama}
                    </td>

                    <td>
                      {item.jurusan}
                    </td>

                    <td>
                      {item.skor}
                    </td>

                    <td>

                      {

                        new Date(
                          item.created_at
                        ).toLocaleDateString()

                      }

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default HistoryHasil;