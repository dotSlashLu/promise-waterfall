(function (globalVar){

  function isPromise(object) {
    // from Q.js
    return object === Object(object) &&
        typeof object.promiseDispatch === "function" &&
        typeof object.inspect === "function";
  }

  function waterfall(list) {
    // malformed argument
    if (!Array.isArray(list)                  // not an array
      || typeof list.reduce !== "function"    // change your javascript engine
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
  var hasModule = (typeof module !== 'undefined' && module.exports);
  if (hasModule)
    module.exports = waterfall;
  else
    globalVar.waterfall = waterfall;

}).call(this)
