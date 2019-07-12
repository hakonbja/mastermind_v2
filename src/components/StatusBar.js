import React from 'react';
import Timer from './Timer';



const StatusBar = React.forwardRef( (props, ref) => {
  const amount = (10 - props.turnsLeft < 10) ? 10 - props.turnsLeft : 10;
  const turnsBar = Array(amount).fill().map((e, i) => {
      return (
        <div
          className="one-turn"
          key={"turns-" + i}
          style={{backgroundColor: props.colors[i]}}
        />
      )
    });

  let result = '';
  let blink = '';

  if (props.winStatus.win) {
    result = 'You won!';
    blink = 'blink'
  } else if (props.winStatus.lose) {
    result = 'You lost :(';
    blink = 'blink'
  } else {
    result = '---';
  }
  
  return (
    <div className="statusbar">

      <div className="status">
        <div className="turns-left">
          <p>Turns: {props.turnsLeft}</p>
        </div>
        <div className={"result " + blink}>
          <h2>{result}</h2>
        </div>
        <Timer ref={ref}/>
      </div>

      <div className="turns">
        {turnsBar}
      </div>

    </div>
  )
});

export default StatusBar;