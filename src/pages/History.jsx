import {

  useEffect,
  useState

} from "react";

import axios from "axios";

function History(){

  const [data,setData] =
  useState([]);

  useEffect(()=>{

    fetchHistory();

  },[]);

  const fetchHistory = async () => {

    const response =
    await axios.get(

      "https://spkbackend-gamma.vercel.app/"

    );

    setData(response.data);

  };

  return(

    <div className="history-page">

      <h1>
        History Hasil
      </h1>

      <table>

        <thead>

          <tr>

            <th>Nama</th>
            <th>Jurusan</th>
            <th>Skor</th>
            <th>Tanggal</th>

          </tr>

        </thead>

        <tbody>

          {

            data.map((item,index)=>(

              <tr key={index}>

                <td>{item.nama}</td>

                <td>{item.jurusan}</td>

                <td>{item.skor}</td>

                <td>
                  {item.created_at}
                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default History;