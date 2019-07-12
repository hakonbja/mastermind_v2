import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
    }

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(
      () => this.tick(),
      1000
    );
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  restartTimer() {
    clearInterval(this.timer);
    this.setState({seconds: 0});
    this.timer = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState( prevState => {
      if (this.props.isGameOver) {
        clearInterval(this.timer);
        return;
      }
      return {
        seconds: prevState.seconds + 1,
      }
    });
  }

  prettifySeconds(seconds) {
    let sec = (seconds % 60).toString();
    let min = Math.floor(seconds / 60).toString();
    let prettyTime = min.padStart(2, '0') + ':' + sec.padStart(2, '0');

    return prettyTime;
  }

  render () {
    return (
      <div className="timer">
        <p>{this.prettifySeconds(this.state.seconds)}</p>
      </div>
    )
  }
}

export default Timer;