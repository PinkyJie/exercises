function curry(func) {
  var len = func.length;
  return function a() {
    var args = [].slice.call(arguments, 0);
    if (args.length === len) {
      return func.apply(null, arguments);
    }
    return function () {
      var args1 = [].slice.call(arguments, 0);
      return a.apply(null, args.concat(args1));
    }
  }
}

module.exports = curry;
