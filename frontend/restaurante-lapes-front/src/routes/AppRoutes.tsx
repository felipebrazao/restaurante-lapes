import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cardapio from "../pages/Cardapio";

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cardapio" element={<Cardapio/>}/>
        </Routes>
        </BrowserRouter>
    )
}