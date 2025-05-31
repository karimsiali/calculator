let firstNumber, secondNumber, operator;
let displayFull = document.querySelector(".full");
let displayCurrent = document.querySelector(".current");
let buttons = document.querySelector(".buttons");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let result = document.querySelector(".result");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".back");
let dot = document.querySelector(".dot");

dotPressed = false;


function add(a, b) {
    return Math.round((a + b) * (Math.pow(10, 10))) / (Math.pow(10, 10));
}

function subtract(a, b) {
    return Math.round((a - b) * (Math.pow(10, 10))) / (Math.pow(10, 10));
}

function multiply(a, b) {
    return Math.round((a * b) * (Math.pow(10, 10))) / (Math.pow(10, 10));
}

function divide(a, b) {
    return Math.round((a / b) * (Math.pow(10, 10))) / (Math.pow(10, 10));
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
            dotPressed = false;
            /*if (displayCurrent.textContent == "ERROR") {
                displayCurrent.textContent = "";
            }*/
            if (!firstNumber && !selectedOperator) {
                firstNumber = displayCurrent.textContent;
                selectedOperator = e.target.textContent;
                displayFull.textContent += selectedOperator;
                displayCurrent.textContent = "";
                
            } else if (firstNumber && selectedOperator && !displayResult) {
                secondNumber = displayCurrent.textContent;                              
                if (+secondNumber != 0) {
                    displayResult = operate(selectedOperator, +firstNumber, +secondNumber);                  
                    displayFull.textContent = displayResult + e.target.textContent;
                    firstNumber = displayResult;
                    displayCurrent.textContent = "";
                    selectedOperator = e.target.textContent;
                    displayResult = null;
                    
                } else {   
                    displayCurrent.textContent = "";
                    displayFull.textContent = firstNumber + e.target.textContent;
                    selectedOperator = e.target.textContent;
                }
                
            } else if (!displayResult && firstNumber != 0) {                
                selectedOperator = e.target.textContent;
                displayFull.textContent = firstNumber + selectedOperator;
                
            } else {
                displayResult = null;
                firstNumber = displayCurrent.textContent;
                selectedOperator = e.target.textContent;
                displayFull.textContent = firstNumber + selectedOperator;
                displayCurrent.textContent = "";
                
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
                clear();
                displayCurrent.textContent = "ERROR";
            } else {
                displayCurrent.textContent = displayResult;
            }
            
        }
        
    })

    
    clearBtn.addEventListener("click", clear);


    function clear() {
        firstNumber = secondNumber = selectedOperator = displayResult = null;
        displayCurrent.innerHTML = displayFull.innerHTML = "";
        dotPressed = false;
    }


    dot.addEventListener("click", () => {
        if (!dotPressed && !displayResult) {
            displayCurrent.textContent += ".";
            displayFull.textContent += ".";
            dotPressed = true;
        }
    })

    deleteBtn.addEventListener("click", () => {
        if (displayCurrent) {
            displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
            displayFull.textContent = displayFull.textContent.slice(0, -1);
        }
        if (displayCurrent.textContent == "0") {
            displayCurrent.textContent = "";
        }
        if (displayFull.textContent == "0") {
            displayFull.textContent = "";
        }
    })
    

}


takeInput()