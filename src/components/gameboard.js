import React from "react";

class Gameboard extends React.Component {
  constructor(props) {
    super(props);

    const { size } = props;

    this.state = {
      cells: Array(size * size)
        .fill(null)
        .map((value, index) => {
          return {
            value,
            id: index
          };
        }),
      isClickable: true,
      step: 0,
      winner: null
    };
  }

  addStep = id => {
    const { isClickable } = this.state;

    if (!isClickable) {
      return;
    }
    const cells = [...this.state.cells];

    this.setState(prevState => {
      if (prevState.step % 2 === 0 && !cells[id].value) {
        cells[id].value = "cross";
      } else if (!cells[id].value) {
        cells[id].value = "circle";
      }

      prevState.winner = this.findWinner(cells);
      if (prevState.winner) prevState.isClickable = false;
      prevState.step++;

      return { cells };
    });
  };

  findWinner = arr => {
    const winComb = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winComb.length; i++) {
      const [a, b, c] = winComb[i];

      if (
        arr[a].value &&
        arr[a].value === arr[b].value &&
        arr[b].value === arr[c].value
      ) {
        return arr[a].value;
      }
    }
  };

  resetAll = () => {
    this.setState(prevState => {
      prevState.isClickable = true;
      prevState.step = 0;
      prevState.winner = null;
      prevState.cells.map(cell => (cell.value = null));

      return {
        prevState
      };
    });
  };

  render() {
    const { cells } = this.state;
    const { winner } = this.state;

    return (
      <div className="Game-board">
        {cells.map(cell => (
          <div
            key={cell.id}
            className="Game-board-cell"
            onClick={() => this.addStep(cell.id)}
          >
            <div className={cell.value} />
          </div>
        ))}
        {winner ? <div className="Modal-window">{winner} won!</div> : ""}

        <button className="Button" onClick={this.resetAll}>
          reset
        </button>
      </div>
    );
  }
}

export default Gameboard;