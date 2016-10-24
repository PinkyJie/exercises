function Middleware() {
  this.callbcks = [];
  this.context = {};
}

Middleware.prototype.use = function(func) {
  this.callbcks.push(func);
};

Middleware.prototype.go = function(func) {
  var i = this.callbcks.length - 1;
  var ctx = this.context;

  var last = func;
  while(this.callbcks.length > 0) {
    var cur = this.callbcks.pop();
    last = cur.bind(ctx, last.bind(ctx));
    i--;
  }
  last();
};

module.exports = Middleware;
