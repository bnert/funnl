const funnl = require('../funnl');

describe('~~~ funnl() function: No Args ~~~', () => {
  
  test('no args passed', () => {
    function pipeWrap() {
      funnl();
    }
    expect(pipeWrap).toThrow(TypeError);
  });

  test('empty array passed', () => {
    expect(funnl([])).toEqual(undefined);
  })
});

describe('~~~ funnl() function: Single args ~~~', () => {
  test('single arg: Number', () => {
    const num = funnl([
      2
    ]);
    expect(num).toBe(2);
  });

  test('single arg: String', () => {
    const s = "it's wooooorking!!! - Anakin";
    const str = funnl([
      s
    ])
    expect(str).toBe(s);
  })

  test('single arg: Object', () => {
    const o = {
      message: 'hi'
    };
    const obj = funnl([
      o
    ]);
    expect(obj).toStrictEqual(o);
  })
});

describe('~~~ funnl() function: Multi args ~~~', () => {
  test('piping to arrow functions', () => {
    const result = 200;
    const res = funnl([
      1,
      (a) => a * 100,
      (b) => b + 300,
      (c) => c / 2
    ]);
    expect(res).toBe(result);
  });

  test('piping to arrow functions, from an arrow function', () => {
    const result = 200;
    const res = funnl([
      () => 0 + 1,
      (a) => a * 100,
      (b) => b + 300,
      (c) => c / 2
    ]);
    expect(res).toBe(result);
  });

  test('piping to classic functions', () => {
    const result = 200;
    const res = funnl([
      1,
      function(a) { return a * 100; },
      function(b) { return b + 300; },
      function(c) { return c / 2; }
    ]);
    expect(res).toBe(result);
  });

  test('piping to classic functions, from classic function', () => {
    const result = 200;
    const res = funnl([
      function() { return -1 + 2},
      function(a) { return a * 100; },
      function(b) { return b + 300; },
      function(c) { return c / 2; }
    ]);
    expect(res).toBe(result);
  });

  test('array notation', () => {
    const result = 3;
    const add = (...nums) =>  nums.reduce((p, c) => p + c, 0);
    const res = funnl([
      1,
      [add, 1, 1]
    ])
    expect(res).toBe(result);
  })
});

describe('~~~ funnl() function: Type interoperability ~~~', () => {
  test('number -> string -> object', () => {
    const result = {
      message: "You have (5) new messages!"
    }
    const res = funnl([
      () => 5, // Just cuz
      (a) => `You have (${a}) new messages!`,
      (b) => { return {message: b } }
    ]);
    expect(res).toStrictEqual(result);
  })
});