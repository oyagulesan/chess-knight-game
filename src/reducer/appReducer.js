import {
  SELECT_CELL,
  DESELECT_CELL,
  RESET,
  SET_POSITION,
  BACK,
  SET_MATRIX
} from '../action/actions'
import { validate, indexOf2dArray, divCell, initialPosition } from '../util/Constants';

const offset = 45;
const yOffset = -30;

const appReducer = (state, action) => {
  if (action.type === SELECT_CELL) {
    const matrix = state.matrix;
    // Find max
    const position = state.position;
    let max = state.max;
    if (state.max > 0) {
      const [x1, y1] = indexOf2dArray(matrix, state.max);
      if (validate(x1, y1, action.payload.x, action.payload.y)) {
        // Increment counter
        matrix[action.payload.x][action.payload.y] = state.max + 1;
        position[0] = action.payload.x * divCell + offset;
        position[1] = action.payload.y * divCell + yOffset;
        max++;
      }
    } else {
      // Increment counter
      matrix[action.payload.x][action.payload.y] = state.max + 1;
      position[0] = action.payload.x * divCell + offset;
      position[1] = action.payload.y * divCell + yOffset;
      max++;
    }

    const finished = matrix.findIndex((row, x) => {
      if (row.findIndex((col, y) => {
        return col === false && validate(x, y, action.payload.x, action.payload.y);
      }) > -1) {
        return true;
      }
      return false;
    }) === -1;
    return { ...state, matrix, finished, position, max};
  }
  if (action.type === SET_MATRIX) {
    return {...state, matrix: action.payload.map((row) => row.map((cell) => cell === 1 ? true : false)),
      finished: false, position: [...initialPosition], max: 0};
  }
  if (action.type === DESELECT_CELL) {
    const matrix = state.matrix;
    // Find max
    let max = state.max;
    let position = state.position;
    if (max === matrix[action.payload.x][action.payload.y]) {
      matrix[action.payload.x][action.payload.y] = false;
      max--;
      if (max > 0) {
        const [x1, y1] = indexOf2dArray(matrix, max);
        position[0] = x1 * divCell + offset;
        position[1] = y1 * divCell + yOffset;
      } else {
        position = [...initialPosition];
      }
    }
    return { ...state, matrix, finished: false, position, max};
  }
  if (action.type === BACK) {
    if (state.max > 0) {
      const matrix = state.matrix;
      let max = state.max;
      let [x1, y1] = indexOf2dArray(matrix, max);
      matrix[x1][y1] = false;
      max--;
      const position = [...initialPosition];
      let finished = false;
      if (max > 0) {
        [x1, y1] = indexOf2dArray(matrix, max);
        position[0] = x1 * divCell + offset;
        position[1] = y1 * divCell + yOffset;
      } else {
        finished = false;
      }
      return { ...state, matrix, max, position, finished};
    } else {
      return { ...state };
    }
  }
  if (action.type === RESET) {
    const matrix = state.matrix.map((row, x) => row.map((isSelected, y) => false));
    return { ...state, matrix, finished: false, position: [...initialPosition], max: 0};
  }
  if (action.type === SET_POSITION) {
    return { ...state, position: [action.payload.x, action.payload.y]};
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default appReducer
