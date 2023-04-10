import React from "react";
import MemoryMatchCss from "./MemoryMatch.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function MemoryMatch() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [levels, setLevels] = useState(1);
  const user = useSelector((state) => state.user);
  const [isScore, setIsScore] = useState(false);
  const [currentScore, setCurrentScore] = useState();
  const [prevScore, setPrevScore] = useState(1);


  const baseCards = [
    {
      name: "cat",
      img: require("./img/cat.png"),
    },
    {
      name: "dog",
      img: require("./img/dog.png"),
    },
    {
      name: "frog",
      img: require("./img/frog.png"),
    },
    {
      name: "pizza",
      img: require("./img/pizza.png"),
    },
    {
      name: "hotdog",
      img: require("./img/hotdog.png"),
    },
    {
      name: "fries",
      img: require("./img/fries.png"),
    },
  ];
  
  const additionalCards = [
    {
      name: "panda",
      img: require("./img/panda.png"),
    },
    {
      name: "bee",
      img: require("./img/bee.png"),
    },
    {
      name: "penguin",
      img: require("./img/penguin.png"),
    },
    {
      name: "elephant",
      img: require("./img/elephant.png"),
    },
  ];
  
  let cardArray = [];
  
  switch (levels) {
    case 1:
      cardArray = [...baseCards];
      break;
    case 2:
      cardArray = [...baseCards, ...additionalCards.slice(0, 2)];
      break;
    case 3:
      cardArray = [...baseCards, ...additionalCards.slice(0, 4)];
      break;
    default:
      throw new Error(`Unsupported level: ${levels}`);
  }
  
  cardArray = [...cardArray, ...cardArray];
  

  
  // var cardArray = [
  //   {
  //     name: "cat",
  //     img: require("./img/cat.png"),
  //   },
  //   {
  //     name: "dog",
  //     img: require("./img/dog.png"),
  //   },
  //   {
  //     name: "frog",
  //     img: require("./img/frog.png"),
  //   },
  //   {
  //     name: "pizza",
  //     img: require("./img/pizza.png"),
  //   },
  //   {
  //     name: "hotdog",
  //     img: require("./img/hotdog.png"),
  //   },
  //   {
  //     name: "fries",
  //     img: require("./img/fries.png"),
  //   },
  // ];

  // // creating the pictures array on levels.
  // if (levels === 1) {
  //   cardArray = [...cardArray];
  // } else if (levels === 2) {
  //   cardArray = [
  //     ...cardArray,
  //     {
  //       name: "panda",
  //       img: require("./img/panda.png"),
  //     },
  //     {
  //       name: "bee",
  //       img: require("./img/bee.png"),
  //     },
  //   ];
  // } else {
  //   cardArray = [
  //     ...cardArray,
  //     {
  //       name: "panda",
  //       img: require("./img/panda.png"),
  //     },
  //     {
  //       name: "bee",
  //       img: require("./img/bee.png"),
  //     },
  //     {
  //       name: "penguin",
  //       img: require("./img/penguin.png"),
  //     },
  //     {
  //       name: "elephant",
  //       img: require("./img/elephant.png"),
  //     },
  //   ];
  // }
  // cardArray = [...cardArray, ...cardArray];
  // random sort the array elements
  let cardsChosen = [];
  let cardsChosenIds = [];
  var cardsWon = [];

  // starting the game depending on your level
  function startGame() {

    cardArray.sort(() => 0.5 - Math.random());
    document.getElementById("gameB")
      .innerText = "Start Game?";
    document.getElementById("level")
      .innerHTML = `Level: ${levels}`;
    var gridDisplay = document.getElementById("grid");

    gridDisplay.innerHTML = " ";
    cardsWon = [];
    document.getElementById("time")
      .innerHTML = "00:00:00";
    setTime(0)

    function createBoard(cardArray, imageSize) {
      cardArray.forEach((card, i) => {
        const img = new Image(...imageSize);
        img.src = require('./img/blank.jpg');
        img.dataset.id = i;
        img.addEventListener('click', flipCard);
        gridDisplay.appendChild(img);
      });
    }

    switch (levels) {
      case 1:
        createBoard(cardArray, [200, 225]);
        break;
      case 2:
        createBoard(cardArray, [225, 190]);
        break;
      default:
        createBoard(cardArray, [180, 180]);
    }



    // if (levels === 1) {
    //   function createBoard() {
    //     cardArray.forEach((card, i) => {
    //       const img = new Image(200, 225);
    //       img.src = require('./img/blank.jpg');
    //       img.dataset.id = i;
    //       img.addEventListener('click', flipCard);
    //       gridDisplay.appendChild(img);
    //     });
    //     console.log('hey')
    //   }
    //   createBoard();
    // } else if (levels === 2) {
    //   function createBoard2() {
    //     cardArray.forEach((card, i) => {
    //       const img = new Image(225, 190);
    //       img.src = require('./img/blank.jpg');
    //       img.dataset.id = i;
    //       img.addEventListener('click', flipCard);
    //       gridDisplay.appendChild(img);
    //     });
    //   }
    //   createBoard2();
    // } else {
    //   function createBoard3() {
    //     cardArray.forEach((card, i) => {
    //       const img = new Image(180, 180);
    //       img.src = require('./img/blank.jpg');
    //       img.dataset.id = i;
    //       img.addEventListener('click', flipCard);
    //       gridDisplay.appendChild(img);
    //     });
    //   }
    //   createBoard3();
    // }
  }
  // function for flipping a card on a click button.
  function flipCard() {
    setTimerOn(true);
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 250);
    }
  }
  // checking if the cards are matching
  function checkMatch() {
    const cards = document.querySelectorAll("#grid img");
    // if (cardsChosenIds[0] === cardsChosenIds[1]) {
    //   cards[cardsChosenIds[0]].setAttribute("src", require("./img/blank.jpg"));
    //   cards[cardsChosenIds[1]].setAttribute("src", require("./img/blank.jpg"));
    // } else if (cardsChosen[0] === cardsChosen[1]) {
    //   cards[cardsChosenIds[0]].setAttribute("src", require("./img/white.png"));
    //   cards[cardsChosenIds[1]].setAttribute("src", require("./img/white.png"));
    //   cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
    //   cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
    //   cardsWon.push(cardsChosen);
    // } else {
    //   cards[cardsChosenIds[0]].setAttribute("src", require("./img/blank.jpg"));
    //   cards[cardsChosenIds[1]].setAttribute("src", require("./img/blank.jpg"));
    // }
    // cardsChosen = [];
    // cardsChosenIds = [];

    const resetCards = (ids) => {
      ids.forEach(id => cards[id].setAttribute('src', require('./img/blank.jpg')));
    };

    const revealCards = (ids, image) => {
      ids.forEach(id => {
        cards[id].setAttribute('src', require(`./img/${image}.png`));
        cards[id].removeEventListener('click', flipCard);
      });
    };

    if (cardsChosenIds[0] === cardsChosenIds[1]) {
      resetCards(cardsChosenIds);
    } else if (cardsChosen[0] === cardsChosen[1]) {
      revealCards(cardsChosenIds, 'white');
      cardsWon.push(cardsChosen);
    } else {
      resetCards(cardsChosenIds);
    }

    cardsChosen = [];
    cardsChosenIds = [];


    // if all the cards got matched level goes up and appear next level button
    if (cardsWon.length === cardArray.length / 2) {
      setTimerOn(false);
      if (isScore) {
        console.log("patch");
        patchData(levels);
      } else {
        saveData(levels);
        console.log("save");
      }
      setLevels(levels + 1);
      var gridDisplay = document.getElementById("grid");
      gridDisplay.innerHTML =
        "<--- Next level &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; YOU GOT THEM ALL RIGHT!!  ";
      var gameButton = document.getElementById("gameB");
      gameButton.innerText = " Next Level?";
    }

    // var levelScore = document.getElementById("level");
    // levelScore.innerHTML = `Level : ${levels}`;
  }

  // useEffect to update the level in the DOM
  // useEffect(() => {
  //   var levelScore = document.getElementById("level");
  //   levelScore.innerHTML = `Level : ${levels}`;
  // }, [levels]);

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

  // back end!

  let newSavedTime;

  const getScore = async () => {
    const response = await axios
      .get(`https://brainrushb.onrender.com/api/game/${user._id}/MemoryMatch/${levels}`)
      .catch((err) => console.log(err));
    const data = await response.data;
    if (data) {
      setIsScore(true);
      setCurrentScore(data);
    } else {
      setIsScore(false);
      setCurrentScore(null);
    }
  };

  useEffect(() => {
    getScore();
    // let saveTime = document.getElementById("time").innerHTML;
    // let scoreInt = parseInt(saveTime.replace(/\D/g, ""));
  }, [prevScore]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveData = async (levels) => {
    let saveTime = document.getElementById("time").innerHTML;
    const res = await axios
      .post("https://brainrushb.onrender.com/api/game", {
        userId: user._id,
        username: user.username,
        gamename: "MemoryMatch",
        level: levels,
        timer: saveTime,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    setPrevScore((prevScore) => prevScore + 1);
    return data;
  };

  const patchData = async (levels) => {
    bestRecord(levels);
    const res = await axios
      .patch(`https://brainrushb.onrender.com/api/memorymatch/${currentScore._id}`, {
        level: levels,
        timer: newSavedTime,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    setPrevScore((prevScore) => prevScore + 1);
    return data;
  };


  const bestRecord = (levels) => {
    let saveTime = document.getElementById("time").innerHTML;
    let scoreInt = parseInt(saveTime.replace(/\D/g, ""));
    let bestSavedTime = parseInt(currentScore.timer.replace(/\D/g, ""));
    if (bestSavedTime < scoreInt) {
      console.log("u didnt beat your score!")
      newSavedTime = saveTime;
    } else {
      newSavedTime = saveTime;
    }

  }

  return (
    <main className={MemoryMatchCss.main}>
      {isScore && (
        <p
          className={MemoryMatchCss.p}
        >{`Beat your own record! Your best time in level ${levels} was ${currentScore.timer} time!`}</p>
      )}

      <p className={MemoryMatchCss.score} id="result">
        <span className={MemoryMatchCss.level} id="level">
          Level : {levels}{" "}
        </span>{" "}
        <span id="time" className={MemoryMatchCss.score}>
          {`${("0" + Math.floor((time / 60000) % 60)).slice(-2)} : ${(
            "0" + Math.floor((time / 1000) % 60)
          ).slice(-2)} : ${("0" + ((time / 10) % 100)).slice(-2)}`}
        </span>
      </p>

      <div className={MemoryMatchCss.reloadB}>
        <button
          className={MemoryMatchCss.buttonDesign}
          onClick={() => {
            startGame();
            setTimerOn(true);
          }}
          id="gameB"
        >
          Start Game?
        </button>
      </div>
      <div className={MemoryMatchCss.grid} id="grid">
        <p>
          How to Play:- <br></br>
          <br></br>
          After pressing start the game will 12 card,and underneath each card
          there is a picture.<br></br>
          there should be at least two cards with the same picture that you have
          to match them together.<br></br>
          after you get them all right you get a Next level button, once you
          press on it the game will give you 4 extra cards (2 extra images) and
          the game start again!match as many pictures as you can as fast as
          possible!
        </p>
      </div>
    </main>
  );
}
export default MemoryMatch;
