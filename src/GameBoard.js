import React from "react";

class GameBoard extends React.Component {
    constructor(props){
        super(props)
        const intialDeck = this.createDeckOfCards()
        this.state ={
            buttonMessage: "Deal",
            deck: intialDeck
        }
        this.dealOrGo = this.dealOrGo.bind(this)
    }

    dealOrGo(){
        if(this.state.buttonMessage === 'Deal'){
            console.log(this.state.deck)
            console.log(this.shuffleDeck(this.state.deck))
        }
    }

    shuffleDeck(deck){
      
            var currentIndex = deck.length, temporaryValue, randomIndex;
          
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
            // starting logic to get a shuffled deck of cards reference link below
            // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
          
    }
    

  render() {
    return (
      <React.Fragment>
        <h1> Let's play </h1>
        <div className="row"> 

        </div>
        <button className="btn btn-success" onClick={this.dealOrGo}>{this.state.buttonMessage}</button>
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


export default GameBoard