import "./reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.js"
import Register from "./Register"
import Habits from "./Habits"
import Today from "./Today"
import History from "./History"
import Footer from "./Footer"
import Login from "./Login";
import UserContext from "./UserContext";
import { useState} from 'react';



export default function App() {
    const [user, setUser] = useState([])
    const [todayHabits, setTodayHabits] = useState([])

   
        return (
            <UserContext.Provider value = {{user, setUser, todayHabits, setTodayHabits}}>
            <BrowserRouter>
             <Header />
                <Routes>
                    <Route path ="/" element={<Login />}/>
                    <Route path="/cadastro" element={<Register />}/>
                    <Route path="/habitos" element={<Habits />}/>
                    <Route path="/hoje" element={<Today/>}/>
                    <Route path="/historico" element={<History/>}/>
                </Routes>
            <Footer />
            </BrowserRouter>
            </UserContext.Provider>
        );
    
    
  }
  