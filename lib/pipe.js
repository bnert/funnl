/**
 * Pipe - ever used | ?
 * @param {*} destructured array 
 */
function pipe([ head, fn, ...rest ]) {

  // If first computation is an array,
  // and fn is undef, then we know head is
  // a function with args
  if(Array.isArray(head) && !fn) {
    console.log(`~~~ 1 ~~~`);
    const [func, ...args] = head;
    return pipe([ func(...args), ...rest]);
  }

  // If need to compute before piping further
  if(Array.isArray(head) && fn){
    const [func, ...args] = head;
    return pipe([ func(...args), fn, ...rest]);
  }

  // end of computation, return result
  if(!fn) {
    return head;
  }

  // If head is a piece of computation
  // compute it
  if(typeof head === 'function'){
    return pipe([ head(), fn, ...rest]);
  }

  // We know head is not any computation
  // so fn must be a computation
  if(Array.isArray(fn)){
    const [func, ...args] = fn;
    return pipe([ func(head, ...args), ...rest]);
  }

  // return head;
  return pipe([ fn(head), ...rest ]);
}

module.exports = pipe;