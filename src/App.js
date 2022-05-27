import "./reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.js"
import Register from "./Register"
import Habits from "./Habits"
import Today from "./Today"
import History from "./History"
import Footer from "./Footer"
import Login from "./Login";
import Teste from "./Teste";
import UserContext from "./UserContext";
import { useState, useEffect } from 'react';


export default function App() {
    const [token, setToken] = useState([])
        return (
            <UserContext.Provider value = {{token, setToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path ="/" element={<Login />}/>
                    <Route path="/cadastro" element={<Register />}/>
                    <Route path="/habitos" element={<Habits />}/>
                    <Route path="/hoje" element={<Today/>}/>
                    <Route path="/historico" element={<History/>}/>
                    <Route path="/teste" element={<Teste/>}/>
                </Routes>
            </BrowserRouter>
            </UserContext.Provider>
        );
    
    
  }
  