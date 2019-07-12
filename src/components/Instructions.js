import React from 'react';

const Instructions = (props) => {
  return (
    <div className="modal">
      <div className="background">
        <span
          className="exit"
          onClick={props.handleExitModalClick}
        >&#10799;</span>
        <h2 className="heading underline">Instructions</h2>
        <div className="instruction-text">
          <p>Try to guess the color combination at the top.</p>
          <p>Click on the grey big circles (right and left click) to select the colors you want to guess.</p>
          <p>Press the check mark button to confirm your guess.</p>
          <p>You'll get clues about how close you are through the small white and black circles on the left.</p>
          <p>A white circle means that you guessed one of the colors right (doesn't say which color though).</p>
          <p>A black circle means that you guessed a correct color but it is in the wrong place.</p>
        </div>

      </div>
    </div>
  )
}

export default Instructions;