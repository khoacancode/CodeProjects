/*
my jsfiddle code to the clock problem on exorcism.io interview question:
http://exercism.io/exercises/javascript/clock/readme

*/

"use strict";

function at(h, m) {
  var hours, minutes = m ? m : 0;

  var normalize = function(h, m) {
    var hr = h < 0 ? 24 + h : h;
    hours = (Math.floor(m / 60) + hr) % 24; //instead of parseInt          
    minutes = m ? m % 60 : 0;

    //edge case of negative minutes being passed in
    if (m < 0) {
      minutes = m % 60 + 60;
      hours = hours - 1;
    }
  };
  normalize(h, minutes);

  //public methods    
  var toString = function() {
      return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
    },
    plus = function(m) {
      return at(hours, minutes + m);
    },
    minus = function(m) {
      return at(hours, minutes - m); //or 
      //return plus(-1 * m);        
    },
    equals = function(clock) {
      return (this.toString() === clock.toString());
    };

  //expose assessible methods
  return {
    toString: toString,
    minus: minus,
    plus: plus,
    equals: equals
  };
}

console.clear();
console.log(at(8).toString()); //08:00
console.log(at(2, 1500).toString()); //11:09
console.log(at(11, 9).toString()); //11:09
console.log(at(1, 60).toString()); //02:00
console.log(at(-1, 15).toString()); //23:15

console.log(at(10, 0).plus(3).toString()); //10:03
console.log(at(10, 3).minus(3).toString()); //10:00

//edgecases 
console.log(at(10, 3).minus(8).toString()); //09:55
console.log(at(10, -65).toString()); //08:55
console.log(at(10, 3).plus(-3).toString()); //10:00

console.log(at(15, 37).equals(at(15, 37))); //true
console.log(at(22, 40).equals(at(-2, 40))); //true
