function add(a,b){
   return a + b;
}
// const increment = add.bind(null,1);
// console.log(increment(3));

/**
xcvcxvcxvxcvxcvxcvxcvvrryvxcvc
*/
function binaryCurry(fn) {
   return function(a){
      console.log("fn", fn)
      console.log("a", a)
      return function(b){
         console.log(b)
         return fn(a,b)
      }
   }
}

//demonstrates how we can transform binary functions into curry functions so we don't have to rewrite all the binary functions
const curriedAdd = binaryCurry(add);
// console.log(curriedAdd)
const increment  = curriedAdd(1)
console.log(increment(4))


//rest parameter syntax allos us to represent an indefininte # of ARGUMENTS as an array
function f(...[a,b,c]){
   return a+b+c;
}
console.log(f(1,2,3))


//spread syntax allows an EXPRESSION to be expanded in places where 0 or more arguments are expected.
function myFunction(z,y,c){
   return z+y+c;
}
var args = [0,1,2];
console.log(myFunction(...args))
console.log(myFunction.apply(null, args)) //alternative via the apply method
