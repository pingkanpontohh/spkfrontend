import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/admin/Login";

import AdminDashboard
from "./pages/admin/AdminDashboard";

import AdminJurusan
from "./pages/admin/AdminJurusan";

import AdminHistory
from "./pages/admin/AdminHistory";

import Home from "./pages/Home";
import Topsis from "./pages/Topsis";
import Hasil from "./pages/Hasil";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/topsis"
          element={<Topsis />}
        />

        <Route
          path="/hasil"
          element={<Hasil />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/jurusan"
          element={<AdminJurusan />}
        />

        <Route
          path="/admin/history"
          element={<AdminHistory />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;