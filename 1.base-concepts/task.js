"use strict";
function solveEquation(a, b, c) {
  let arr = [];
  const discriminant = b**2-4*a*c;
  if (discriminant < 0) {
    return arr;
  } else if (discriminant === 0) {
    const root1 = -b/(2*a);
    arr.push(root1);
  } else if (discriminant > 0) {
    const root1 = (-b + Math.sqrt(discriminant))/(2*a);
    const root2 = (-b - Math.sqrt(discriminant))/(2*a);
    arr.push(root1, root2);
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  if  (
    typeof percent !== "number" || typeof contribution !== "number" || typeof amount !== "number" || typeof countMonths !== "number") {
      return false;
    }
    const P = percent / 100 / 12;
    const S = amount - contribution;
    const n = countMonths;
    const payment = S*(P + (P/(((1 + P)**n) - 1)));
    const total = Number((payment * countMonths).toFixed(2));    
    return total;
}