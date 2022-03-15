import { useRef, useEffect, useState } from 'react'
import { selectedColors, colors, divCell, findMax, validate, indexOf2dArray } from '../util/Constants';
import { useAppContext } from '../context/appContext';

const Cell = (props) => {
    const { selectCell, deselectCell, matrix, max } = useAppContext();
    const [ isHover, setIsHover ] = useState(false);
    const canvasRef = useRef(null);
    const {xIndex, yIndex, width, height, isSelected} = props;
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let valid = true;
        if (max > 0) {
            const [x, y] = indexOf2dArray(matrix, max);
            valid = validate(x, y, xIndex, yIndex);
        }
        if (isSelected || (isHover && valid)) {
            context.fillStyle = (xIndex + yIndex) % 2 === 0 ? selectedColors[0] : selectedColors[1];
        } else {
            context.fillStyle = (xIndex + yIndex) % 2 === 0 ? colors[0] : colors[1];
        }
        context.fillRect(0, 0, width, height);
        
        if (isSelected && matrix[xIndex][yIndex] !== max) {
            context.fillStyle = selectedColors[2];
            context.font = '100px serif';
            context.textAlign = 'center';
            context.fillText('' + matrix[xIndex][yIndex], 120, 100);
        }
    }, [isHover, isSelected, max]);
    const divStyle = {
        position: 'absolute',
        top: yIndex * divCell + 'px',
        left: xIndex * divCell + 'px',
        backgroundColor: 'red',
        height: divCell + 'px',
        width: divCell + 'px',
        borderWidth: '1px',
    };
    const canvasStyle = {
        height: divCell + 'px',
        width: divCell + 'px',
    }
    const onCellClick = (event) => {
        if (isSelected) {
            deselectCell(xIndex, yIndex);
        } else {
            selectCell(xIndex, yIndex);
        }
    }
    const onMouseLeave = (event) => {
        setIsHover(false);
    }
    const onMouseOver = (event) => {
        setIsHover(true);
    }
    return <div style={divStyle} 
        onClick={onCellClick} 
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        >
        <canvas ref={canvasRef} style={canvasStyle}/>
    </div>

}

export default Cell;