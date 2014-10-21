(function (globalVar){

  function waterfall(list) {
    // malformed argument
    if (!Array.isArray(list) || typeof list.reduce !== "function" || list.length < 1) {
      throw new Error("Array with reduce funciton is needed.");
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
        return l().then(r);
      }
      
      // other rounds
      // l is a promise now
      // priviousPromiseList.then(nextFunction)
      else {
        try {
          return l.then(r);
        } catch (e) {
          throw new Error(e);
        }
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