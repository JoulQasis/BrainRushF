import React from "react";
import QuickReflexesCss from "./QuickReflexes.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function QuickReflexes() {

  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  const [score, setScore] = useState()
  let cardsChosenIds = [];
  let cardsWon = [];
  var cardsChosenIdsN;
  var cardsChosenIdsToN;
  let shuffled;
  var scores = [];
  let Level = 1;
  var results;

  // after the start button the game will be created 
  function creatingGame() {
    results = document.getElementById("result");
    Level = 1;
    scores = []
    results.innerHTML = `Level : ${Level} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : ${scores.length}`;
    setTime(0);

    const gridDisplay = document.getElementById("grid");
    gridDisplay.innerHTML = " "
    // to create the grid
    function createBoard() {
      for (let i = 0; i < 80; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", require("./img/blank.jpg"));
        card.setAttribute("id", i);
        card.setAttribute("width", 70);
        card.setAttribute("height", 70);
        card.addEventListener("click", flipCard);
        gridDisplay.appendChild(card);
      }
    }
    createBoard();
  }

  function startGame(Level) {
    var gameSpeed = 500;
    let array = Array.from({ length: 80 }, () =>
      Math.floor(Math.random() * 80)
    );
    shuffled = [...array].sort(() => 0.5 - Math.random()).slice(0, 1);
    const cards = document.getElementById(shuffled);
    cardsWon = shuffled.slice(0, 1);
    if (Level === 1) {
      gameSpeed = 500;
    } else if (Level === 2) {
      gameSpeed = 150;
    } else {
      gameSpeed = 50;
    }

    for (let i = 0; i <= shuffled.length; i++) {
      cards.setAttribute("src", require("./img/pick.jpg"));
      setTimeout(function () {
        for (let i = 0; i <= shuffled.length; i++) {
          cards.setAttribute("src", require("./img/blank.jpg"));
        }
      }, gameSpeed);
      shuffled.pop()
    }
  }

  // after choosing which box is correct saves the id,updates the level and goes to checkMatch()
  function flipCard() {
    const cardId = this.getAttribute("id");
    cardsChosenIds.push(cardId);
    cardsChosenIdsN = cardsChosenIds.map(parseInt)
    cardsChosenIdsToN = Number(cardsChosenIdsN.join(''))
    if (scores.length < 5) {
      Level = 1;
    } else if (scores.length >= 5 && scores.length < 10) {
      Level = 2;
    } else {
      Level = 3;
    }
    setTimeout(checkMatch, 250);

  }

  // to check if the box you clicked is correct
  function checkMatch() {
    results = document.getElementById("result")
    if (cardsWon[0] === cardsChosenIdsToN) {
      scores.push(1);
      setScore(scores.length)

      cardsChosenIds.pop();
      results.innerHTML = `Level : ${Level} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : ${scores.length}`;
      setTimeout(startGame(Level), 250);
    } else {
      scores.pop()
      setScore(scores.length)

      results.innerHTML = `Level : ${Level} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : ${scores.length}`;
      cardsChosenIds.pop();
      setTimeout(startGame(Level), 250);
    }
  }

  function updateResult(score) {
    console.log(score)
  }
  useEffect(() => {
    updateResult(score);
  }, [score]);

  // timer update on ever 100th of a second
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)

  }, [timerOn])



  // back end!
  let bestScore;
  let bestTime;

  const user = useSelector((state) => state.user);
  const [isScore, setIsScore] = useState(false);
  const [currentScore, setCurrentScore] = useState();
  const [prevScore, setPrevScore] = useState(1)

  const getScore = async () => {
    const response = await axios.get(`http://localhost:5000/api/game/${user._id}/QuickReflexes`).catch(err => console.log(err));
    const data = await response.data;
    if (data) { setIsScore(true); setCurrentScore(data) }

  };

  useEffect(() => {
    getScore();
    let saveTime = document.getElementById("time1").innerHTML;
    // /\\D/g is a regular expression that matches any non-digit character. 
    let scoreInt = parseInt(saveTime.replace(/\D/g, ""));

  }, [prevScore, score]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveData = async () => {
    let saveTime = document.getElementById("time1").innerHTML;
    const res = await axios.post('http://localhost:5000/api/game', {
      userId: user._id,
      username: user.username,
      gamename: "QuickReflexes",
      score: score,
      timer: saveTime
    }).catch(err => console.log(err));
    const data = await res.data;
    setPrevScore((prevScore) => prevScore + 1);
    return data;
  }


  const patchData = async () => {
    let saveTime = document.getElementById("time1").innerHTML;
    const res = await axios.patch(`http://localhost:5000/api/oldgame/${currentScore._id}`, {
      score: score,
      timer: saveTime
    }).catch(err => console.log(err));
    const data = await res.data;
    setPrevScore((prevScore) => prevScore + 1);
    return data;

  };

  const bestRecord = () => {
    let saveTime = document.getElementById("time1").innerHTML;
    console.log(saveTime)
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
    let array = JSON.parse(localStorage.getItem("quickreflexes")) || [];
    if (array.length >= 15) {
      array.shift(); // remove the first element
    }
    array.push(score);
    localStorage.setItem("quickreflexes", JSON.stringify(array));
  }

  function handleStopButton() {
    bestRecord()
    if (isScore) {
      patchData();
    } else {
      saveData();
    }
    setTimerOn(false);
  }

  return (
    <main className={QuickReflexesCss.main}>
      {isScore && <p className={QuickReflexesCss.p}>{`Beat your own record! Your best score was ${currentScore.score} questions in ${currentScore.timer} time!`}</p>}
      <div className={QuickReflexesCss.timer}>
        <span id="time1" >
          {`${("0" + Math.floor((time / 60000) % 60)).slice(-2)} : ${("0" + Math.floor((time / 1000) % 60)).slice(-2)} : ${("0" + ((time / 10) % 100)).slice(-2)}`}
        </span>
        <button className={`${QuickReflexesCss.stopper} ${QuickReflexesCss.buttonDesign}`} onClick={() => { handleStopButton() }}>stop </button>
      </div>
      <p className={QuickReflexesCss.p}>Press the stop button to save your data!</p>
      <p className={QuickReflexesCss.p} id="result">
        Level : {Level} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Score : 0
      </p>
      <div className={QuickReflexesCss.reloadB} id="startB">
        <button className={QuickReflexesCss.buttonDesign} id="startbtn"
          onClick={() => { creatingGame(); startGame(Level); setTimerOn(true); }}
        >
          Start
        </button>
      </div>

      <div className={QuickReflexesCss.grid} id="grid"><h6 >How to Play:- <br></br><br></br>
        After pressing start the game will generate 80 boxes that one of them will lit up,<br></br>
        and you have to notice it quickly and press on it,<br></br>
        every box you get correctly your score will increase,and after you get certain amout of them correctly your level will go up
        <br></br> and the game will be faster </h6>
      </div>
    </main>


  );

}

export default QuickReflexes;
