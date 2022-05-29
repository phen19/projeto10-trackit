import styled from 'styled-components';
import "./style.css"
import Logo from './images/Group 8.png'
import { Link } from "react-router-dom";
import  {ThreeDots}  from  'react-loader-spinner'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";





export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    let loadingAnimation = <ThreeDots color="#FFFFFF" height={45} width={60} />

    function Success(email, navigate, password, user, setUser) {
        setLoading(true)
        let data = { email: email, password: password};
    
        const requisicaoPost = axios.post(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
          data
        );
        requisicaoPost.then((response) => {
            setUser(response.data)
            navigate("/habitos");
        });
        requisicaoPost.catch((response) => console.log(response));
        
    }


 
        console.log(user);
      

        
    return(
        <>
            <Container onSubmit={(e) => Success(email,navigate, password,user, setUser , e.preventDefault())}>
                <img src={Logo} alt="Logo" />
                <input type="text"  placeholder="email" value ={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type = "submit">{loading ? loadingAnimation : 'Entrar'}</button>
                
                <Link to = "/cadastro" >
                    <h1>Não tem uma conta? Cadastre-se!</h1>
                </Link>
            </Container>
        </>
    )
}

            const Container = styled.form `
            font-family: 'Lexend Deca', sans-serif;
            display:flex;
            flex-direction: column;
            align-items: center;
           
            height: 100vh;
            width: 100vw;

            input{
            width:304px;
            height: 44px;
            margin-bottom: 6px;
            box-sizing: border-box;
            }

            img{
                margin-top: 60px;
                margin-bottom: 40px;
            }

            placeholder::{
                font-size: 20px;
                color: #DBDBDB;
               
            }
            button{
                width:304px;
                height: 44px;
                background-color:#52B6FF;
                border-radius: 5px;
                border:0;
                font-size: 20px;
                color: #FFFFFF;
                margin-bottom: 6px;
                display:flex;
                justify-content:center;
                align-items: center;
            }
           
`