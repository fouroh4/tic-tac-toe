import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

  
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

  class Board extends React.Component {
    // this draws the board

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        

        if (calculateWinner(squares) || squares[i]) {
            return;
        } 
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext});
        console.log("square",i,"set to",squares[i]);
        
}

    renderSquare(i) {
      return <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />
    }
  
    render() {
      
    
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = "Winner: " + winner;
        console.log("Great Googamooga!", winner, "just won the game.");
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
    // game logic
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
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], // along the top
      [3, 4, 5], // along the middle
      [6, 7, 8], // along the bottom
      [0, 3, 6], // left side
      [1, 4, 7], // middle
      [2, 5, 8], // right side
      [0, 4, 8], // top left to bottom right
      [2, 4, 6], // top right to bottom left
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  