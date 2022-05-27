import Header from "./Header.js"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import styled from 'styled-components';

function Habits(){
    const { token, setToken } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token.token}` //Padrão da API (Bearer Authentication)
            }
        }
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        requisicao.then((resposta) =>{
                setHabits(resposta.data);
        });
    },[]);

    console.log(habits)

    if (habits === [] || habits === null || habits.length === 0) {
        return (
          <>
          <Header />
            <Title>
                <h1>Meus Hábitos</h1>
                <button>+</button>
            </Title>
            <Content>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </Content>
          </>
        );
      } else {
    return(
        <>
        <Header />
        <h1>{habits}</h1>
        </>
    )
}
}

const Title = styled.div `  
                            width: 100vw;
                            heigth: 70px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top:28px;
                            padding: 0px 18px;
                            box-sizing: border-box;
                            font-family: "Lexend Deca", sans serif;
                            color: #126BA5;
                            font-size: 24px;

                            button{
                                width: 40px;
                                height: 35px;
                                border-radius: 5px;
                                color: #FFFFFF;
                                background-color: #52B6FF;
                                font-size: 26px;
                                text-align: center;
                                border: 0;
                                display:flex;
                                justify-content: center;
                            }

`
const Content = styled.div`
                            width:338px;
                            heigth: 74px;
                            color: #666666;
                            font-family: "Lexend Deca", sans serif;
                            font-size: 18px;
                            padding: 0px 18px;
                            margin-top: 28px;
`
export default Habits;