import React, { useState, useEffect } from 'react'
import '../App.css'
import Image from './Image';
import Cell from './Cell';
import { useAppContext } from '../context/appContext';
import { cellHeight, top, left, buildRandomPosition, minCount, maxCount } from '../util/Constants';
import congratsGif from "../assets/images/congrats.gif";

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
let tmr = null;
const Canvas = () => {
    const { matrix, reset, finished, max, setMatrix } = useAppContext();
    const [count, setCount] = useState(0);
    const [startText, setStartText] = useState('Reset');
    const [showCongrats, setShowCongrats] = useState(false);
    useEffect(() => {
        if (finished && tmr === null && max + count > 60) {
            setShowCongrats(true);
            // Start timer
            tmr = setTimeout(() => {
                tmr = null;
                setShowCongrats(false);
            }, 5000);
        } else {
            if (showCongrats) {
                setShowCongrats(false);
            }
            if (tmr) {
                clearInterval(tmr);
                tmr = null;
            }
        }
    }, [finished]);
    useEffect(() => {
        return () => {
            if (tmr) {
                clearInterval(tmr);
            }
        }
    }, []);
    const initBoard = () => {
        if (count > 0) {
            const initMatrix = buildRandomPosition(64 - count)
            setMatrix(initMatrix);
        } else {
            reset();
        }
    }
    const onCountChange = (event) => {
        try {
            let cnt = parseInt(event.target.value);
            setCount(cnt > maxCount ? maxCount : (cnt < minCount ? minCount : cnt));
            
            setStartText(cnt ? 'Start' : 'Reset');
        } catch (e) {
            setCount(undefined);
        }
    }

    return (
        <div className="container">
            <div className="cardStyle">
                <header className="headerStyle">Chess Knight Game</header>
                { max === 0 && <span className="instructionStyle">Start clicking any square. Move as knight in chess and try to fill all squares!!!</span> }
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
                        {matrix.map((row, xIndex) => {
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
                { false && !finished && <input
                    className="inputStyle"
                    placeholder='Try with initially filled squares'
                    type='number'
                    min={minCount}
                    max={maxCount}
                    onChange={onCountChange}
                    value={count}></input> }
                <button className="buttonStyle" onClick={initBoard}>
                    {startText}
                </button>
                { finished && <span className="spanStyle"> It is finished </span> }
                { finished && <span className="scoreStyle"> Your score is {max + count} </span> }
                { showCongrats && <img className="congratsStyle" src={congratsGif} alt="Congrats!"/> }
            </div>
        </div>
    )
}

export default Canvas;
