/**
 * Author: Brent Soles <brentsoles@protonmail.com>
 * MIT License
 */

/**
 * Pipe - ever used | ?
 * Args are an array of functions, with the last being what the result will be.
 * @param {*} array 
 */
function funnl(data) {
  let acc = data;
  return {
    through: function() {
      for(let i = 0; i < arguments.length; i++) {
        let fnOrArr = arguments[i]; 
        if(typeof fnOrArr === 'function') {
          acc = fnOrArr(acc)
        } else if (Array.isArray(fnOrArr) && 
        typeof fnOrArr[0] === 'function') {
          let [fn, ...args] = fnOrArr;
          acc = fn(acc, ...args);
        }
      }
      return acc;
    },
    value: acc
  }
}

module.exports = funnl;