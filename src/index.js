import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
class Square extends React.Component {
  // Delete the constructor from Square because Square no longer keeps track of the game’s state
  render() {
    return (
      //we’ll have Square  function when a square is clicked.
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // constructor to the Board and set the Board’s initial state to contain an array of 9 nulls corresponding to the 9 squares:

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
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
    const status = "Next player: X";

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
