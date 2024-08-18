import { html,ArcComponent } from '../../src';
import "./css/styles.css";

class Game extends ArcComponent {
  constructor() {
    super();
    this.mutableState = {
      score: 0,
      isPlaying: false,
      timer: 30,
      intervalId: null,
    };
  }

  startGame() {
    if (this.mutableState.isPlaying) return;

    this.applyChanges({
      score: 0,
      isPlaying: true,
      timer: 30,
    });

    const intervalId = setInterval(() => {
      this.applyChanges((prevState) => {
        if (prevState.timer <= 1) {
          clearInterval(prevState.intervalId);
          return { isPlaying: false, timer: 0, intervalId: null };
        }
        return { timer: prevState.timer - 1 };
      });
    }, 1000);

    this.applyChanges({ intervalId });
  }

  stopGame() {
    if (!this.mutableState.isPlaying) return;

    clearInterval(this.mutableState.intervalId);
    this.applyChanges({
      isPlaying: false,
      intervalId: null,
    });
  }

  handleButtonClick() {
    if (this.mutableState.isPlaying) {
      this.applyChanges((prevState) => ({
        score: prevState.score + 1,
      }));
    }
  }

  render() {
    return html`
      <div class="full-height-container">
      <div class="game">
        <h1>Score: ${this.mutableState.score}</h1>
        <h2>Time Left: ${this.mutableState.timer}s</h2>
        ${!this.mutableState.isPlaying
          ? html`
              <button
                data-action="startGame"
                class="game-button"
              >
                Start Game
              </button>
            `
          : html`
              <button
                data-action="stopGame"
                class="game-button"
                class="stop-button"
              >
                Stop Game
              </button>
            `}
        ${this.mutableState.isPlaying
          ? html`
              <button
                data-action="handleButtonClick"
                class="game-button"
              >
                Click Me!
              </button>
            `
          : html``}
        ${!this.mutableState.isPlaying && this.mutableState.timer === 0
          ? html`
              <h3>Game Over! Your final score is ${this.mutableState.score}</h3>
            `
          : html``}
      </div>
        </div >
    `;
  }
}

Game.registerComponent("Game");
export default Game;
