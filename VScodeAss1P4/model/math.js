function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mult(a, b) { return a * b; }
function div(a, b) { return b === 0 ? 'Cannot divide by zero' : a / b; }

module.exports = { add, sub, mult, div };