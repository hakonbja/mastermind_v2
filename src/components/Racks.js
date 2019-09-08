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
        <div className="hint-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </div>
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