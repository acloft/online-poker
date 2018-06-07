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
      }
    };
    this.dealOrGo = this.dealOrGo.bind(this);
    this.markForDiscard = this.markForDiscard.bind(this);
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
          //save the first five cards to an array and then put them on the bottom of the deck
        }
        return {
          deck: shuffledDeck,
          currentHand: currentHand, 
          buttonMessage: "Go"
        };
      });
    }{
        this.setState({buttonMessage: "Deal"})
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
      this.setState(prevState => {
        let cardsToDiscardByIndex = prevState.cardsToDiscardByIndex;
        if (prevState.cardsToDiscardByIndex[index]) {
          //remove it
          cardsToDiscardByIndex[index] = false
          ;
        } else {
          cardsToDiscardByIndex[index] = true
        }
        return { cardsToDiscardByIndex };
      });
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1> Let's play </h1>
        <div className="row">
          <div className="col" />
          {this.state.currentHand.length > 0 &&
            this.state.currentHand.map((card, index) => {
              return (
                <div
                  key={card.value + card.suite}
                  className="col-sm-2 card"
                  onClick={this.markForDiscard(index)}
                >
                  {card.value} {card.suite}
                  {this.state.cardsToDiscardByIndex[index] ? (
                    <h1> discard!</h1>
                  ) : null}
                </div>
              );
            })}
          <div className="col" />
        </div>
        <button className="btn btn-success" onClick={this.dealOrGo}>
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
