let firstNumber, secondNumber, operator;
let display = document.querySelector(".display p");
let buttons = document.querySelector(".buttons");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let clear = document.querySelector(".clear");


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERROR";
    }
}

function takeInput() {
    let firstNumber, secondNumber;
    digits.forEach(digit => {
        digit.addEventListener("click", (e) => {
            display.textContent += digit.innerHTML
        })
    })

    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {
            firstNumber = display.textContent;
            //console.log(firstNumber)
        })
    })

}

takeInput()