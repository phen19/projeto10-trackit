
import { useEffect, useState, useContext } from "react"
import { ThreeDots } from  'react-loader-spinner'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';
import axios from 'axios'
import styled from 'styled-components'
import UserContext from "./UserContext"



function Today(){
    const { user, todayHabits, setTodayHabits } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false)
 
    let today = dayjs().locale("pt-br").format('dddd, DD/MM')

    function day() // colocar somente primeira letra do dia maiuscula
{
    return today[0].toUpperCase() + today.slice(1);
}

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}` //Padrão da API (Bearer Authentication)
        }
    }

    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
        let promise = axios.get(URL, config)
        promise.then(response => setTodayHabits(response.data))
        promise.catch(error => console.log(error.response))
    }, [refresh])

    function ShowHabits({habit}) {
        const [loading, setLoading] = useState(false) // Sending request to API
        const {id, name, done, currentSequence, highestSequence} = habit //destruturação

        // Check or uncheck habit in API
        function attChecked() {
            setLoading(true)
            const obj = {
                id : id, 
                name: name, 
                done: done, 
                currentSequence: currentSequence,
                highestSequence: highestSequence}
            if (done) {
                let promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, obj, config)
                promise.then(response => {
                    setRefresh(!refresh)
                    setLoading(true)
                })
                promise.catch(error => console.log(error.response))
            } else {
                let promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, obj, config)
                promise.then(response => {
                    setRefresh(!refresh)
                })
                promise.catch(error => console.log(error.response))
            }
        }

        let icon = <ion-icon name="checkmark-sharp"></ion-icon>
        let loadingAnimation = <ThreeDots color="#FFFFFF" height={69} width={60} />
        return (
            <Habit>
                <h3>{name}</h3>
                <p>Sequência Atual: <span className={done ? 'checked' : ''}>{currentSequence} dias</span></p>
                <p>Seu recorde: <span className={(done &&  currentSequence=== highestSequence) ? 'checked' : ''}>{highestSequence} dias</span></p>
                <button 
                    onClick={attChecked}
                    className={done ? `checked ${loading}` : `${loading}`}
                >
                    {loading ? loadingAnimation : icon}
                </button>
            </Habit>
        )
    }

    let percentage = todayHabits.length > 0 ? todayHabits.filter(h => h.done).length/todayHabits.length * 100 : 0
    return(
        <>
        <Content>
            <h1>{day()}</h1>
            {percentage === 0 ? 
            <h2>Nenhum hábito concluído ainda</h2> : 
            <h2 className="checked">{`${percentage.toFixed(0)}% dos hábitos concluídos`}</h2>}
            {todayHabits.map(habit => <ShowHabits key={habit.id} habit={habit} />)}
        </Content>
        </>
    )
}

export default Today;

const Content = styled.div`
    width: 340px;
    margin-top: 28px;
    padding: 0px 18px;
    h1 {
        font-size: 23px;
        color: #126BA5;
    }
    h2 {
        font-size: 18px;
        color: #BABABA;
        margin: 5px 0 28px;
    }
    h2.checked {
        color: #8FC549;
    }
`
const Habit = styled.div`
    position: relative;
    width: 340px;
    height: 90px;
    margin-bottom: 10px;
    padding: 13px 15px;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    * {
        color: #666666;
    }
    h3 {
        max-width: 70%;
        max-height: 20px;
        overflow: hidden;
        margin-bottom: 10px;
        font-size: 20px;
    }
    p {
        font-size: 13px;
        margin-bottom: 3px;
    }
    span.checked {
        color: #8FC549;
    }
    button {
        position: absolute;
        top: 13px;
        right: 13px;
        
        width: 69px;
        height: 69px;
        cursor: pointer;
        transition: all 0.5s;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        background-color: #EBEBEB;
    }
    ion-icon {
        font-size: 45px;
        color: #FFFFFF;
    }
    button.checked {
        background-color: #8FC549;
    }
    button.loading {
        opacity: 0.7;
    }
`