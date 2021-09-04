let runningTotal = 0;
let buffer = "0";
let prevOperator = null;

const screen = document.querySelector(".screen")

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbols(value);
    } else {
        handleNumbers(value);
    }
    screen.innerText = buffer
}

function handleSymbols(symbol) {
    if(symbol == 'C') {
        buffer = "0"
        runningTotal = 0
        return
    }

    if(symbol == '←') {
        if(buffer.length == 1) {
            buffer = '0'
        } else {
            buffer = buffer.slice(0, -1)
        }
    }

    if((symbol === '−') || (symbol === '+') || (symbol == '×') || (symbol == '÷')) {
        handleMath(symbol)
    
    }

    if (symbol == '=') {
        if(prevOperator == null) { return }
        flushOperation(parseInt(buffer))
        buffer = runningTotal
        prevOperator = null
        runningTotal = 0
    }
}

function handleMath(symbol) {
    if(buffer == '0') { return }
    
    const intBuffer = parseInt(buffer)

    if (runningTotal == 0) {
        runningTotal = intBuffer
    } else {
        flushOperation(intBuffer)
    }

    prevOperator = symbol;

    buffer = '0';
}

//× ÷ -
function flushOperation(intBuffer) {
    switch (prevOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '÷':
            runningTotal /= intBuffer;
            break;
    }
}
            
function handleNumbers(numberString) {
    if(buffer == "0") {
        buffer = numberString
    } else {
        buffer += numberString
    }
}

function init() {
    document.querySelector(".calc-buttons")
        .addEventListener('click', event => {
            buttonClick(event.target.innerText)
        })
}

init()