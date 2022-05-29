import styled from 'styled-components';
import "./style.css"
import Logo from './images/Group 8.png'
import { Link } from "react-router-dom";
import  {ThreeDots}  from  'react-loader-spinner'
import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";




function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [picture, setPicture] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    let loadingAnimation = <ThreeDots color="#FFFFFF" height={45} width={60} />

    function buttonSuccess(email, navigate,password, name, picture) {

        setLoading(true)
        let data = {    
            email: email,
            name: name,
            image: picture,
            password: password
                    };
        
        const requisicaoPost = axios.post(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
          data
        );
        requisicaoPost.then(() => {
          navigate("/");
        });
        requisicaoPost.catch((error) => {alert(error.response.data.message)
        setLoading(false)});
    }
    


    return(
        <>
            <Container onSubmit={(e) => buttonSuccess(email,navigate, password,name,picture,e.preventDefault())}>
                <img src={Logo} alt="Logo" />
                <input type="text" disabled={loading ? true : false} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" disabled={loading ? true : false} placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" disabled={loading ? true : false} placeholder="nome" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="text" disabled={loading ? true : false} placeholder="foto" value={picture} onChange={(e) => setPicture(e.target.value)} required/>
                <button disabled={loading ? true : false} type = "submit">{loading ? loadingAnimation : 'Cadastrar'}</button>
                <Link to = "/" >
                    <h1>Já tem uma conta? Faça login!</h1>
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
                    justify-content: center;
                    align-items:center;
                }
`

export default Register;