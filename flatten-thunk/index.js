function flattenThunk(thunk) {
  return function(cb) {
    thunk(function(err, data) {
      if (typeof data === 'function') {
        flattenThunk(data)(cb);
      } else {
        cb(err, data);
      }
    });
  }
}

module.exports = flattenThunk;
