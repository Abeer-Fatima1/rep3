const myobj = {};

function appendToInput(value) {
  const arr = ["+", "-", "*", "/", "^", "sqrt(", "cos(", "tan(", ")", "sin(", "pi", "e", "("];
  const arr1 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "e", "pi"];
  const arr2 = ["+", "-", "*", "/", "^"];
  const arr3 = ["sqrt(", "cos(", "tan(", "sin(", "pi", "e"];
  const arr4 = ["e", "i", ")"];
  const arr5 = ["cos(", "tan(", "sin("];
  const arr6 = ["+", "-", "/", "^"];

  const exp = Optimize(value, arr, arr1, arr2, arr3, arr4, arr5,arr6);
}

function EraseContent() {
  const destinationDiv = document.getElementById('textInput');
  const destinationDiv1 = document.getElementById('answer');
  destinationDiv.value = "";
  destinationDiv1.value = "";
  const textInput1 = document.getElementById('answer');
  textInput1.style.display = "none";
  const textInput = document.getElementById('textInput');
  textInput.style.height = "100%";
  textInput.style.fontSize = "30px";
}

function removeLastCharacter() {
  const inputElement = document.getElementById("textInput");
  const currentValue = inputElement.value;

  if (currentValue.length) {
    const newValue = currentValue.slice(0, -1);
    inputElement.value = newValue;
  }
}

function precedence(operator) {
  switch (operator) {
    case '+':
    case '-':
      return 1;

    case '*':
    case '/':
      return 2;

    case 'sin':
    case 'cos':
    case 'tan':
    case 'sqrt':
      return 3;

    case '^':
      return 4;

    default:
      return 0;
  }
}

function isOperator(token) {
  const arr2 = ['+', '-', '*', '/', 'sin', 'cos', 'tan', 'sqrt', '^'];
  return arr2.includes(token);
}

function evaluateOperator(operator, operand1, operand2) {
  switch (operator) {
    case '+':
      return (Number(operand1) + Number(operand2)).toFixed(4);

    case '-':
      return (Number(operand1) - Number(operand2)).toFixed(4);

    case '*':
      return (Number(operand1) * Number(operand2)).toFixed(4);

    case '/':
      if (operand2 == 0) {
        return "Math Error";
      }
      return (Number(operand1) / Number(operand2)).toFixed(4);

    case '^':
      return Math.pow(Number(operand1), Number(operand2));

    case 'sin':
      return Math.sin(Number(operand2) * (Math.PI / 180)).toFixed(4);

    case 'cos':
      return Math.cos(Number(operand2) * (Math.PI / 180)).toFixed(4);

    case 'tan':
      if (operand2 == 90) {
        return "Undefined";
      }
      return Math.tan(Number(operand2) * (Math.PI / 180)).toFixed(4);

    case 'sqrt':
      return Math.sqrt(Number(operand2)).toFixed(4);

    default:
      throw new Error('Unsupported operator: ' + operator);
  }
}

function infixToPostfix() {
  const textInput = document.getElementById('textInput');
  textInput.style.height = "50%";
  textInput.style.fontSize = "17px";
  const textInput1 = document.getElementById('answer');
  textInput1.style.display = "flex";
  const expression = textInput.value;
  const output = [];
  const operatorStack = [];

  let tokens1;

  w2 = Array.from(expression);
  w3 = Array.from(expression);

  w3.forEach((elm, index) => {

    const nextindx = w3[index + 1];
    const nextindx1 = w3[index + 2];
    if (elm === "(" && nextindx === "+") {
      w3.splice(index + 1, 1);
      const result = w3.join('');
      w2 = w3;
    }
  })

  switch (w2[0]) {
    case "+":
      w2.splice(0, 1);
      const result = w2.join('');
      tokens1 = result;
      break;

    default:
      tokens1 = w2.join("");
  }

  const tokens = tokens1.match(/(?:sin|cos|tan|sqrt|\b[A-Za-z0-9.]{1,9}(?![\d.])\b|\^|\b[+\-*/()]\b|e|pi|(-?(?:\d+(?:\.\d)?|\.\d+|[+\-*/()])))?/g);
  const num2 = tokens.toString();
  const w1 = num2.split(",");
  const w = w1.filter(Boolean);

  const arr = ["+", "-", "/", "*", "^"];
  const len = w[w.length - 1];

  if (arr.includes(len)) {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return;
  }

  if (len == "(") {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return;
  }

  w.forEach((token, index) => {
    if (token === ")") {
      const next = w[index + 1];
      if (!isNaN(Number(next))) {
        if (Number(next) < 0) {
          var positiveNumber = Math.abs(next);
          w.splice(index + 1, 1);
          w.splice(index + 1, 0, "-");
          w.splice(index + 2, 0, positiveNumber)
        }
      }
    }
  });

  w.forEach((token) => {
    const keys = Object.keys(myobj);
    keys.map((key) => {
      if (token == key) {
        token = myobj[key];
      }
    });

    switch (token) {
      case "pi":
        token = 3.1415;
        break;

      case "e":
        token = 2.7182;
        break;
    }

    switch (true) {

      case !isNaN(parseFloat(token)):
        output.push(parseFloat(token));
        break;

      case token === '(':
        operatorStack.push(token);
        break;

      case token === ')':
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          output.push(operatorStack.pop());
        }
        operatorStack.pop();
        break;

      case isOperator(token):
        while (
          operatorStack.length > 0 &&
          precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)
        ) {
          output.push(operatorStack.pop());
        }
        operatorStack.push(token);
        break;
    }
  });

  while (operatorStack.length > 0) {
    output.push(operatorStack.pop());
  }


  const tokensi = output;
  evaluatePostfix(tokensi);
}

