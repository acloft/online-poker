## Online Poker
Poker simulation hosted through Heroku - https://abbys-online-poker.herokuapp.com/

# To Play: 
Start by pressing deal! You'll see the current score of your cards at the top. If you'd like to discard any of them, click them to mark for remove. Once you've chosen, press Go and your new cards will be dealt and your final score calculated!

# About the build

This is made with the Create React App and deployed to Heroku. 
1. The GameBoard component generates a deck of cards (an array of values and suites). The deck is then saved in state. This same deck is used for all subsequent rounds of the game. I am using 11 - 14 in order to represent the high cards.
2. When the player presses deal, the deck from state is shuffled via the shuffleDeck function. The first five cards in that array are "shifted" off the deck array, copied to a currentHand variable, and pushed back onto the end of the deck array. After the setState executes with the new currentHand, the GameBoard renders the playing cards and scores the hand.
3. Now users can click on those cards to toggle between discard or keep. Pressing Go here replaces the cards marked as discard and recalcuates the hand's score. 
4. At this point a player cannot select cards to discard and can press the Deal button get a new hand and play again.

## Scoring 
First I sort the cards in the hand by value. I set score to 0. I make one pass through sortedHand to find if any pairs exist, if they do I set score to 100. I make a second pass through the array, this time starting at 1 in order to find if a straight exists. If it does I set the score to 500. At the end I return 0. 
TODO: I am working on modifying the logic to count Aces as low and high values in the straight. Currently Aces are only high.

``` 
scoreHand(hand) {
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
        // this looks for straights
        if (sortedHand[i].value - 1 !== sortedHand[i - 1].value) {
          straight = false;
        }
      }
      if (straight) {
        score = 500;
      }
      return score;
  } 
  ```
