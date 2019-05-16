const funnl = require('../index');

describe('~~~ funnl() function: Single args ~~~', () => {
  test('single arg: Number', () => {
    const num = funnl(2)();

    expect(num).toBe(2);
  });

  test('single arg: String', () => {
    const s = "it's wooooorking!!! - Anakin";
    const str = funnl(s)();
    expect(str).toBe(s);
  })

  test('single arg: Object', () => {
    const o = {
      message: 'hi'
    };
    const obj = funnl(o)();
    expect(obj).toStrictEqual(o);
  });

  test('single arg: function()', () => {
    const res = funnl()(
        function () { return 2; }
      );

    expect(res).toEqual(2);
  });

  test('single arg: () => {}', () => {
    const res = funnl()(
        () => 2
      );
      
    expect(res).toEqual(2);
  })
});

describe('~~~ funnl() function: Multi args ~~~', () => {
  test('piping to arrow functions', () => {
    const result = 200;
    const res = funnl(1)(
        (a) => a * 100,
        (b) => b + 300,
        (c) => c / 2
      );

    expect(res).toBe(result);
  });

  test('piping to classic functions', () => {
    const result = 200;
    const res = funnl(1)
      (
        function(a) { return a * 100; },
        function(b) { return b + 300; },
        function(c) { return c / 2; }
      );
    expect(res).toBe(result);
  });

  test('array notation', () => {
    const result = 3;
    const add = (...nums) =>  nums.reduce((p, c) => p + c, 0);
    const res = funnl(1)
      (
        [add, 1, 1]
      )
    expect(res).toBe(result);
  })
});

describe('~~~ funnl() function: Type interoperability ~~~', () => {
  test('number -> string -> object', () => {
    const result = {
      message: "You have (5) new messages!"
    }
    const res = funnl(5)
      (
        (a) => `You have (${a}) new messages!`,
        (b) => { return { message: b } }
      );
    expect(res).toStrictEqual(result);
  })
});

describe('~~~ funnl() promises ~~~ ', () => {
  test('async for function', async () => {
    expect.assertions(1);
    const result = {
      message: "You have (5) new messages!"
    }

    expect(await funnl( (() => {
        setTimeout(() => console.log('timed out'), 200);
        return 5;
      })())
        (
          (a) => `You have (${a}) new messages!`,
          (b) => { return {message: b } }
        )
    ).toEqual(result);
  })
})

describe('~~~ funnl() stress test (100+) fn calls', () => {
  function fns(numFns){
    let fnChain = [];
    for(let i = 0; i < numFns; i++){
      fnChain.push(
        (a) => ++a
      )
    }
    return fnChain;
  }
  
  async function fnsA(numFns){
    let asyncFnChain = [0];
    for(let i = 0; i < numFns; i++){
      asyncFnChain.push(
        async (a) => { 
          await setTimeout(() => {}, 10);
          return ++a;
        }
      )
    }
    return asyncFnChain;
  }

  test('150 sync', () => {
    const fn = fns(150);
    const res = funnl(0)
      (...fn);
  
    expect(res).toEqual(150);
  })

  test('1500 sync', () => {
    const fn = fns(1500);
    const res = funnl(0)
      (...fn);
    expect(res).toEqual(1500);
  });

  test('15000 sync', () => {
    const fn = fns(1500);
    const res = funnl(0)
      (...fn);
    expect(res).toEqual(1500);
  });

})