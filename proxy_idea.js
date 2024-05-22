


class Form {


  callback = null;
  values = null;

  constructor(callback) {
    this.callback = callback;
    this.values = new Proxy({}, {
      set(target, prop, value) {
        callback && callback();
        target[prop] = value;
        return true;
      },
      get(target, prop) {
        return target[prop];
      }
    })
  }



  setValue() {
    this.values['name'] = "Test";
  }

}

const cb = () => {
  console.log("this is callback function")
}
const form = new Form(cb);
form.setValue("test");
console.log(form.values.name)