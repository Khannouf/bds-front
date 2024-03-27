
import { Route, Routes } from "react-router-dom"
import Title from "../components/Title"
import { Inscription } from "../components/Inscription"
import { Connexion } from "../components/Connexion"
import { Admin } from "../views/admin"


const Router = () => {
  return <Routes>
    <Route path="/" element={<Title />} />
    <Route path="/inscription" element={<Inscription />} />
    <Route path="/connexion" element={<Connexion />} />
    <Route path="/admin" element={<Admin />} />

  </Routes>
}

export default Router
