var async = {
  sequence: function(thunkArr) {
    return function(cb) {
      thunkArr[0](function(error1, data1) {
        if (error1) {
          cb(error1, data1);
        } else {
          thunkArr[1](function(error2, data2) {
            cb(error2, data2);
          }, data1);
        }
      });
    };
  },
  parallel: function(thunkArr) {
    var error = [], data = [];
    return function(cb) {
      thunkArr.forEach(function(thunk, idx) {
        thunk(function (error1, data1) {
          if (error1) {
            error.push(error1);
          } else {
            data.push(data1);
          }
          if (idx === thunkArr.length - 1) {
            cb(error, data);
          }
        });
      });
    };
  },
  race: function(thunkArr) {
    var error, data;
    return function(cb) {
      thunkArr.forEach(function(thunk, idx) {
        thunk(function (error1, data1) {
          if (error1) {
            if (!error) {
              error = error1;
            }
          } else {
            if (!data) {
              data = data1;
            }
          }
          if (idx === thunkArr.length - 1) {
            cb(error, data);
          }
        });
      });
    }
  }
};

module.exports = async;
