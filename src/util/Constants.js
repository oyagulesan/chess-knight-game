export const cellHeight = 150;
export const top = '120px';
export const left = '40px';
export const selectedColors = ['rgb(0, 0, 150)', 'rgb(100, 100, 200)', '#FFF'];
export const colors = ['rgb(0, 0, 255)', 'rgb(200, 200, 255)', '#FFF'];
export const divCell = 40;
export const height = '40px';
export const width = '30px';
export const knight = require('../assets/images/knight.png');
export const initialPosition = [180, 400];
export const findMax = (a, b) => {
    return a && b ? (a > b ? a : b) : (a || b || 0);
  }
  export const indexOf2dArray = (array2d, itemtofind) => {
    const index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(itemtofind);
                
    // return "false" if the item is not found
    if (index === -1) { return false; }
    
    // Use any row to get the rows' array length
    // Note, this assumes the rows are arrays of the same length
    const numColumns = array2d[0].length;
    
    // row = the index in the 1d array divided by the row length (number of columns)
    const row = parseInt(index / numColumns);
    
    // col = index modulus the number of columns
    const col = index % numColumns;
    
    return [row, col]; 
  }
  export const validate = (x1, y1, x2, y2) => {
    return ((Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 2)
      || (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 1));
  }