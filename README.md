# funnl

The main purpose of this package is to have a utility which can pipe data easily and flexibly.

### WARNING ###

This package is currently under development. 

### How to use
```javascript
// Using common.js modules
const funnl = require('funnl')

// or ES6 Modules
// import fully from 'funnl'

const validBalanceOps = ['inc', 'dec']

const balanceData = {
  [1]: 200
}

// Example Object to operate on:
const updateBalancePayload = {
  id: 1,
  op: 'inc',
  amount: 100
}

const checkId = (data) => {
  console.log(data)
  if (data.id !== 1)
    throw new Error('Invalid id')
  return data
}

const applyUpdate = ({ id, op, amount }, data) => {
  if (!validBalanceOps.includes(op))
    throw new Error('Invalid operation specified')

  if (op === 'inc')
    data[id] += amount
  else if (op === 'dec')
    data[id] -= amount

  return { status: 'ok' }
}

// Note: passing an array will signal to funnl that the rest of the args in the array should be applied after
// the first.
// In the example below the `balancePayload` will be passed as the first arg to applyUpdate, and the second
// arg will be `balanceData`
const handleBalanceUpdate = (data, balancePayload) => funnl(balancePayload)(checkId, [applyUpdate, data])

// Will print:
// { '1': 200 }
// { status: 'ok' }
// { '1': 300 }
console.log(balanceData)
console.log(handleBalanceUpdate(balanceData, updateBalancePayload))
console.log(balanceData)
```

## Install
### Using `npm`
```
$ npm install --save funnl
```

### Using `yarn`
```
$ yarn add funnl
```

## Build
### Using `npm`
```
$ git clone https://github.com/brent-soles/funnl
$ cd funnl && npm install
```

### Using `yarn`
```
$ git clone https://github.com/brent-soles/funnl
$ cd funnl && yarn install
```
