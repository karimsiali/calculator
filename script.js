let displayFull = document.querySelector(".full");
let displayCurrent = document.querySelector(".current");
let buttons = document.querySelector(".buttons");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let result = document.querySelector(".result");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".back");
let negative = document.querySelector(".negative");
let dot = document.querySelector(".dot");
let dotPressed = false;
let negativeStatus = false;

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
        case "*":
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
    let totalNumbers = 0;
    digits.forEach(digit => {
        digit.addEventListener("click", typeNumber)
    })

    operators.forEach(operator => {
        operator.addEventListener("click", typeOperator)
    })

    result.addEventListener("click", showResult)

    clearBtn.addEventListener("click", clear);

    dot.addEventListener("click", typeDot);

    deleteBtn.addEventListener("click", deleteDigit);

    negative.addEventListener("click", changeSign);
    
    document.addEventListener("keydown", (e) => {
        let key = e.key;
        if (!isNaN(key)) {
            typeNumber(e.key)
        } else if (key == "+" || key == "-" || key == "*" || key == "/") {
            typeOperator(key);
        } else if (key == "Enter") {
            e.preventDefault();
            showResult();
        } else if (key == ".") {
            typeDot();
        } else if (key == "Backspace") {
            deleteDigit()
        } else if (key == "Delete") {
            clear();
        }
        
    })

    function typeNumber(e) {
        if (displayResult || displayCurrent.textContent == "ERROR") {
                clear();
            }
        if (totalNumbers < 10) {
            try {
                key = e.target.textContent;
            } catch (err) {
                key = e;
            }
            displayCurrent.textContent += key;
            displayFull.textContent += key;
            totalNumbers++;           
        }
    }

    function typeOperator(e) {
        dotPressed = false;
        totalNumbers = 0;            
        try {
            key = e.target.textContent;
        } catch (err) {
            key = e;
        }
        if (!firstNumber && !selectedOperator) {
            firstNumber = displayCurrent.textContent;
            if (negativeStatus == true) {
                firstNumber *= - 1;
                changeSign();
            }
            selectedOperator = key;
            displayFull.textContent = firstNumber + selectedOperator;
            displayCurrent.textContent = "";
            
        } else if (firstNumber && selectedOperator && !displayResult) {
            secondNumber = displayCurrent.textContent;                              
            if (+secondNumber != 0) {
                if (negativeStatus == true) {
                    secondNumber *= - 1;
                    changeSign();
                }
                displayResult = operate(selectedOperator, +firstNumber, +secondNumber);                  
                displayFull.textContent = displayResult + key;
                firstNumber = displayResult;
                displayCurrent.textContent = "";
                selectedOperator = key;
                displayResult = null;
            } else {   
                displayCurrent.textContent = "";
                displayFull.textContent = firstNumber + key;
                selectedOperator = key;
            }
            
        } else if (!displayResult && firstNumber != 0) {                
            selectedOperator = key;
            displayFull.textContent = firstNumber + selectedOperator;
            
        } else {
            displayResult = null;
            firstNumber = displayCurrent.textContent;
            if (negativeStatus == true) {
                firstNumber *= - 1;
                changeSign();
            }
            selectedOperator = key;
            displayFull.textContent = firstNumber + selectedOperator;
            displayCurrent.textContent = "";                
        }
    }

    function showResult() {
        dotPressed = false;
        totalNumbers = 0;
        if (!firstNumber || !selectedOperator) {
            displayResult = +(displayCurrent.textContent);
            displayCurrent.textContent = displayResult;
            dotPressed = false;
            negativeStatus = false;
        } else {         
            secondNumber = displayCurrent.textContent;
            if (negativeStatus == true) {
                secondNumber *= - 1;
                changeSign();
            }
            displayResult = operate(selectedOperator, +firstNumber, +secondNumber);
            if (displayResult == "ERROR") {
                clear();
                displayCurrent.textContent = "ERROR";
            } else {
                displayCurrent.textContent = displayResult;
            }      
        }
    }

    function typeDot() {
        if (!dotPressed && !displayResult) {
            displayCurrent.textContent += ".";
            displayFull.textContent += ".";
            dotPressed = true;
        }
    }

    function deleteDigit() {
        totalNumbers--;
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
    }

    function clear() {
        firstNumber = secondNumber = selectedOperator = displayResult = null;
        displayCurrent.innerHTML = displayFull.innerHTML = "";
        dotPressed = false;
        totalNumbers = 0;
        if (negativeStatus == true) {
            changeSign();
        }        
    }
    
    function changeSign() {
        if (negativeStatus == false) {
            negativeStatus = true;
            document.querySelector(".sign").textContent = "-"
        } else {
            negativeStatus = false;
            document.querySelector(".sign").textContent = ""
        }
    }
}

takeInput()