/**
 * Author: Brent Soles <brentsoles@protonmail.com>
 * MIT License
 */

/**
 * Pipe - ever used | ?
 * Args are an array of functions, with the last being what the result will be.
 * @param {*} array 
 */
async function funnlAsync([ head, fn, ...rest ]) {

  // If first computation is an array,
  // and fn is undef, then we know head is
  // a function with args
  if(Array.isArray(head) && !fn) {
    const [func, ...args] = head;
    return funnlAsync([ await func(...args), ...rest]);
  }

  // If need to compute before piping further
  if(Array.isArray(head) && fn){
    const [func, ...args] = head;
    return funnlAsync([ await func(...args), fn, ...rest]);
  }

  // end of computation, return result
  if(!fn) {
    return head;
  }

  // If head is a piece of computation
  // compute it
  if(typeof head === 'function'){
    return funnlAsync([ await head(), fn, ...rest]);
  }

  // We know head is not any computation
  // so fn must be a computation
  if(Array.isArray(fn)){
    const [func, ...args] = fn;
    return funnlAsync([ await func(head, ...args), ...rest]);
  }

  // return head;
  return funnlAsync([ await fn(head), ...rest ]);
}

module.exports = funnlAsync;