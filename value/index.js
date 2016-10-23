function value(obj) {
  if (typeof obj === 'function') {
    return value(obj());
  }
  return obj;
}

module.exports = value;
