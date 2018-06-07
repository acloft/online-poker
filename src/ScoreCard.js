import React from "react";

class ScoreCard extends React.Component {
  constructor(props) {
    super(props);
    const score = this.scoreHand(props.hand);
    this.state = {
      score: score
    };
  }

  scoreHand(hand) {
    const sortedHand = hand.sort((a, b) => a.value - b.value);
    const handObj = {};
    let score = 0;
    let straight = true;
    for (let i = 1; i < 5; i++) {
      if (!handObj[sortedHand[i].value]) {
        handObj[sortedHand[i].value] = sortedHand[i].suite;
      } else {
        if (score < 51) {
          score = 50;
        }
      }
      if (sortedHand[i].value - 1 !== sortedHand[i - 1].value) {
        straight = false;
      }
    }

    if (straight) {
      score = 500;
    }

    return score;
  }

  render() {
    return <React.Fragment>{this.scoreHand(this.props.hand)}</React.Fragment>;
  }
}

export default ScoreCard;