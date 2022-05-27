import styled from 'styled-components';
import "./style.css"
import teste from './images/Rectangle 14.png'

function Header(){
    return(
        <>
        <Top>
            <h1>
                Trackit
            </h1>
            <img src={teste} alt="" />
        </Top>
        </>
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

            h1{
                font-size: 40px;
                font-family: "Playball", cursive;
                color: #FFFFFF
            }

`