import React, { useContext, useReducer } from 'react'
import reducer from '../reducer/appReducer'
import {
  SELECT_CELL,
  DESELECT_CELL,
  RESET,
  SET_POSITION,
  BACK
} from '../action/actions.js'
import { initialPosition } from '../util/Constants';

const initialState = {
  matrix: Array.from({length: 8}, () => {return Array.from({length: 8}, () => {return false})}),
  position: [...initialPosition],
  finished: false,
  max: 0,
}
const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPosition = (x, y) => {
    dispatch({ type: SET_POSITION, payload: {x, y} });
  }

  const selectCell = (x, y) => {
    dispatch({ type: SELECT_CELL, payload: {x, y} });
  }

  const deselectCell = (x, y) => {
    dispatch({ type: DESELECT_CELL, payload: {x, y} });
  }
  
  const reset = () => {
    dispatch({ type: RESET });
  }

  const back = () => {
    dispatch({ type: BACK });
  }

  const getMatrix = () => {
    return state.matrix;
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        selectCell, deselectCell, reset, getMatrix, setPosition, back
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}
