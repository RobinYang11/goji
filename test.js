


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


const arr = [a,a1,a2,a3,b,c]

const run = (arr)=>{
  // for()
}



