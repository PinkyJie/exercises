function debounce(func, delay) {
  var timer;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    var that = this;
    var args = arguments;
    timer = setTimeout(function() {
      func.apply(that, args);
    }, delay);
  }
}

module.exports = debounce;
