let firstNumber, secondNumber, operator;
let displayFull = document.querySelector(".full");
let displayCurrent = document.querySelector(".current");
let buttons = document.querySelector(".buttons");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let result = document.querySelector(".result");
let clearBtn = document.querySelector(".clear");


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
    let firstNumber, secondNumber, selectedOperator;
    digits.forEach(digit => {
        digit.addEventListener("click", (e) => {
             if (firstNumber && secondNumber) {
                firstNumber = secondNumber = null;
                displayCurrent.innerHTML = "";
                displayFull.innerHTML = "";
            } else if (firstNumber) {
                displayCurrent.innerHTML = "";
            }
            displayFull.textContent += digit.innerHTML;
            displayCurrent.textContent += digit.innerHTML;
        })
    })

    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {
            firstNumber = displayCurrent.textContent;
            selectedOperator = e.target.textContent;
            //displayCurrent.innerHTML = "";
            displayFull.innerHTML += operator.innerHTML;
            //console.log(e.target.textContent)
        })
    })

    result.addEventListener("click", () => {
        secondNumber = displayCurrent.textContent;
        displayCurrent.textContent = operate(selectedOperator, +firstNumber, +secondNumber);
    })

    
    clearBtn.addEventListener("click", () => {
        firstNumber = secondNumber = null;
        displayCurrent.innerHTML = displayFull.innerHTML = "";
    })
    

}


takeInput()