import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Info from "./components/info/info";
import Pengguna from "./components/pengguna/pengguna";
import Profil from "./components/profil/profil";
import PenggunaCreate from "./components/pengguna/penggunacreate";
import PenggunaUpdate from "./components/pengguna/penggunaupdate";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Info />} />
            <Route path="pengguna" element={<Pengguna />} />
            <Route path="pengguna/tambah" element={<PenggunaCreate />} />
            <Route path="pengguna/edit/:id" element={<PenggunaUpdate />} />
            <Route path="profil" element={<Profil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
