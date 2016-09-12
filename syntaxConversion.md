##CoffeeScript to Javascript Syntax Translations

###Functions

CoffeeScript uses ecma script syntax specifications for defining functions, classes and constructors

```function myFunction(param,param1){}```
Coffee script version
```
myFunction = (param,param1) ->
```

###Bound Functions

In JavaScript, the this keyword is dynamically scoped to mean the object that the current function is attached to. If you pass a function as a callback or attach it to a different object, the original value of this will be lost.

The fat arrow => can be used to both define a function, and to bind it to the current value of this, right on the spot. This is helpful when using callback-based libraries like Prototype or jQuery, for creating iterator functions to pass to each, or event-handler functions to use with on. Functions created with the fat arrow are able to access properties of the this where they're defined.

```
Account = (customer, cart) ->
  @customer = customer
  @cart = cart

  $('.shopping_cart').on 'click', (event) =>
    @customer.purchase @cart
```
The above CoffeeScript transpiles to
```
var Account;

Account = function(customer, cart) {
  this.customer = customer;
  this.cart = cart;
  return $('.shopping_cart').on('click', (function(_this) {
    return function(event) {
      return _this.customer.purchase(_this.cart);
    };
  })(this));
};
```

####Chaining Functions

To chain functions, simply use the javascript parenthesis syntax.

```
myFunction (->
    doThis ->
).nowDoThat (->
).andFinishWithThis ->
```

###Classes

Instead of repetitively attaching functions to a prototype, CoffeeScript provides a basic class structure that allows you to name your class, set the superclass, assign prototypal properties, and define the constructor, in a single assignable expression.

```
class animal
      constructor:(var1,var2) ->
         {@name, @age, @height = 'average'} = options
```
The transpiled code of the above example will be
```
var animal;

   animal = (function() {
     function animal(var1, var2) {
       var ref;
       this.name = options.name, this.age = options.age, this.height = (ref = options.height) != null ? ref : 'average';
     }

     return animal;

   })();
```

###Loops

In traditional javascript, loops or iterations use either the for tag or the while tag. Both are iterative declarations that define a start point and, optionally an endpoint. In CoffeScript, however, loops are treated as comprehensions over arrays, objects or ranges. Comprehensions are also able to handle loops such as each/forEach, map or select/filter

The following code displays a simple code that iterates through an array and dumps the results to the console

```
var num = ['this','that','these','those','there','thing']
for (var i = 0; i < num.length; i++) {
    results.push(num[i]);
  }
```
Here is the CoffeeScript code that does the same thing
```
  num = [
    'this'
    'that'
    'these'
    'those'
    'there'
    'thing'
  ]
  i = 0
  while i < num.length
    console.log num[i]
    i++
```

Note how the for statement is replaced by a simple while X compare Y and the incrementation is placed at the end of the loop.

###Variables

Variables in CoffeeScript are defined almost identically to javascript. In CoffeeScript, the word var is reserved. Therefore, to declare a variable, it is only necessary to define it's name and if necessary it's value

```
  myVariable = 'me'
  #returns var myVariable = 'me' when transpiled
```

###Arrays and Objects

Arrays and objects are defined the same way in CoffeeScript as in JavaScript

```
array = []
object = {}
```

###String interpolation

CoffeeScript uses a Ruby style string interpolation which is also similar to template based languages string injections. Below is a example of a string interpolation in CoffeeScript and the resulting JavaScript

```
team = "Boston Red Sox"
player = "Babe Ruth"
sentence = "#{player} played for the #{team}"
```

The code above will transpile to

```
var player, sentence, team;
team = "Boston Red Sox";
player = "Babe Ruth";
sentence = player + " played for the " + team;
```

###Try/Catch/Finally

Try expressions only differ syntactically in CoffeeScript. Like in all of CoffeeScript, the curly braces do not exist

```
try
  aFunction()
catch error
  console.log(error)
finally
  doSomethingElse()
```

###Switch statements

To use switch statements, CoffeeScript uses a logical when/then/else clause format. Case becomes when and default is replaced by else. It is also no longer necessary to declare breaks.

```
switch condition
  when "something" then doThis()
  when "something else" then doThisInstead()
  else doNothing()
```

Note how much easier it is to write a switch statement in CoffeeScript and how more readable it is

###If, Else, Unless, and Conditional Assignment

CoffeeScript, as you have certainly already noted, does not use brackets, braces or curly brackets. If/else statements are written in the same way as conventional javascript, minus the brackets. Mind the indentation.

CoffeeScript add the unless condition which allows you to do to something in your code based on the existence of a variable or condition

```
doSomeThing() unless x = 0
```
will transpile to
```
if (!(x = 0)) {
  doSomeThing();
}
```

###Ternary Statements

Ternary statements are less common in CoffeeScript but use a very logical format that is easily readable by the non savvy developer. In JavaScript you would format your ternary as
```
var animal = pug ? dog : cat
```
In CoffeeScript, the logic is much more straightforward
```
animal = if pug then dog else cat
```
You can do the same things with ternaries in CoffeeScript as you would in JavaScript (i.e. function calls within the definitions)

###Array Slicing and Splicing with Ranges

Ranges can also be used to extract slices of arrays. With two dots (3..6), the range is inclusive (3, 4, 5, 6); with three dots (3...6), the range excludes the end (3, 4, 5). Slices indices have useful defaults. An omitted first index defaults to zero and an omitted second index defaults to the size of the array.

```
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
start   = numbers[0..2] #var start = numbers.slice(0, 3);
middle  = numbers[3...-2] #middle = numbers.slice(3, -2);
end     = numbers[-2..]
copy    = numbers[..]
```

###Operators and Aliases
```
is                     ===
isnt                   !==
not                    !
and                    &&
or                     ||
true,yes,on            true
false,no,off           false
@, this                this
of                     in
in                     no js equivalent
a ** b                 Math.pow(a, b)
a // b                 Math.floor(a / b)
a %% b                 (a % b + b) % b
```

###Comments

To define comments in CoffeeScript use the following syntax

```
#single line comment

###
multi line comment
###
```

###Embedded Javascript

You might need to intersperse JavaScript snippets in your CoffeeScript for whatever reason. To do so, just wrap the javascript instruction in backsticks

```
`function something()`
```