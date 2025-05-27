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
            console.log(selectedOperator)
            if (selectedOperator) {
                firstNumber = operate(selectedOperator, +firstNumber, +secondNumber);
                displayFull.textContent = firstNumber;
                selectedOperator = e.target.textContent;
            }
            firstNumber = displayCurrent.textContent;
            selectedOperator = e.target.textContent;
            displayFull.innerHTML += operator.innerHTML;
        })
    })

    result.addEventListener("click", () => {
        secondNumber = displayCurrent.textContent;
        displayResult = operate(selectedOperator, +firstNumber, +secondNumber);
        displayCurrent.textContent = displayResult;
        firstNumber = secondNumber = selectedOperator = null;
    })

    
    clearBtn.addEventListener("click", () => {
        firstNumber = secondNumber = selectedOperator = displayResult = null;
        displayCurrent.innerHTML = displayFull.innerHTML = "";
    })
    

}


takeInput()