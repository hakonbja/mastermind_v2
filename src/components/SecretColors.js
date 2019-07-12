import React from 'react';

const SecretColors = function(props) {
  if (props.visible) {

    return (
      <div className="secret-colors-rack rack">
        {props.renderColors(props.secretColors)}
      </div>
    )
    
  } else {
    return (
      <div className="secret-colors-rack rack">
        <div className="circle">?</div>
        <div className="circle">?</div>
        <div className="circle">?</div>
        <div className="circle">?</div>
      </div>
    )

  }
}

export default SecretColors;