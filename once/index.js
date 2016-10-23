function once(func) {
  var hasCalled = false;
  var lastValue;
  return function() {
    if (!hasCalled) {
      hasCalled = true;
      lastValue = func.apply(this, arguments);
    }
    return lastValue;
  }
}

module.exports = once;
