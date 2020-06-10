import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
function Square(props) {
  //this.props to props and onClick={() => this.props.onClick()} to a shorter onClick={props.onClick}
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // constructor to the Board and set the Board’s initial state to contain an array of 9 nulls corresponding to the 9 squares:

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsnext: true, //set the first move to be “X” by default.
    };
  }
  handleClick(i) {
    //call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsnext ? "X" : "0";
    /* xIsNext (a boolean) will be flipped to determine which player goes 
                                                 next and the game’s state will be saved. We’ll update the Board’s 
                                                 handleClick function to flip the value of xIsNext */
    this.setState({
      squares: squares,
      xIsnext: !this.state.xIsnext,
    });
  }
  renderSquare(i) {
    //modify the Board’s renderSquare method to read from it
    return (
      <Square
        value={this.state.squares[i]} // pass a prop called value to the Square
        onClick={() =>
          this.handleClick(i)
        } /*Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square.

                                             Instead, we’ll pass down a function from the Board to the Square*/
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = "Winner:" + winner;
    } else {
      status = "Next player: " + (this.state.xIsnext ? "X" : "0");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
