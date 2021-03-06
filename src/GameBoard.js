import React from "react";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    const intialDeck = this.createDeckOfCards();
    this.state = {
      buttonMessage: "Deal",
      deck: intialDeck,
      currentHand: [],
      cardsToDiscardByIndex: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      showScore: false
    };
    this.dealOrGo = this.dealOrGo.bind(this);
    this.markForDiscard = this.markForDiscard.bind(this);
    this.drawCards = this.drawCards.bind(this);
  }

  dealOrGo() {
    if (this.state.buttonMessage === "Deal") {
      this.setState(prevState => {
        const shuffledDeck = this.shuffleDeck(prevState.deck);
        const currentHand = [];
        for (let i = 0; i < 5; i++) {
          let card = shuffledDeck.shift();
          currentHand.push(card);
          shuffledDeck.push(card);
          //save the first five cards to an array and then "put" them on the bottom of the deck
        }
        return {
          deck: shuffledDeck,
          currentHand: currentHand,
          buttonMessage: "Go",
          finalScore: false
        };
      });
    } else {
      this.setState(prevState => {
        const updatedDeck = prevState.deck;
        const newHand = prevState.currentHand.reduce((all, card, index) => {
          if (prevState.cardsToDiscardByIndex[index]) {
            let newCard = updatedDeck.shift();
            all.push(newCard);
            updatedDeck.push(newCard);
          } else {
            all.push(card);
          }
          return all;
        }, []);
        return {
          deck: updatedDeck,
          currentHand: newHand,
          cardsToDiscardByIndex: {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false
          },
          buttonMessage: "Deal",
          finalScore: true
        };
      });
    }
  }

  shuffleDeck(deck) {
    var currentIndex = deck.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    return deck;
    // starting logic to get a shuffled deck of cards reference link below -
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  }

  markForDiscard(index) {
    return () => {
      if (this.state.buttonMessage === "Go") {
        this.setState(prevState => {
          let cardsToDiscardByIndex = prevState.cardsToDiscardByIndex;
          if (prevState.cardsToDiscardByIndex[index]) {
            //remove it
            cardsToDiscardByIndex[index] = false;
          } else {
            cardsToDiscardByIndex[index] = true;
          }
          return { cardsToDiscardByIndex };
        });
      }
    };
  }

  drawCards(cards) {
    return cards.map((card, index) => {
      return (
        <div
          key={card.value + card.suite}
          className={
            card.suite === "Hearts" || card.suite === "Diamonds"
              ? "col-sm-2 card red"
              : "col-sm-2 card"
          }
          onClick={this.markForDiscard(index)}
        >
          {this.convertCardValue(card)} {card.suite}
          {this.state.cardsToDiscardByIndex[index] ? (
            <label style={{ color: "black" }}> discard!</label>
          ) : null}
        </div>
      );
    });
  }

  convertCardValue(card) {
    if (card.value < 11) {
      return card.value.toString();
    } else if (card.value === 11) {
      return "Joker";
    } else if (card.value === 12) {
      return "Queen";
    } else if (card.value === 13) {
      return "King";
    } else if (card.value === 14) {
      return "Ace";
    }
  }


  scoreHand(hand) {
    if (hand.length === 5) {
      const sortedHand = hand.sort((a, b) => a.value - b.value);
      const handObj = {};
      let score = 0;
      let straight = true;
      for (let i = 0; i < 5; i++) {
        // this checks for pairs
        if (handObj[sortedHand[i].value]) {
          score = 100;
        } else {
          handObj[sortedHand[i].value] = true;
        }
      }
      for (let i = 1; i < 5; i++) {
        // this looks for straights - still need to figure out how to read ace as high and low
        if (sortedHand[i].value - 1 !== sortedHand[i - 1].value) {
          straight = false;
        }
      }
      if (straight) {
        score = 500;
      }
      return score;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron gameBoard">
          <h1 className="text-center"> Let's play poker!</h1>
          <p>
            {" "}
            {this.state.finalScore ? `Final Score` : `Score`}:{" "}
            {this.scoreHand(this.state.currentHand)}
          </p>
          <div className="row">
            <div className="col" />
            {this.state.currentHand.length > 0 &&
              this.drawCards(this.state.currentHand)}
            <div className="col" />
          </div>
          <div className="row text-center">
            <div className="col align-content-bottom" />
          </div>
        </div>
        <button
          className="btn btn-success"
          onClick={this.dealOrGo}
          style={{
            display: "inline-block",
            "verticalAlign": "middle"
          }}
        >
          {this.state.buttonMessage}
        </button>
      </React.Fragment>
    );
  }

  createDeckOfCards() {
    const suites = ["Hearts", "Clubs", "Diamonds", "Spades"];
    let deck = [];
    for (let i = 2; i < 15; i++) {
      for (let j = 0; j < suites.length; j++) {
        deck.push({
          value: i,
          suite: suites[j]
        });
      }
      //11 = Jack
      //12 = Queen
      //13 = King
      //14 = Ace
    }
    return deck;
  }
}

export default GameBoard;
