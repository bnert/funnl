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

# async/await

funnl supports async/await functionality with the addition of funnlAsync() function.

To calculate async values, you can declare async/await in the chain, or inside
a function.

Example of async/await in a chain:

```javascript
funnlAsync([
  async () => {
    await setTimeout(() => {}, 200); // Pause for 200ms to mock network call
    return { users: 5 };
  },
  ({ users }) => console.log(`There are ${users} users online!`)
]); // Output: There are 5 users online!
```

And you can do the same thing inside a function:

```javascript
const sendToFunnl = async (value) => {
  return await funnlAsync([
    async () => {
      await setTimeout(() => {}, 200); // Pause for 200ms to mock network call
      return { users: value };
    },
    ({ users }) => console.log(`There are ${users} users online!`)
  ]);
}

sendToFunnl(200); // There are 200 users online!
```