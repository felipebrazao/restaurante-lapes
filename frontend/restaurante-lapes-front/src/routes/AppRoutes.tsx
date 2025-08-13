import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cardapio from "../pages/Cardapio";
import PainelAdmin from "../pages/PainelAdmin";
import Pedido from "../pages/Pedido";

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/cardapio" element={<Cardapio/>}/>
            <Route path="/admin" element={<PainelAdmin/>}/>
            <Route path="/pedido" element={<Pedido/>}/>
        </Routes>
        </BrowserRouter>
    )
}