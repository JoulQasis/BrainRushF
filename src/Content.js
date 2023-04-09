import contentCss from "./Content.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useState } from 'react';
import './Content.css'
import { useSelector } from "react-redux";

function Content() {
  const [isHover, setIsHover] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  const [isHover3, setIsHover3] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);


  const navigate = useNavigate();
  const navigateToSignUp = () => {
    // navigate to /contacts
    isLoggedIn ?navigate('/mathematics') :navigate("/LogIn")
  };

  function start(className) {
    const hiddenElements = document.querySelectorAll(`.${className}`);
    console.log(hiddenElements);
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });
  
    hiddenElements.forEach((el) => observer.observe(el));
  }
  
  window.onload = function() {
    start('hidden');
    start('hidden2');
  }


  return (
    <main className={contentCss.main}>
      <figure className="position-relative">
        <img
          className={contentCss.img}
          src={require("./imges/1.jpg")}
          alt="Landing page"
        ></img>
        <figcaption id="test" className={contentCss.figcaption}>
          Make your brain sharper <br></br> with this Brain Games!
          <br></br>
          <button className={contentCss.startbutton} onClick={navigateToSignUp}>
            Get Started!
          </button>
        </figcaption>
      </figure>
      <Container className={contentCss.webinfo} fluid>
        <Row className={contentCss.row}>
          <h2 className={contentCss.centerh2}>
            You know you've got to exercise your brain just like your muscles.{" "}
          </h2>
        </Row>
        <Row className={contentCss.row}>
          <Col md={{ span: 3, offset: 3 }}>
            <h4> About this website</h4>
            <Row className={contentCss.row}>
              {" "}
              We dedicated this website to change the view of the world about
              video games, and to help you train and develop your brain on a
              unique way that you dont face in your daily basis.{" "}
            </Row>
          </Col>
          <Col md={{ span: 3, offset: 1 }}>
            <h4> Who is it for?</h4>
            <Row className={contentCss.row}>
              Free Mathmatics games for adults and children, suitable for every
              age group from school kids to adults and even elderly people.
            </Row>
          </Col>
        </Row>
        <Row className={contentCss.row}>
          <Col md={{ span: 3, offset: 3 }}>
            <h4> Train the skills that matter to you most</h4>
            <Row className={contentCss.row}>
              {" "}
              Memory,Quick reflexes,Fast thinking and more. BrainRush offers you
              the best tools to target this skills.
            </Row>
          </Col>
          <Col md={{ span: 3, offset: 1 }}>
            <h4> Scientific studies , made fun</h4>
            <Row className={contentCss.row}>
              BrainRush took the best studies and turned it into a fun
              interactive games.
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className={contentCss.botcontainerh1}>
        <h1 className={contentCss.Games}>Get familiar with our games!</h1>
        <div class="hidden" >

        <h1 className={contentCss.title}>Mathmatics</h1>
        <div className={contentCss.something}>
          <p className={contentCss.GameExplain}>How to Play:- <br></br><br></br> After pressing start the game will generate a random math equation
            for you,<br></br>try and solve correctly as many as you can in little time!<br></br><br></br>
            For every correct answer your score will increase,
            <br></br> and with a higher score you level up to a harder version of the game</p>
          <div
            className={contentCss.Giffs}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            {isHover ? (
              <img
                className={contentCss.Giffs}
                src={require("./imges/Math.gif")}
                alt="gifs"
              />
            ) : (
              <img
                className={contentCss.Giffs}
                src={require("./imges/MathStatic.png")}
                alt="gifs"
              />
            )
            }
          </div>
        </div>
        </div>

        

        <div class="hidden2" >
          <h1 className={contentCss.title}>Memory Match</h1>
          <div className={contentCss.something} >
            <p className={contentCss.GameExplain2}>How to Play:- <br></br><br></br>
              After pressing start the game will create 12 cards,and on the other side of each card there is a picture.<br></br>
              once you press on the the card it will flip and reveal the picture.
              there should be at least two cards with the same picture that you have to match them together.<br></br>
              after you get them all right you get a Next level button, once you press on it the game will give you 4 extra cards
              (2 extra images) and the game start again!match as many pictures as you can as fast as possible!
            </p>
            <div
              className={contentCss.Giffs2}
              onMouseEnter={() => setIsHover2(true)}
              onMouseLeave={() => setIsHover2(false)}
            >
              {isHover2 ? (
                <img
                  className={contentCss.Giffs2}
                  src={require("./imges/MemoryMatch.gif")}
                  alt="gifs"
                />
              ) : (
                <img
                  className={contentCss.Giffs2}
                  src={require("./imges/MatchMemoryStatic.png")}
                  alt="gifs"
                />
              )
              }
            </div>
          </div>
        </div>

        <div class="hidden" >
        <h1 className={contentCss.title}>Quick Reflexes</h1>
        <div className={contentCss.something}>
          <p className={contentCss.GameExplain}>How to Play:- <br></br><br></br>
            After pressing start the game will generate 80 boxes that one of them will lit up,<br></br>
            and you have to notice it quickly and press on it,<br></br>
            every box you get correctly your score will increase,and after you get certain amout of them correctly your level will go up
            <br></br> and the game will be faster </p>
          <div
            className={contentCss.Giffs}
            onMouseEnter={() => setIsHover3(true)}
            onMouseLeave={() => setIsHover3(false)}
          >
            {isHover3 ? (
              <img
                className={contentCss.Giffs}
                src={require("./imges/QuickReflexes.gif")}
                alt="gifs"
              />
            ) : (
              <img
                className={contentCss.Giffs}
                src={require("./imges/QuickReflexStatic.png")}
                alt="gifs"
              />
            )
            }
          </div>
        </div>
        </div>

      </Container>

      <Container className={contentCss.botcontainerh2}>
        <h1>You heard enough! Lets get started.</h1>
      </Container>
      <Container className={contentCss.botcontainerh1}>
        <Button className={contentCss.loginbutton1} onClick={navigateToSignUp}>
          Get Started!
        </Button>
      </Container>

      <p className={contentCss.quote}>
        {" "}
        Some people say video games rot your brain, but i think they work
        different <br></br>
        muscles that maybe you don't normally use. <br></br>
        Ezra Koenig.
      </p>
    </main>
  );
}

export default Content;
