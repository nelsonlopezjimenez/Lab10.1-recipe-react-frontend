// Consider the following code:
let totalAA = 100;
function addCost(cost){
    total += cost;
}
function main(){
    addCost(20);
    console.log(total);
    addCost(20);
    console.log(total);
    addCostPure(20)
    console.log(total);
    addCostPure(20)
    console.log(total);
}
// main()
// is it a pure function?
// how can you refactor to make it a pure function?
// SOLUTION
function addCostPure(cost){
    let newTotal = total;
    return newTotal += cost;
}
// EXERCISE 2
// Consider the following code:
const rgbColorsAA = ['red', 'green', 'blue'];
const rgbColorsPure = ['red', 'green', 'blue'];

function addColor(newColor){
    rgbColors.push(newColor);
    return rgbColors;
}
function main(){
    console.log(addColor('black'));
    console.log(addColor('black'));
    console.log(addColorPure('black'));
    console.log(addColorPure('black'));
    console.log(addColorPure('black'));
}
// main()
function addColorPure(newColor){
    const result =  [...rgbColorsPure, newColor];
    return [rgbColorsPure, result];
}
// EXERCISE 3
// Consider the following code
const order = { restaurant: "Dominos", status: "delayed", remainingTime: 30 }
const orderPure = { restaurant: "Dominos", status: "delayed", remainingTime: 30 }
function updateOrder(status, newWaitTime) {
    order.status = status; // original
    order.remainingTime = newWaitTime;
    return "Delivery has been updated!!";
}
updateOrder('on time', 15); // Delivery has been updated
updateOrderPure('on time', 15); // Delivery has been updated

function main(){
    console.log(order); //changed
    console.log(orderPure); //unchanged
}

function updateOrderPure(status, newWaitTime){
    const result = (orderPure) => {

        return {...orderPure, status: status, remainingTime: newWaitTime}
    }
    return 'Delivery has been updated'
}

// EXERCISE 4
// Consider the following URL
// https://jsonplaceholder.typicode.com/users/1
// Consider the following object
const arrOfJSONobjects = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    }, //.........
]
    // ....... dotted line does mean many more objects
 

  // Question 1. if 
  const URL = "https://jsonplaceholder.typicode.com"
  // how do you would access Leanne data, select the correct syntax:
  /**
   * A) fetch(URL).then(response => response.json()).then(json => console.log(json))
   * B) const data = await fetch(URL); const result = await data.json(); 
   * C) const data = await fetch(URL + /users/1); const result = await data.json(); 
   * D) const data = await fetch(URL + "users/1"); const result  = await data.json();
   * E) none of them
   */

  // Question 2.  // what would be the correct syntax to display the following message (not including the wrapping single quotes)
  // 'Leanne Graham works at Romaguera-Crona company, whose motto is "Multi-layered client-server neural-net". 
  // The company web site is "hidlegard.org". Leanne's address is "Kulas Light Apt. 556 Gwenborough 92998-3874" at latitude -37.3 
  // and longitud 81.1.'
  /**
   * A) 
   */

let i = arrOfJSONobjects[0];

function exercise_4 () {
    //A
    console.log(`${i.name} works at ${i.company.name}, whose motto is "${i.company.catchPhrase}". The company's web site is "${i.website}". ${i.name}'s address is "${i.address.street} ${i.address.suite} ${i.address.city} ${i.address.zipcode} " at latitude ${i.address.geo.lat} and longitud ${i.address.geo.lng}`)
    //B
    console.log(i.name + "works at" + i.company.name + "," + "whose motto is" + "\"" + i.company.catchPhrase + "\". The company's web site is \"" + i.website + "\". " +  i.name + "'s address is " + i.address.street + i.address.suite + i.address.city + i.address.zipcode + " at latitude " + Number(i.address.geo.lat).toFixed(2) + " and longitud " +  Number(i.address.geo.lng).toFixed(1));
    //C
    console.log(`${i.name} works at ${i.company.name}, whose motto is "${i.company.catchPhrase}". The company's web site is "${i.website}". ${i.name}'s address is "${i.address.street} ${i.address.suite} ${i.address.city} ${i.address.zipcode}" at latitude ${Number(i.address.geo.lat).toFixed(2)} and longitud ${Number(i.address.geo.lng).toFixed(1)}`)
    //D
    //B and C
}

// EXERCISE 5
// dot/bracket notation\
// consider the following object:
function checkForFood(restaurant, food) {
    if (restaurant.menus[food.type].includes(food.name)) {
      return `Yes, we're serving ${food.name} today!`;
    }
    return `Sorry, we aren't serving ${food.name} today.`
  }
  
