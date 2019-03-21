# funnl

The main purpose of this package is to have a utility which can pipe data easily and flexibly.

### WARNING ###

This package is currently under development. 

### To build ###

Clone the repo, then run `npm install` or `yarn init`

### Code examples ###

```javascript
// Import
const { funnl } = require('funnl');

// Two ways:

// 1.
// First is to use callback functions
const res = funnl([
  () => "Hello",
  (hello) => `${hello} World!` 
]);
console.log(res); // "Hello Wprld!"
...

// 2.
// Second, define, and then pass functions
// Notice, when a function has more than one argument,
// we pass an array with the first element being the function.
// The result of the first element in the pipe is then passed
// as the first arg of the next function call, then
// the rest of the args get passed along, so the eventual
// function call looks like:
//   add(2, 8)
// given the example below.
const add(a, b) => a + b;
const res = funnl([
  2,
  [add, 8]
]);
console.log(res) // 10
```