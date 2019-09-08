import React from 'react';

const CurrentRack = (props) => {
  const circles = props.colors.map((color, i) => {
    return (
      <div
        className={"circle circle-" + i}
        onClick={props.handleColorClick.bind(this, i)}
        onContextMenu={props.handleColorClick.bind(this, i)}
        key={"circle-" + i}>
        <div
          className={"color color-" + i}
          style={{backgroundColor: color}}>
        </div>
      </div>
    )
  });

  const keyPegs = props.renderKeyPegs(props.keyPegs)

  return (
    <div className="current-rack">
      <div className="key-pegs">
        {keyPegs}
      </div>
      <div className="rack">
        {circles}
      </div>
      <div
        className={"confirm btn " + (!props.canConfirm ? "disabled" : "")}
        onClick={props.handleConfirmClick}
      >
        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 8.88764L5.12195 15L12.5 1" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  )
}

const OldRacks = function(props) {
  const history = props.history;
  let oldRacks;
  if (history[0]) {
    oldRacks = history.map((instance, i) => {
      return (
        <div className="old-rack" key={"old-rack-" + i}>
          <div className="key-pegs">
            {props.renderKeyPegs(instance.keyPegs)}
          </div>
          <div className="rack">
            {props.renderColors(instance.colors)}
          </div>
        </div>
      )
    });
  }

  return (
    <div className="old-racks">
      {oldRacks}
    </div>
  )
}

export {CurrentRack, OldRacks};