const foodItem = {
    name: "Quiche",
    price: "6.49",
    type: "lunch"
  };
  
const restaurant = {
    name: 'Butcher Block Cafe',
    menus: {
      breakfast: ['Quiche', 'Egg and Sausage Sandwhich', 'Corn Beef Hash'],
      lunch: ['Ham and Swiss', 'Chicken Fried Steak', 'Cheeseburger'],
      dinner: ['T Bone Steak', 'Spagetti and Meatballs']
    }
  }
  
function exercise_5 () {
    console.log(checkForFood(restaurant, foodItem))
}

// EXERCISE 4A
const phrases = {
    greeting : 'hello',
    departing : 'goodbye'
}
const lookupItem  = 'greeting';

function exercise_4A () {
    console.log(phrases[lookupItem]);
}
/**
 * A) the output is: undefined
 * B) the output is: null
 * C) the output is: hello  //////
 * D) the ouput is : goodbye
 */
// exercise_4A()

// EXERCISE 4B
function exercise_4B() {
    console.log(phrases.lookupItem);
}
// exercise_4B();
/**
 * A) the output is: undefined //////
 * B) the output is: null
 * C) the output is: hello
 * D) the ouput is : goodbye
 */
// EXERCISE 4C
function exercise_4C ()  {
    console.log(phrases['greeting']);
}
// exercise_4C();
/**
 * A) the output is: undefined
 * B) the output is: null
 * C) the output is: hello//////
 * D) the ouput is : goodbye
 */
// EXERCISE 4D
function exercise_4D ()  {
    console.log(phrases.greeting);
}
// exercise_4D ();
/**
 * A) the output is: undefined
 * B) the output is: null
 * C) the output is: hello//////
 * D) the ouput is : goodbye
 */
// EXERCISE 4e
function exercise_4e ()  {
   // console.log(phrases.'greeting');
}
// exercise_4e ();
/**
 * A) the output is: undefined
 * B) the output is: none of them //////
 * C) the output is: hello
 * D) the ouput is : goodbye
 */

// exercise 8
// pure functions dmitripavlutin
// consider the following code
function sum(num1, num2) {
    return num1 + num2;
}
// is it a pure function?
// true or false

// exercise 10 
// one of the following Math methods is not a pure function, select it

//A
Math.max(1,2,3)
//B
Math.floor(1.23)
//C
Math.random()
//D
// none of them

//exercise 12
//Consider the following function
function exercise_12 (num1, num2) {
    const sum = num1 + num2;
    console.log(sum);
    return sum;
}
// is the function pure?
// true of false

// exercise 14
// The following are examples of side effects, select the correct one
//A) loggin to console
//B) DOM manipulations
//C) making HTTP request
//D) all of them


// exercise 16
// The following function is impure because is mutating an external object: rgbColors array
const rgbColors = ['red', 'green', 'blue'];
function addColor(newColor){
    rgbColors.push(newColor);
    return rgbColors;
}
// if you refactor addColor function into a pure function the result would be:
//


// A) ////
function funcA (newColor){
    const result =  [ ...rgbColorsPure, newColor ];
    return result;
}

// A)
function funcB (newColor){
    //const result =  ...rgbColorsPure, newColor;
    return  result;
}
// A)
function funcD (newColor){
    const result =  { ...rgbColorsPure, newColor };
    return result;
}
//D) none of them

//exercise 18
// The following unction is impure. It changes an external state. Convert the function to a pure function:
let total = 100;
function addCost(cost){
    total += cost;
}

//A) //////
function funcA (cost){
    let newTotal = total;
    newTotal += cost;
}
//A) 
function funcB (cost){
    let total = total;
    total += cost;
}
//A) 
function funcC(cost){
    total = total + cost;
}
//D) funcA and funcB

// exercise 20
// the following  methods generate a shallow copy of an array, except
// Array.prototype.splice()
// Array.prototype.map()
// Array.prototype.slice()
// using spread operator

// exercise 22
// Create a function that determines whether a shopping order is eligible for free shipping. An order is elegible for free shipping if the total cost of items purchased exceeds $50.00 
function checkForFreeShipping(oneObj){
    // return Object.entries(oneObj).map((key, value) => [key, value] )
    // return Object.keys(oneObj).map((key, value) => [key, value] )
    let total = 0 
    result = Object.values(oneObj).map( val => total += val)
    return result[result.length - 1] < 50 ? true : false
}

console.log(checkForFreeShipping({
    "Chairs": 10,
    "Candy Crush": 3,
    "Wordle": 3
}));
//A) funcA (obj){ let total = 0; result = Object.values(obj).map( val => total += val); return [result.lenght - 1] < 50 ? true : false}
//B) 