function evaluatePostfix(postfix) {
  const stack = [];

  postfix.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      stack.push(token);
    }

    else if (isOperator(token)) {
      if (token !== 'sin' && token !== 'cos' && token !== 'tan' && token !== 'sqrt') {
        if (stack.length < 0 && token == "-") {
          stack.push("-");
          var n = 1;
        }

        else {
          const operand2 = stack.pop();
          if (n == 1) {
            const operand4 = stack.pop();
            const operand3 = stack.pop();
            const operand1 = operand3 + operand4;
            const result = evaluateOperator(token, operand1, operand2);
            stack.push(result);
          }
          else {
            const operand1 = stack.pop();
            const result = evaluateOperator(token, operand1, operand2);
            stack.push(result);
          }
        }
      }

      else {
        const operand2 = stack.pop();
        const result = evaluateOperator(token, null, operand2);
        stack.push(result);
      }

    }
  });

  const poppedValue = stack.pop();
  const ans = document.getElementById('answer');

  if (poppedValue !== undefined && poppedValue !== "NaN") {
    ans.value = "Ans: " + poppedValue;
  }

  else {
    ans.value = "Invalid Input";
  }

}

function display() {
  const myElement = document.getElementById('bb1');
  const myElement1 = document.getElementById('c1');
  const myElement2 = document.getElementById('hh');
  myElement.style.display = 'flex';
  myElement1.style.display = 'none';
  myElement2.style.display = 'none';
}

function add() {
  const myElement3 = document.getElementById('d1');
  const myElement4 = document.getElementById('d2');


  if (myElement3.value == "pi" || myElement3.value == "e") {
    const myElement5 = document.getElementById('e2');
    myElement5.style.display = 'flex';
    return;
  }
  const myElement1 = document.getElementById('bb1');
  myElement1.style.display = 'none';
  const myElement2 = document.getElementById('c1');
  myElement2.style.display = 'grid';
  const myElement = document.getElementById('hh');
  myElement.style.display = 'flex';

  if (myElement3.value != "") {
    const myElement1 = document.getElementById('boxii');
    const myElement = document.getElementById('textInput1');
    myElement.value += myElement3.value + " ";
    myElement1.style.display = 'flex';
  }

  myobj[myElement3.value] = myElement4.value;
  myElement3.value = "";
  myElement4.value = "";
}

function remove() {
  const myElement1 = document.getElementById('bb1');
  myElement1.style.display = 'none';
  const myElement2 = document.getElementById('c1');
  myElement2.style.display = 'grid';
  const myElement = document.getElementById('hh');
  myElement.style.display = 'flex';
}

function removepopUP() {
  const myElement5 = document.getElementById('e2');
  myElement5.style.display = 'none';
}

function Optimize(value, arr, arr1, arr2, arr3, arr4, arr5,arr6) {
  const textInput = document.getElementById('textInput');
  const s = Array.from(textInput.value);

  const len = s[s.length - 1];

  switch (true) {
    case !arr.includes(value):
      textInput.value += value;
      const w = Array.from(textInput.value);
      const len1 = w.length - 1;

      if (arr4.includes(len)) {
        w.splice(len1, 0, "*")
      }

      const result = w.join('');
      textInput.value = result;
      break;

    case value === "(":
      textInput.value += value;
      const w1 = Array.from(textInput.value);
      if (arr1.includes(len)) {
        w1.splice(w1.length - 1, 0, "*")
      }
      const result1 = w1.join('');
      textInput.value = result1;
      break;

    case !(arr2.includes(value)) && arr3.includes(value):
      if (arr1.includes(len) || (!arr6.includes(len) && textInput.value !== "" && len !== "(")) {
        textInput.value += value;
        const w = Array.from(textInput.value);
        switch (value) {
          case "sqrt(":
            const len1 = w.length - 5;
            w.splice(len1, 0, "*")
            break;


          case "e":
            const len2 = w.length - 1;
            w.splice(len2, 0, "*")
            break;

          case "pi":
            const len3 = w.length - 2;
            w.splice(len3, 0, "*")
            break;
        }

        if (arr5.includes(value)) {
          const len4 = w.length - 4;
          w.splice(len4, 0, "*");
        }

        const result = w.join('');
        textInput.value = result;
        break;
      }

    default:
      textInput.value += value;
  }
}