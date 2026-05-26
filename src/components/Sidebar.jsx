import {

  Link,
  useNavigate

} from "react-router-dom";

function Sidebar(){

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "admin"
    );

    navigate("/login");

  };

  return(

    <div className="sidebar">

      <h2>
        Admin Panel
      </h2>

      <ul>

        <li>
          <Link to="/admin">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/jurusan">
            Kelola Jurusan
          </Link>
        </li>

        <li>
          <Link to="/admin/history">
            History Hasil
          </Link>
        </li>

        <li>

          <button
            onClick={handleLogout}
          >

            Logout

          </button>

        </li>

      </ul>

    </div>

  );

}

export default Sidebar;