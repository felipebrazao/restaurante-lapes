import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cardapio from "../pages/Cardapio";
import PainelAdmin from "../pages/PainelAdmin";

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/cardapio" element={<Cardapio/>}/>
            <Route path="/admin" element={<PainelAdmin/>}/>
        </Routes>
        </BrowserRouter>
    )
}