import React from 'react'
import '../App.css'
import Image from './Image';
import Cell from './Cell';
import { useAppContext } from '../context/appContext';
import { cellHeight, top, left } from '../util/Constants';

const style = {
    position: 'absolute',
    top,
    left,
    backgroundColor: 'blue',
    height: (cellHeight * 2 + 20) + 'px',
    width: (cellHeight * 2 + 20) + 'px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    display: 'flex',
}

const Canvas = () => {
    const { getMatrix, reset, finished, max } = useAppContext();

    return (
        <div className="container">
            <div className="cardStyle">
                <header className="headerStyle">Chess Knight Game</header>
                { max === 0 && <span className="instructionStyle">Move as horse in chess and try to fill all!!!</span> }
                { max > 0 && !finished && <span className="luckStyle">Good luck!</span> }
                <div style={{
                    position: 'absolute',
                    top: '150px',
                    left: '0px'
                }}>
                    <Image />
                </div>
                <div style={style}>
                    <div style={{
                        flex: 1,
                        zIndex: 100,
                        position: 'absolute'
                    }}>
                        {getMatrix().map((row, xIndex) => {
                            return row.map((isSelected, yIndex) => {
                                return <Cell
                                    key={xIndex + '-' + yIndex}
                                    xIndex={xIndex}
                                    yIndex={yIndex}
                                    isSelected={isSelected}
                                    width={cellHeight * 2}
                                    height={cellHeight}
                                />
                            })
                        })}
                    </div>
                </div>
                <button className="buttonStyle" onClick={reset}>
                Reset
                </button>
                { finished && <span className="spanStyle"> It is finished </span> }
                { finished && <span className="scoreStyle"> Your score is {max} </span> }
            </div>
        </div>
    )
}

export default Canvas;
