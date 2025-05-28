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
    let firstNumber, secondNumber, selectedOperator, displayResult;
    digits.forEach(digit => {
        digit.addEventListener("click", (e) => {
            if (displayResult) {
                clear();
            }
            displayCurrent.textContent += e.target.textContent;
            displayFull.textContent += e.target.textContent;
             
        })
    })

    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {
            if (displayResult) {
                firstNumber = displayResult;
                displayFull = displayResult + selectedOperator;
            }
            if (selectedOperator) {
                secondNumber = displayCurrent.textContent;
                firstNumber = operate(selectedOperator, +firstNumber, +secondNumber);
                displayFull.textContent = firstNumber;
            } else if (firstNumber) {
                secondNumber = displayCurrent.textContent;
            } else {
                firstNumber = displayCurrent.textContent;
            }
            
            displayCurrent.innerHTML = "";
            selectedOperator = e.target.textContent;
            displayFull.textContent += selectedOperator;
        })
    })

    result.addEventListener("click", () => {
        secondNumber = displayCurrent.textContent;
        displayResult = operate(selectedOperator, +firstNumber, +secondNumber);
        displayCurrent.textContent = displayResult;
    })

    
    clearBtn.addEventListener("click", clear);


    function clear() {
        firstNumber = secondNumber = selectedOperator = displayResult = null;
        displayCurrent.innerHTML = displayFull.innerHTML = "";
    }
    

}


takeInput()