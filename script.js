'use strict';

function login() {
  let username, password;
  let attempt = 0;
  do {
    username = prompt("(admin or user):");
    password = prompt("Password (1234):");

    if (username === null || password === null) {
      alert("login canceled");
      return null;
    }

    attempt++;
    if (attempt > 5) {
      alert("too many attempts ,try again later");
      return null ;
    }

  } while ((username !== "admin" && username !== "user") || password !== "1234");

  return username;
}

function calculateOrder(type, quantity, age) {
  let price = 0;
  if (type === "espresso") price = 2.5;
  else if (type === "latte") price = 3.5;
  else if (type === "cappuccino") price = 4.0;
  else return 0; 

  let total = price * quantity;
  let discount = (age < 18 || age > 60) ? total * 0.1 : 0;
  return total - discount;
}


function takeOrder() {
  let name = prompt("your name");
  if (name === null) return null;

  let age = Number(prompt("age"));
  if (isNaN(age)) return null;

  let type = prompt("type of coffee? (espresso, latte, cappuccino)");
  if (type === null) return null;

  let quantity = Number(prompt("how many cups?"));
  if (isNaN(quantity) || quantity <= 0) return null;

  let totalPrice = calculateOrder(type, quantity, age);

  let tip = Number(prompt("tip Discount?"));
  if (isNaN(tip)) tip = 0;

  let people = Number(prompt("How many people?"));
  if (isNaN(people) || people <= 0) people = 1;

  let tipAmount = totalPrice * (tip / 100);
  let finalAmount = totalPrice + tipAmount;
  let perPerson = finalAmount / people;

  alert(`Order ${name} Registered);
coffee: ${type}
Number: ${quantity}
Total Price: $${finalAmount.toFixed(2)}
Per Person: $${perPerson.toFixed(2)}`);

  return { name, type, quantity, finalAmount };
}


const user = login();
if (!user) {
  alert("Login failed");
} else {
  let orders = [];
  let repeat = true;
  do {
    let order = takeOrder();
    if (order) {
      orders.push(order);
      repeat = confirm("Do you want to add another order?");
    } else {
      repeat = false;
    }
  } while (repeat);

  console.log("Order Summary:");
  for (let i = 0; i < orders.length; i++) {
    console.log(`${i + 1}. ${orders[i].name} - ${orders[i].type} x${orders[i].quantity} = $${orders[i].finalAmount}`);
  }
}