
import styled from 'styled-components'

function History(){
    return(
        <>
        <Title>
        <h1>Histórico</h1>
        </Title>
        <Content>
        Em breve você poderá ver o histórico dos seus hábitos aqui!
        </Content>
        </>
    )
}

export default History;

const Title = styled.div `  
                            width: 100vw;
                            heigth: 70px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top:98px;
                            padding: 0px 18px;
                            box-sizing: border-box;
                            font-family: "Lexend Deca", sans serif;
                            color: #126BA5;
                            font-size: 24px;
        
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