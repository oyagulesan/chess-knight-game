import React, { useState, useEffect } from 'react'
import '../App.css'
import Image from './Image';
import Cell from './Cell';
import { useAppContext } from '../context/appContext';
import { cellHeight, top, left, buildRandomPosition } from '../util/Constants';

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
    const { matrix, reset, finished, max, setMatrix } = useAppContext();
    const [count, setCount] = useState(undefined);
    const [startText, setStartText] = useState('Reset');
    useEffect(() => {
        console.log('..use effect matrix', matrix)
    }, [matrix]);
    const initBoard = () => {
        if (count) {
            const initMatrix = buildRandomPosition(64 - count - 1)
            console.log('....count', initMatrix);
            setMatrix(initMatrix);
        } else {
            reset();
        }
    }
    const onCountChange = (event) => {
        try {
            let cnt = parseInt(event.target.value);
            setCount(cnt > 63 ? 63 : (cnt < 50 ? 50 : cnt));
            
            setStartText(cnt ? 'Start' : 'Reset');
        } catch (e) {
            setCount(undefined);
        }
    }

    console.log('..render canvas');

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
                { !finished && <input
                    className="inputStyle"
                    placeholder='Try with initially filled squares'
                    type='number'
                    min='50' max='63' 
                    onChange={onCountChange}
                    value={count}></input> }
                <button className="buttonStyle" onClick={initBoard}>
                    {startText}
                </button>
                { finished && <span className="spanStyle"> It is finished </span> }
                { finished && <span className="scoreStyle"> Your score is {max} </span> }
            </div>
        </div>
    )
}

export default Canvas;
