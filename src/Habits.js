import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner'

function Habits(){
    const { user } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const habitDays = ["D","S","T","Q","Q","S","S"]
    const [days, setDays] =useState([]);
    const [showCreate, setShowCreate] = useState(false)
    const [habit, setHabit] = useState("")
    const [loading, setLoading] = useState(false)
    let loadingAnimation = <ThreeDots color="#FFFFFF" height={35} width={45} />
    const [refreshAxios, setRefreshAxios] = useState(false)
    const config = {
      headers: {
          "Authorization": `Bearer ${user.token}` //Padrão da API (Bearer Authentication)
      }
    }
    
    useEffect(() => {
        
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        requisicao.then((resposta) =>{
                setHabits(resposta.data);
        });
    },[refreshAxios]);

    function excludeHabit(id) {
      let confirmation = window.confirm('Quer mesmo excluir este hábito?')
      if (confirmation) {
          const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
           config)
          promise.then(reponse => {
             setRefreshAxios(!refreshAxios)
          })
          promise.catch(error => console.log(error.response))
      }
    }

    function toggleCreate(){
    if(showCreate === true){
        setShowCreate(false)
        console.log(showCreate)
    }else{
        setShowCreate(true)
        console.log(loading)
    }
    }

    function toggleDays(id) {
        
        const jaSelecionado = days.some(day => day === id);
        
        if (!jaSelecionado) {
          setDays([...days,  id]);
         
        } else {
          const newDays = days.filter(day => day !== id);
          setDays(newDays);
        
        }
       days.sort( (a, b) => {return a - b} )
    }
    
    function ShowHabits({id, name, days}) {
        return (
            <Habit>
                <ion-icon name="trash-outline" onClick={() => excludeHabit(id)}></ion-icon>
                <p>{name}</p>
                <div className='Days'>
                    {habitDays.map((day, i) => 
                        <button key={`${day} - ${i}`} className={days.includes(i) ? 'selected' : ''}>{day}</button>
                    )}   
                </div>
            </Habit>
        )
    }

    if (habits === [] || habits === null || habits.length === 0) {
        return (
          <>
            <Title>
                <h1>Meus Hábitos</h1>
                <button onClick={toggleCreate}>+</button>
            </Title>
            <Create show={showCreate} onSubmit = {e=> createHabit(e)}>
                <input type="text" placeholder="nome do hábito" value ={habit} onChange={(e) => setHabit(e.target.value)}required  />
                <WeekDays>
                    {habitDays.map((name, i) => <button type ="button" 
                    key={`${name} - ${i}`}
                    className ={days.includes(i) ? 'selected' : ''} 
                    disabled={loading ? true : false}
                    style={loading ? {cursor: 'auto'} : {cursor: 'pointer'}}
                    onClick={()=> toggleDays(i)}>
                      {name}</button>)}                      
                </WeekDays>
                <Buttons>
                  <CancelButton onClick={toggleCreate}>Cancelar</CancelButton>
                  <SaveButton type="submit">{loading ? loadingAnimation : 'Salvar' }</SaveButton>
                </Buttons>
            </Create>
            <Content>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </Content>
          </>
        );
      } else {
       
    return(
        <>
        <Title>
                <h1>Meus Hábitos {loading}</h1>
                <button onClick={toggleCreate}>+</button>
            </Title>
            <Create show={showCreate} onSubmit = {e=> createHabit(e)}>
                <input type="text" placeholder="nome do hábito" value ={habit} onChange={(e) => setHabit(e.target.value)}required  />
                <WeekDays>
                    {habitDays.map((name, i) => <button type ="button" 
                    key={`${name} - ${i}`}
                    className ={days.includes(i) ? 'selected' : ''} 
                    disabled={loading ? true : false}
                    style={loading ? {cursor: 'auto'} : {cursor: 'pointer'}}
                    onClick={()=> toggleDays(i)}>
                      {name}</button>)}                      
                </WeekDays>
                <Buttons>
                  <CancelButton onClick={toggleCreate}>Cancelar</CancelButton>
                  <SaveButton type="submit">{loading ? loadingAnimation : 'Salvar' }</SaveButton>
                </Buttons>
            </Create>
        <Content>
        {habits.map( ({id, name, days}) => {return(
                <ShowHabits key={id} id={id} name={name} days={days} />
            )})}
        </Content>
        </>
    )
}

function createHabit(e) {
  setLoading(true)
  e.preventDefault()
  const config = {
    headers: {
        "Authorization": `Bearer ${user.token}` //Padrão da API (Bearer Authentication)
    }
}

const body ={
  name: habit,
  days: days
}
  
  const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', body, config)
  promise.then(response => {
      setShowCreate(false)
      setDays([])
      setHabit('')
      setRefreshAxios(!refreshAxios)
  })
  promise.catch(error => {
      console.log(error.response)
      alert(`Error type "${error.response.statusText}"`)
      setLoading(false)
  })
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

const Create = styled.form`
                        width: 340px;
                        height: 180px;
                        background-color: #FFFFFF;
                        padding: 0 18px;
                        margin: 0 18px;
                        box-sizing: border-box;
                        margin-top:20px;
                        padding-top:18px;
                        display: ${props => props.show ? "block;" : "none;" }
                        input{
                            width: 302px;
                            height 45px;
                        }

`
const WeekDays = styled.div`
                          width: 90%;
                          margin: 0 auto;
                          button {
                              width: 30px;
                              height: 30px;
                              margin-right: 4px;
                              font-size: 20px;
                              color: #DBDBDB;
                              transition: all 0.5s;
                              cursor: pointer;
                              border-radius: 5px;
                              border: 1px solid #DBDBDB;
                              background: #FFFFFF;
                              margin-top: 8px;
                          }
                          button.selected {
                              color: #FFFFFF;
                              border: none;
                              background: #CFCFCF;
                          }
`;


const Buttons = styled.div`
                          display: flex;
                          margin-top: 29px;
                          align-items: center;
                          justify-content: right;
                          padding-right: 16px;
`;
const CancelButton=styled.div`
                          font-family: 'Lexend Deca', sans-serif;
                          font-style: normal;
                          font-weight: 400;
                          font-size: 15.976px;
                          color: #52B6FF;
`;
const SaveButton = styled.button`
                          width: 84px;
                          height: 35px;
                          background-color: #52B6FF;
                          border-radius: 4.63636px;
                          font-family: 'Lexend Deca', sans-serif;
                          font-style: normal;
                          font-weight: 400;
                          font-size: 15.976px;
                          color: #FFFFFF;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          margin-left: 23px;
                          border:0;
`;

const Habit = styled.div`
                          position: relative;
                          width: 340px;
                          height: 90px;
                          margin-bottom: 20px;
                          padding: 0 15px;
                          border-radius: 5px;
                          background-color: #FFFFFF;
                          box-sizing:border-box;
                          ion-icon {
                              position: absolute;
                              top: 10px;
                              right: 10px;
                              cursor: pointer;
                          }
                          * {
                              font-size: 20px;
                          }
                          p {
                            padding-top: 14px;
                              max-width: 85%;
                              max-height: 20px;
                              overflow: hidden;
                              
                              margin: 13px 0;
                              color: #666666;
                          }
                          button {
                              width: 30px;
                              height: 30px;
                              margin-right: 4px;
                              font-size: 20px;
                              color: var(--input--placeholder);
                              border-radius: 5px;
                              border: 1px solid var(--input--placeholder);
                              background: #FFFFFF;
                          }
                          button.selected {
                              color: #FFFFFF;
                              border: none;
                              background: #CFCFCF;
                          }
`
export default Habits;