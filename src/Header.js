import styled from 'styled-components';
import "./style.css"
import UserContext from "./UserContext";
import { useContext } from 'react';
import { useLocation } from 'react-router-dom'
function Header(){
    const { user, setUser } = useContext(UserContext);
    const {pathname} = useLocation()
    
    
    
    return (pathname !== '/' && pathname !== '/cadastro') ? (
        <>
        <Top>
            <h1>
                Trackit
            </h1>
            <img src={user.image} alt="imagem" />
        </Top>
        </>
    ) :
    (
        <></>
    )
}

export default Header;

const Top = styled.div `
            width: 100vw;
            height: 70px;
            background-color: #126BA5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 18px;
            box-sizing: border-box;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
            position: fixed;
            top:0;
            left:0;

            h1{
                font-size: 40px;
                font-family: "Playball", cursive;
                color: #FFFFFF
            }

            img {
                width: 51px;
                height: 51px;
                border-radius: 50%;
            }

`