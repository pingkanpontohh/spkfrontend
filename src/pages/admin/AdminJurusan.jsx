import {

  useEffect,
  useState

} from "react";

import axios from "axios";

import Sidebar
from "../../components/Sidebar";

import "./Admin.css";

function AdminJurusan(){

  const [jurusan,setJurusan] =
  useState([]);

  useEffect(()=>{

    fetchJurusan();

  },[]);

  const fetchJurusan = async () => {

    try{

      const response =
      await axios.get(

        "http://localhost:5000/api/jurusan"

      );

      setJurusan(response.data);

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
            Kelola Jurusan
          </h1>

          <button
            className="add-btn"
          >
            + Tambah Jurusan
          </button>

        </div>

        <div className="table-card">

          <table className="modern-table">

            <thead>

              <tr>

                <th>No</th>
                <th>Nama Jurusan</th>
                <th>Aksi</th>

              </tr>

            </thead>

            <tbody>

              {

                jurusan.map((item,index)=>(

                  <tr key={index}>

                    <td>
                      {index+1}
                    </td>

                    <td>
                      {item.nama_jurusan}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                        >
                          Hapus
                        </button>

                      </div>

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

export default AdminJurusan;