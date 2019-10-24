import React from 'react';

import '../index.css';
import Header from './Header';
import SecretColors from './SecretColors';
import StatusBar from './StatusBar';
import { CurrentRack, OldRacks } from './Racks';
import Instructions from './Instructions';
import { getKeyPegs } from './Utils.js'

// TODO: put functions into another file

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: Array(4).fill(null),
      keyPegs: Array(4).fill(null),
      secretColors: Array(4).fill(null),
      areSecretColorsVisible: false,
      history: [],
      turnsLeft: 10,
      isGameOver: false,
      winStatus: {
        win: false,
        lose: false
      },
      canConfirm: true,
      isModalOpen: false,
      isHintArrowShown: true,
    }
    this.colorWheel = ['#000000', '#ffffff', '#F44040', '#80D484', '#40B3F4', '#E3E559'];
    this.turnsLeftColors = ['#F7DAA2', '#F0D193', '#E9C682', '#E2BC72', '#DBB262', '#D4A852', '#CE9F43', '#C69432', '#C08B23', '#B98113'];

    this.refTimer = React.createRef();

    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleInstructionsClick = this.handleInstructionsClick.bind(this);
    this.handleExitModalClick = this.handleExitModalClick.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  componentDidMount() {
    this.chooseSecretColors();
  }

  chooseSecretColors() {
    const colorWheel = this.colorWheel.slice();
    let secretColors = [];
    for (let i = 0; i < 4; i++) {
      let rand = Math.floor(Math.random() * (colorWheel.length - 1))
      secretColors.push(colorWheel[rand]);
      colorWheel.splice(rand, 1);
    }
    this.setState({
      secretColors: secretColors
    })
  }

  startNewGame() {
    this.setState({
      colors: Array(4).fill(null),
      keyPegs: Array(4).fill(null),
      secretColors: Array(4).fill(null),
      areSecretColorsVisible: false,
      history: [],
      turnsLeft: 10,
      isGameOver: false,
      winStatus: {
        win: false,
        lose: false
      },
      canConfirm: true,    
    });
    this.chooseSecretColors();
    this.refTimer.current.restartTimer();
  }

  handleConfirmClick() { // TODO: split this into smaller functions
    if (this.state.isGameOver || !this.state.canConfirm) {return}

    let colors = this.state.colors.slice();
    let secretColors = this.state.secretColors.slice();
    let keyPegs = getKeyPegs(colors, secretColors);
  
    // check if player has won by looking at white keyPegs
    const didWin = ((keyPegs) => {
      for (let i = 0; i < keyPegs.length; i++) {
        if (keyPegs[i] !== "white") {
          return false;
        }
      }
      return true;
    })(keyPegs);

    if (didWin) {
      this.setState( prevState => {
        return {
          turnsLeft: prevState.turnsLeft - 1,
          keyPegs: keyPegs,
          isGameOver: true,
          areSecretColorsVisible: true,
          winStatus: {
            win: true,
            lose: false
          },
        }
      });
      this.refTimer.current.stopTimer();
      return;
    }

    // unshift key-pegs result and the newest colors guess to a newHistory object
    let newHistory = this.state.history.slice();
    newHistory.unshift({
      colors: this.state.colors.slice(),
      keyPegs: keyPegs,
    });
    
    // update currentRack's keyPegs
    this.setState( prevState => {
      return {
        keyPegs: keyPegs,
        turnsLeft: prevState.turnsLeft - 1,
        canConfirm: false,
      }
    });

    // if turns are up blink losing signal and show secretColors and lower turnsLeft
    if (this.state.turnsLeft === 1) {
      this.setState({
        turnsLeft: 0,
        areSecretColorsVisible: true,
        isGameOver: true,
        winStatus: {
          win: false,
          lose: true
        }
      });
      this.refTimer.current.stopTimer();
      return;
    }

    // if there are turns over, wait a bit, then push currentRack's colors to history and lower TurnsLeft
    setTimeout( () => {
      this.setState( prevState => {
        return {
          colors: Array(4).fill(null),
          keyPegs: Array(4).fill(null),
          history: newHistory,
          canConfirm: true,
        };
      });
    }, 500);
  }
  
  handleColorClick(i, e) {
    if (this.state.isGameOver) {return}

    const colorWheel = this.colorWheel.slice();
    const oldColors = this.state.colors.slice();
    const color = oldColors[i];
    const newColors = oldColors.slice();
    
    if (e.button === 0) { // left-click
      if (color === null) {
        newColors[i] = colorWheel[0];
      } else {
        let newIndex = (colorWheel.indexOf(color) + 1 === colorWheel.length) ? 0 : colorWheel.indexOf(color) + 1;
        newColors[i] = colorWheel[newIndex];
      }
    } else if (e.button === 2) { // right-click
      e.preventDefault();
      if (color === null) {
        newColors[i] = colorWheel[colorWheel.length-1];
      } else {
        let newIndex = (colorWheel.indexOf(color) === 0) ? colorWheel.length - 1 : colorWheel.indexOf(color) - 1;
        newColors[i] = colorWheel[newIndex];
      }
    }

    this.setState({
      colors: newColors,
      isHintArrowShown: false,
    });
  }

  handleInstructionsClick() {
    this.setState({
      isModalOpen: true,
    });
  }

  handleExitModalClick() {
    this.setState({
      isModalOpen: false,
    });
  }

  renderColors(colors) {
    const colorArr = colors.map((color, i) => {
      return (
        <div
          className={"circle circle-" + i}
          key={"circle-" + i}>
          <div
            className={"color color-" + i}
            style={{backgroundColor: color}}>
          </div>
        </div>
      )
    });
    return colorArr;
  }

  renderKeyPegs(keyPegs) {
    const keyPegsArr = keyPegs.map((color, i) => {
      return (
        <div className="key-peg" key={"key-peg" + i}>
          <div className="color" style={{backgroundColor: color}}></div>
        </div>
      )
    });
    return keyPegsArr;
  }

  render() {

    return (
      <div id="game">
        <div className="wrapper">
          {this.state.isModalOpen && ( 
            <Instructions
              handleExitModalClick={this.handleExitModalClick}
            />
          )}
          <Header
            startNewGame={this.startNewGame}
            handleInstructionsClick={this.handleInstructionsClick}
          />
          <SecretColors
            secretColors={this.state.secretColors}
            visible={this.state.areSecretColorsVisible}
            renderColors={this.renderColors}
          />
          <StatusBar
            turnsLeft={this.state.turnsLeft}
            colors={this.turnsLeftColors}
            winStatus={this.state.winStatus}
            isGameOver={this.state.isGameOver}
            ref={this.refTimer}
          />
          <div className="racks">
            <CurrentRack
              colors={this.state.colors}
              keyPegs={this.state.keyPegs}
              handleColorClick={this.handleColorClick}
              handleConfirmClick={this.handleConfirmClick}
              canConfirm={this.state.canConfirm}
              renderKeyPegs={this.renderKeyPegs}
              isHintArrowShown={this.state.isHintArrowShown}
            />
            <OldRacks
              history={this.state.history}
              renderColors={this.renderColors}
              renderKeyPegs={this.renderKeyPegs}
            />
          </div>
          <footer>
            <div className="background">
              <p>&copy; Hákon Bjarnason - 2019</p>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default Game;