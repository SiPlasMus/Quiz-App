import React from 'react'
import styled, { css } from 'styled-components/macro'
import Button from './Button';
// import {useState} from 'react';

const Intro = styled.div`
  margin-top: 5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const btnCSS = css`
    margin-top: 2em;
    color:  #007;
`;

    var amount, category, difficulty;
const Start = ({props}) => {
    const startQuiz = () => {
        props(true)
    }

    const minmax = (e) => {
        const num = parseInt(e.target.value);
        for (var i = 0; i < 1; i++) {
            if (num < 1) e.target.value = "1";
            if (num > 10) e.target.value = "10";
        }
    }

    return (
        <Intro>
            <h1>Quiz App</h1>
            <h4>Test yourself!</h4>
            <label>
                <span></span><span></span>
                <input type="number" name="amount" min="1" max="10" placeholder="Num:" id="amt" onInput={e => amount = e.target.value} onChange={minmax} />
                <span></span><span></span>
            </label>
            <article>
            <section>
                <div className={"select"}>
                    <select onInput={e => category = e.target.value}>
                        <option value="any" disabled selected>Choose the category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                    </select>
                    <span className={"focus"}></span>
                </div>
            </section>
            <section>
                <div className={"select"}>
                    <select onInput={e => difficulty = e.target.value}>
                        <option value="any" disabled selected>Choose the difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <span className={"focus"}></span>
                </div>
            </section>
            </article>
            <Button onClick={startQuiz} css={btnCSS}>Start</Button>
        </Intro>
    )
}
export {amount}
export {category}
export {difficulty}
export default Start
