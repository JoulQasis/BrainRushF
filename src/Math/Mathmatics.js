import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import mathCss from "./Math.module.css";
axios.defaults.withCredentials = true;

function Mathmatics() {
  const [answer, setAnswer] = useState();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [stop, setStop] = useState(false);
  const inputRef = useRef(null);
  let level = 1;

  const autoFocus = () => {
    inputRef.current.focus();
  };

  function generateProblem() {


    setStop(false);
    let theProblem = document.getElementById("theProb");

    let { num1, num2 } = getNumbersForLevel(level);

    let operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === "-" && num2 > num1) {
      [num1, num2] = [num2, num1]; // use array destructuring to swap the values
    }

    setAnswer(calculateAnswer(num1, num2, operator));

    const problem = `${num1} ${operator} ${num2} =`;
    theProblem.innerHTML = `${problem}`;


  }

  function getNumbersForLevel(level) {
    let maxNumber = level * 10;
    let num1 = Math.floor(Math.random() * maxNumber);
    let num2 = Math.floor(Math.random() * maxNumber);
    return { num1, num2 };
  }

  function calculateAnswer(num1, num2, operator) {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      default:
        return "Error: Unsupported operator";
    }
  }


  // Add a click event listener to the button


  // on start you will be able to press enter for the submit button.
  function onStart() {
    autoFocus();
    setTimerOn(true);
    level = 1;
    let onClickSubmit = document.getElementById("theAnswer");
    onClickSubmit.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("submit-btn").click();
      }
    });
    document.getElementById("descriptionLeft").innerHTML = " ";
    document.getElementById("descriptionRight").innerHTML = " ";

    const container = document.getElementById("btn-container");

    // Create a new button element
    const button = document.createElement("button");
    button.innerHTML = "Restart?";
    button.className = (mathCss.buttonDesign);
    button.addEventListener("click", () => {
      window.location.reload()
    });

    // Add the button element to the container
    container.appendChild(button);
  }

  // Check the player's answer
  function checkAnswer() {
    let Result = document.getElementById("result");
    let userAnswer = eval(document.getElementById("theAnswer").value);
    let chechUserAnswer = document.getElementById("theAnswer").value;
    let reset = document.getElementById("theAnswer");
    // if the user presses submit button before starting the game it gives a warning
    if (chechUserAnswer.length === 0) {
      Result.innerHTML = `PLEASE START THE GAME FIRST!`;
      return;
    }
    if (userAnswer === answer) {
      setScore(score + 1);
      console.log(score);

      console.log(`Correct! Your score is now ${score + 1}`);
    } else {
      setScore(score - 1);
      console.log(score);

      console.log(`Incorrect. The correct answer was ${answer}`);
    }
    reset.value = "";
    if (score < 5) {
      level = 1;
      generateProblem();
    } else if (score >= 5 && score < 10) {
      level = 2;
      generateProblem();
    } else {
      level = 3;
      generateProblem();
    }


  }

  const LEVELS = [
    { level: 1, minScore: -Infinity, maxScore: 5 },
    { level: 2, minScore: 6, maxScore: 10 },
    { level: 3, minScore: 11, maxScore: Infinity },
  ];

  function updateResult(score) {
    const { level } = LEVELS.find(
      ({ minScore, maxScore }) => score >= minScore && score <= maxScore
    );
    const result = document.getElementById("result");
    result.innerHTML = `Level : ${level} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : ${score} `;
  }
  useEffect(() => {
    updateResult(score);
  }, [score]);

  // to update the score immediately from the useState.
  // useEffect(() => {
  //   let Result = document.getElementById("result")
  //   if (score < 5) {
  //     Result.innerHTML = `Level : 1 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : ${score} `;
  //   } else if (score >= 5 && score < 10) {
  //     Result.innerHTML = `Level : 2 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : ${score} `;
  //   } else {
  //     Result.innerHTML = `Level : 3 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : ${score} `;
  //   }
  // }, [score]);

  // timer update on ever 100th of a second
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  let bestScore;
  let bestTime;
  // back end!
  const user = useSelector((state) => state.user);
  const [isScore, setIsScore] = useState(false);
  const [currentScore, setCurrentScore] = useState();
  const [prevScore, setPrevScore] = useState(1);

  const getScore = async () => {
    const response = await axios
      .get(`https://brainrushb.onrender.com/api/game/${user._id}/Mathematics`)
      .catch((err) => console.log(err));
    const data = await response.data;
    if (data) {
      setIsScore(true);
      setCurrentScore(data);
    }
  };

  useEffect(() => {
    getScore();
  }, [prevScore]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveData = async () => {
    let saveTime = document.getElementById("time1").innerHTML;
    const res = await axios
      .post("https://brainrushb.onrender.com/api/game", {
        userId: user._id,
        username: user.username,
        gamename: "Mathematics",
        score: score,
        timer: saveTime,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    setPrevScore((prevScore) => prevScore + 1);
    return data;
  };

  const patchData = async () => {
    console.log(bestScore);
    const res = await axios
      .patch(`https://brainrushb.onrender.com/api/oldgame/${currentScore._id}`, {
        score: bestScore,
        timer: bestTime,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    setPrevScore((prevScore) => prevScore + 1);
    return data;
  };

  const bestRecord = () => {
    let saveTime = document.getElementById("time1").innerHTML;
    console.log(saveTime);
    if (currentScore) {
      if (parseInt(currentScore.score, 10) > parseInt(score)) {
        bestScore = currentScore.score;
      } else {
        bestScore = score;
        bestTime = saveTime;
      }
    } else {
      bestScore = score;
      bestTime = saveTime;
    }
    let array = JSON.parse(localStorage.getItem("mathematics")) || [];
    if (array.length >= 15) {
      array.shift(); // remove the first element
    }
    array.push(score);
    localStorage.setItem("mathematics", JSON.stringify(array));
  };

  function handleStopButton() {
    bestRecord();
    if (isScore) {
      patchData();
    } else {
      saveData();
    }
    setTimerOn(false);
    setStop(true);
  }

  return (
    <main className={mathCss.main}>
      {isScore && (
        <p
          className={mathCss.p}
        >{`Beat your own record! Your best score was ${currentScore.score} questions in ${currentScore.timer} time!`}</p>
      )}
      <div id="g" className={mathCss.timer}>
        <span id="time1">
          {`${("0" + Math.floor((time / 60000) % 60)).slice(-2)} : ${(
            "0" + Math.floor((time / 1000) % 60)
          ).slice(-2)} : ${("0" + ((time / 10) % 100)).slice(-2)}`}
        </span>
        <button
          className={`${mathCss.stopper} ${mathCss.buttonDesign}`}
          disabled={stop === true ? true : false}
          onClick={() => {
            handleStopButton();
          }}
        >
          stop{" "}
        </button>
      </div>
      <p className={mathCss.p}>Press the stop button to save your data!</p>
      <p className={mathCss.p} id="result">
        Level : 1 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : 0
      </p>
      <div className={mathCss.container}>
        <div className={mathCss.container1}>
          <p className={mathCss.p1} id="theProb">
            x ? y =
          </p>
          <input
            ref={inputRef}
            className={mathCss.inputG}
            type="text"
            placeholder="?"
            id="theAnswer"
            size="10"
          ></input>
        </div>
        <div id="btn-container" className={mathCss.startbtn}>
          <button
            className={mathCss.buttonDesign}
            id="start-btn"
            onClick={(e) => {
              e.target.remove();
              onStart();
              generateProblem();
            }}
          >
            Start
          </button>
        </div>
        <button
          className={`${mathCss.submitbtn} ${mathCss.buttonDesign}`}
          id="submit-btn"
          onClick={() => {
            checkAnswer();
          }}
        >
          Submit
        </button>
      </div>
      <p id="descriptionLeft" className={mathCss.descriptionLeft}>
        <span className={mathCss.innerDescription}>How to Play:- </span>
        <br></br>
        <br></br> After pressing start the game will generate a random math
        equation for you,<br></br>try and solve correctly as many as you can in
        little time!<br></br>

        For every correct answer your score will increase,
        <br></br> and with a higher score you level up to a harder version of
        the game<br></br>
      </p>
      <p id="descriptionRight" className={mathCss.descriptionRight}>
        {" "}
        <span className={mathCss.innerDescription}>
          Levels and score explained:-
        </span>{" "}
        <br></br>
        <br></br> Every time you get a correct answer your score will increase
        by 1<br></br>
        and if inccorect then decrease by 1. up until you get score of 5 you
        will be in level 1,<br></br> score between 5 and 10 you will be level 2
        and after scoring 10 you will get to level 3.<br></br>
        <br></br>all the levels have the three operations of [+,-,*]<br></br>
        But level 1 only consist of numbers from 1 - 10,Level 2 consist numbers
        from 1-20<br></br>
        and level 3 consist of the numbers from 1-30.{" "}
      </p>
    </main>
  );
}

export default Mathmatics;
