#Promise-waterfall
Promise-waterfall extends promise utilities with sequential flow control like [async.waterfall]((https://github.com/caolan/async#waterfalltasks-callback)). 

Since `Promise.all(promiseArr)` || `Promise.spread(promiseArr)` execs simultaneously, each of the functions in the promiseArr cannot depends on another, and if you want promises execute in order or some of the promises need the resolved value of another, this library is for you.

## Usage


```javascript
var waterfall = require("promise-waterfall");
var func1 = function(){
        //return a promise
    },
    func2 = function(res1){
        // optionally use res1 
        // which is resolved from func1 
        // and return a promise
    },
    func3 = function(res2){
        // like func2
    },
    promiseSequence = [func1, func2, func3];
    
waterfall(promiseSequence) 
    // the promiseSequence will executes sequentially
    // just like func1().then(func2).then(func3)
    .then(function(res){
        // use res
    })
    .catch(function(err){
        // deal with error
    });
```
See test cases in `/tests` for full examples.

## Development

### Test
run `npm test` or `make test`

