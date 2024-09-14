var __EVAL = s => eval(`void (__EVAL = ${__EVAL.toString()}); ${s}`);

function evaluate(expr) {
    console.log(`Evaluate "expr"`);
    try {
        return __EVAL(expr);
    } catch (err) {
        return err.message;
    }
}

var terminalString = "C:\\WINDOWS\\SYSTEM32>";
var inputText = "";
const forbiddenKeys = [
    "Ctrl", 
    "Shift", 
    "Control",
    "Alt",
    "Delete",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
]

addEventListener("keydown", (event) => {
    var input = document.getElementById("input");
    var history = document.getElementById("history");
    console.log(`Pressed "${event.key}"`);
    if (event.key == "Enter") {
        if (inputText == "clear") {
            history.innerHTML = "";
        } else if (inputText.length == 0) {
            history.innerHTML += input.innerHTML + "\n";
        } else {
            const result = evaluate(inputText);
            history.innerHTML += input.innerHTML + "\n";
            history.innerHTML += result + "\n";
        }
        inputText = "";
    } else if (event.key == "Backspace") {
        if (inputText.length > 0) {
            inputText = inputText.slice(0, -1);
        }
    } else if (!forbiddenKeys.includes(event.key)) {
        inputText += event.key;
    }
    input.innerHTML = terminalString + inputText;
});