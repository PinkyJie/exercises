function itWill(func) {
  var isDone = false;
  var res = func();

  function done() {
    isDone = true;
  }

  it(res.desc, function() {
    runs(function() {
      res.setup(done);
    });
    waitsFor(function() {
      return isDone;
    });
    runs(res.test);
  });
}

module.exports = itWill;

