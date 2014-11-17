function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

function waterfall(/*PromiseLib, list*/) {
  var Promise, list;

  if (arguments.length > 1) {
    Promise = arguments[0];
    list = arguments[1];

    // invalid promise lib
    if (!(typeof Promise == "function" && 
      var p = new Promise(function(){}) && 
      typeof p.then == "function")
    )
      throw new TypeError("Invalid Promise library");
    
    // bind to promise lib
    Promise.prototype.waterfall = waterfall;
  }
  else {
    list = arguments[0];
  }
  list = Array.prototype.slice.call(list);
    
}

function _waterfall(list) {
  // malformed argument
  list = Array.prototype.slice.call(list);  // transform to Array
  if (typeof list.reduce !== "function"     // update your javascript engine
    || list.length < 1                      // empty array
  ) {
    throw new Error("Array with reduce function is needed.");
    return;
  }

  if (list.length == 1)
    return list[0]()

  return list.reduce(function(l, r){
    // first round
    // execute function and return promise
    var isFirst = (l == list[0]);
    if (isFirst) {
      if (typeof l != "function")
        throw new Error("List elements should be function to call.");

      var lret = l();
      if (!isPromise(lret))
        throw new Error("Function return value should be a promise.");
      else
        return lret.then(r);
    }
    
    // other rounds
    // l is a promise now
    // priviousPromiseList.then(nextFunction)
    else {
      if (!isPromise(l))
        throw new Error("Function return value should be a promise.");
      else 
        return l.then(r);
    }
  })
}

// export
module.exports = waterfall;
