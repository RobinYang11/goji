


const isAsyncFunction = require("is-async-function");


const a = async () => {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("A")
      console.log("A")
    }, 3000)
  });
}

const a1 = async () => {
  console.log("A1");
  return Promise.resolve("A1");
}
const a2 = async () => {
  console.log("A2")
  return Promise.resolve("A2");
}

const a3 = () => {
  throw new Error("A3");
}


const b = async () => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject("abc");
      // throw new Error("B is error")
      // reject("B")
      // resolve("B")
      // console.log("B")
    }, 2000)
  });
}

const c = async () => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("B")
      console.log("B")
    }, 2000)
  });
}

const run = (value, arr, errorCallback) => {
  // await a();
  // await b();

  // this code can't act synchronously
  // arr.forEach(async (fn) => {
  //   await fn(v)
  // })

  let index = 0;
  go(arr[index])

  async function go(fn) {
    try {
      if (isAsyncFunction(fn)) {
        await fn()
      }
      else { fn() }
      index++;
      if (arr[index] !== undefined) {
        go(arr[index])
      }
    } catch (err) {
      errorCallback(err);
      return err;
    }
  }
}

const res = run('', [a, a1, a2, a3, b, c], (err) => {
  console.log("throw err: " + err)
});








