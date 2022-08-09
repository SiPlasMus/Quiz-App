import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import GameOver from './GameOver';
import {amount, category, difficulty} from './Start.js';

const QuizExit = styled.button`
    position: fixed;
    top: 0px;
    right: 10px;
    width: 100px;
    height: 40px;
    border: 1px solid #616A94;
    border-radius: 15px;
    text-decoration: none;
    color: #005;
    background-color: #fff;
    font-size: 1em;
    outline: none;
    user-select: none;
    margin-top: 1em;
    cursor: pointer;  
    transition: all .2s;

    @media screen and (min-width: 800px) {
        &:hover {
            color: white;
            background-color: #616A94;
        }
    }
`;

const QuizRefresh = styled.button`
    position: fixed;
    top: 0px;
    right: 120px;
    width: 100px;
    height: 40px;
    border: 1px solid #616A94;
    border-radius: 15px;
    text-decoration: none;
    color: #005;
    background-color: #fff;
    font-size: 1em;
    outline: none;
    user-select: none;
    margin-top: 1em;
    cursor: pointer;  
    transition: all .2s;

    @media screen and (min-width: 800px) {
        &:hover {
            color: white;
            background-color: #616A94;
        }
    }
`;


const Sequence = styled.div`
    position: fixed;
    bottom: 10px;
    width: 100%;
    height: 80px;
    margin: 1em auto;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 600px) {
    flex-wrap: wrap;
    }
`;


const Numbers = styled.button`
    display: block;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    padding: 5px;
    text-decoration: none;
    color: #e2e2e2;
    background-color: #616A94;
    transition: 0.3s;
    font-family: "Consolas";
    font-size: 1em;
    font-weight: 700;
    outline: none;
    user-select: none;
    margin: .2em;
    cursor: pointer;
    
    @media screen and (max-width: 2000px) {
        &:hover {
            color: black;
            background-color: #616A94;
        }
        &:focus {
         color: #fff;
         width: calc(100% + var(3px) * 2);
         height: calc(100% + var(3px) * 2);
         background: linear-gradient(60deg, #5f86f2, #a65ff2, #f25fd0, #f25f61, #f2cb5f, #abf25f, #5ff281, #5ff2f0);
         background-size: 300% 300%;
         background-position: 0 50%;
         border-radius: calc(2 * var(3px));
         animation: moveGradient 4s alternate infinite;
        }
    }
    @media screen and (max-width: 600px) {
        width: 40px;
        height: 40px;
        font-size: 1.2em;
    }
`;



const QuizWindow = styled.div`
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 12vh;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2em auto;

    @media screen and (min-width: 1180px) {
        width: 50%;
    }

    @media screen and (max-width: 600px) {
        margin-bottom: 0px;
        width: 90%;
        margin: 1em;
    }
`;

const Option = styled.button`
    display: block;
    border: 1px solid #616A94;
    border-radius: 15px;
    padding: 15px 30px;
    text-decoration: none;
    color: #005;
    background-color: #fff;
    transition: 0.3s;
    font-size: 1em;
    outline: none;
    user-select: none;
    margin-top: 1em;
    cursor: pointer;
    
    @media screen and (min-width: 1180px) {
        &:hover {
            color: white;
            background-color: #616A94;
        }
        &:active {
            background-color: #00f;
        }
    }
    @media screen and (max-width: 600px) {
        margin-top: 10px;
        padding: 12px 25px;
    }
`;

const Question = styled.div`
    width: 70%;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
        font-size: 0.9em;
    }
`;

const Quiz = (props) => {

    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [reply, setReply] = useState(0);
    const [pts, setPts] = useState(0);
    const [done, setDone] = useState(false);
    const refreshPage = () => window.location.reload();
    const finish = () => {
        setQuiz([]);
        setDone(true);
    }
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const nextQuestion = () => {
        for (let i = 0; i < quiz.length; i++) {
            if (quiz[i].current === 0) {           
                return i;
            }
        }
        finish();
    }

    const pickAnswer = (e) => {

        let userAnswer = e.target.outerText;
        if (quiz[number].answer === userAnswer) {

        alert("true");
            // quiz[number].answer = undefined;
            // e.target.style.backgroundColor = "#0f0";    
            // e.target.style.color = "#fff";    
        }
        else {
            alert("false! The true answer is: " + quiz[number].answer);
        }
        if (quiz[number].answer === userAnswer && quiz[number].current !== 1) {
            setPts(pts + 1);
        }  
        if (quiz[number].current !== 1) {
            quiz[number].current = 1;
            setReply(reply + 1);
        }
        setNumber(nextQuestion());
    }
    const pickQuestion = (e) => {
        setNumber(parseInt(e.target.outerText) - 1);
        e.target.focus();
    }

    useEffect(() => {    
        console.log(difficulty);
        axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`).then(res => {
                setQuiz(res.data.results.map(item => (

                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: item.correct_answer,
                        current: 0,
                    }

                )));
            })
            .catch(err => console.error(err))
    }, []);


    return (
        <QuizWindow>
            { quiz[number] &&

                <>
                    <QuizRefresh dangerouslySetInnerHTML={{ __html: "Restart" }} onClick={refreshPage} /> 
                    <QuizExit dangerouslySetInnerHTML={{ __html: "Finish" }} onClick={finish} />
                    <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>

                    <Options id="options">
                        {quiz[number].options.map((item, index) => (
                            <Option key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={pickAnswer}></Option>
                        ))}
                    </Options>
                    <Sequence>
                        {quiz.map((item, index) => (
                            <Numbers key={index} dangerouslySetInnerHTML={{ __html: index + 1 }} onClick={pickQuestion} onFocus={pickQuestion} ></Numbers>
                        ))}
                    </Sequence>
                </>

            }
            {
                done === true && <GameOver pts={pts} />
            }
        </QuizWindow>
    )
}

export default Quiz
