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
  // move the handleClick method from the Board component to the Game component.
  renderSquare(i) {
    return (
      //Board component receive squares and onClick props from the Game component
      <Square
        value={this.props.squares[i]} //
        onClick={() =>
          this.props.onClick(i)
        } /* Since we had single click handler in Board for many Squares, we’ll need to pass the location of each 
        Square into the onClick handler to indicate which Square was clicked. */
      />
    );
  }

  render() {
    /*Since the Game component is now rendering the game’s status, 
    we can remove the corresponding code from the Board’s render method. */

    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  handleClick(i) {
    //call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsnext ? "X" : "0";
    /* xIsNext (a boolean) will be flipped to determine which player goes 
                                                   next and the game’s state will be saved. We’ll update the Board’s 
                                                   handleClick function to flip the value of xIsNext */
    this.setState({
      history: history.concat([
        {
          // we concatenate new history entries onto history
          squares: squares, // unlike push(), concat() method doesn’t mutate the original array
        },
      ]),
      xIsnext: !this.state.xIsnext,
    });
  }
  render() {
    /*We’ll update the Game component’s render function to 
    use the most recent history entry to determine and display the game’s status */
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    /* Using the map method, we can map our history of moves to React elements
     representing buttons on the screen, and display a list of buttons to “jump” to past moves. */
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        // We haven’t implemented the jumpTo() method yet
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner:" + winner;
    } else {
      status = "Next player: " + (this.state.xIsnext ? "X" : "0");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
