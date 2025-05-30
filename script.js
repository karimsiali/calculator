let firstNumber, secondNumber, operator;
let displayFull = document.querySelector(".full");
let displayCurrent = document.querySelector(".current");
let buttons = document.querySelector(".buttons");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let result = document.querySelector(".result");
let clearBtn = document.querySelector(".clear");
let dot = document.querySelector(".dot");

dotPressed = false;


function add(a, b) {
    return Math.round((a + b) * (100 * 100)) / (100 * 100);
}

function subtract(a, b) {
    return Math.round((a - b) * (100 * 100)) / (100 * 100);
}

function multiply(a, b) {
    return Math.round((a * b) * (100 * 100)) / (100 * 100);
}

function divide(a, b) {
    return Math.round((a / b) * (100 * 100)) / (100 * 100);
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
            if (a == 0 || b == 0) {
                return "ERROR"
            }
            return divide(a, b);
        default:
            return "ERROR";
    }
}

function takeInput() {
    let firstNumber, secondNumber, selectedOperator, displayResult;
    digits.forEach(digit => {
        digit.addEventListener("click", (e) => {
            if (displayResult || displayCurrent.textContent == "ERROR") {
                clear();
            }
            displayCurrent.textContent += e.target.textContent;
            displayFull.textContent += e.target.textContent;           
        })
    })

    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {            
            if (!firstNumber && !selectedOperator) {
                console.log("ya")
                firstNumber = +displayCurrent.textContent;
                console.log(firstNumber)
                selectedOperator = e.target.textContent;
                displayFull.textContent += selectedOperator;
                displayCurrent.textContent = "";
                dotPressed = false;
            } else if (firstNumber && selectedOperator && !displayResult) {
                secondNumber = displayCurrent.textContent;
                displayResult = operate(selectedOperator, +firstNumber, +secondNumber);
                displayFull.textContent = displayResult + e.target.textContent;
                firstNumber = displayResult;
                selectedOperator = e.target.textContent
                displayCurrent.textContent = "";
                displayResult = null;
                dotPressed = false;
            } else if (!displayResult && firstNumber != 0) {
                console.log("no dis")
                selectedOperator = e.target.textContent;
                displayFull.textContent = firstNumber + selectedOperator;
                dotPressed = false;
            } else { /* TODO*/
                displayResult = null;
                firstNumber = displayCurrent.textContent;
                selectedOperator = e.target.textContent;
                displayFull.textContent = firstNumber + selectedOperator;
                displayCurrent.textContent = "";
                dotPressed = false;
            }
            
        })
    })

    result.addEventListener("click", () => {
        dotPressed = false;
        if (!firstNumber || !selectedOperator) {
            displayResult = +(displayCurrent.textContent);
            displayCurrent.textContent = displayResult;
            dotPressed = false;
        } else {         
            secondNumber = displayCurrent.textContent;
            displayResult = operate(selectedOperator, +firstNumber, +secondNumber);
            if (displayResult == "ERROR") {
                displayCurrent.textContent = "ERROR";
                firstNumber = secondNumber = selectedOperator = displayResult = null;
                displayFull.textContent = "";
            } else {
                displayCurrent.textContent = displayResult;
            }
            
        }
        
    })

    
    clearBtn.addEventListener("click", clear);


    function clear() {
        firstNumber = secondNumber = selectedOperator = displayResult = null;
        displayCurrent.innerHTML = displayFull.innerHTML = "";
    }


    dot.addEventListener("click", () => {
        if (!dotPressed) {
            displayCurrent.textContent += ".";
            displayFull.textContent += ".";
            dotPressed = true;
        }
    })
    

}


takeInput()