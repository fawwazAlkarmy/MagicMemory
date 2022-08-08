import { useEffect, useState } from "react";
import "./App.css";
import Card from "../src/components/Card";
function App() {
  const cardImages = [
    { src: "img/helmet-1.png", matched: false },
    { src: "img/potion-1.png", matched: false },
    { src: "img/ring-1.png", matched: false },
    { src: "img/scroll-1.png", matched: false },
    { src: "img/sword-1.png", matched: false },
    { src: "img/shield-1.png", matched: false },
  ];
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);
  // shuffle cards
  function shuffleCards() {
    const shuffledCards = [...cardImages, ...cardImages] // make 12 cards (6 pairs)
      .sort(() => Math.random() - 0.5) // shuffle cards
      .map((card) => ({ ...card, id: Math.random() })); // add id to each card
    setchoiceOne(null);
    setchoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }
  // handle choice
  function handleChoice(card) {
    choiceOne === null ? setchoiceOne(card) : setchoiceTwo(card);
  }
  // check if cards match
  // we used useEffect to check if cards match because we can't compare states directly after they are set
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetChoices();
      } else {
        setTimeout(() => {
          resetChoices();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices
  function resetChoices() {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setdisabled(false);
  }
  // start new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
