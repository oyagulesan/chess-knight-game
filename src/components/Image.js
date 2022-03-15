import React from 'react'
import { useAppContext } from '../context/appContext';
import { height, width, knight } from '../util/Constants';

const Image = () => {
    const { position, back } = useAppContext();
    const top = position[1] + 'px';
    const left = position[0] + 'px';
    const knightStyle = {
      width,
      height,
      zIndex: 300
    }
    
    return (
      <div
        style={{
          height,
          width,
          position: "absolute",
          top,
          left,
          zIndex: 250,
          borderWidth: "1px",
          borderColor: "black",
          borderStyle: 'none',
        }}
        onClick={back}
      >
        <img src={knight} alt="knight" style={knightStyle} />
      </div>
    );
}

export default Image;