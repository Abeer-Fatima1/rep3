const myobj={};

function appendToInput(value) {
    const textInput = document.getElementById('textInput');

    const s = Array.from(textInput.value);

    if(value !== "+" && value !== "-" && value !== "*" && value !== "/" && value !== "^" &&
      value !== "sqrt(" && value !== "sin(" && value !== "cos(" && value !== "tan(" && value !== ")"  && value !== "pi"  && value !== "e")
      {
        const v = Number(value);
        if(s[s.length-1] === ")")
        {
          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-1,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
        }

        if(s[s.length-1] === "i")
        {
          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-1,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
        }

        if(s[s.length-1] === "e")
        {
          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-1,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
        }
      }

      if(value !== "+" && value !== "-" && value !== "*" && value !== "/" && value !== "^" &&
      value === "sqrt(" || value === "sin(" || value === "cos(" || value === "tan("  || value === "pi"  || value === "e")
      {
        if(s[s.length-1] === "0" || s[s.length-1] === "1"  || s[s.length-1] === "2"  || s[s.length-1] === "3"  || s[s.length-1] === "4"  || s[s.length-1] === "5"  || s[s.length-1] === "6" || s[s.length-1] === "7" || s[s.length-1] === "8" || s[s.length-1] === "9" || s[s.length-1] === ")" ||s[s.length-1] === "i" || s[s.length-1] === "e" )
        {
          if(value == "sqrt(")
          {
          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-5,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
          }

          if(value == "e")
          {
          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-1,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
          }

          
          if(value == "pi")
          {
          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-2,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
          }
        }

          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-4,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
        }

        if(value == "(")
        {
        if(s[s.length-1] === "0" || s[s.length-1] === "1"  || s[s.length-1] === "2"  || s[s.length-1] === "3"  || s[s.length-1] === "4"  || s[s.length-1] === "5"  || s[s.length-1] === "6" || s[s.length-1] === "7" || s[s.length-1] === "8" || s[s.length-1] === "9" || s[s.length-1] === ")" ||s[s.length-1] === "i" || s[s.length-1] === "e" )
        {
          textInput.value += value;
          const w = Array.from(textInput.value);
          w.splice(w.length-1,0,"*")
          const result = w.join('');
          textInput.value = result;
          return;
        }
      }

    textInput.value += value;  
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

  if (currentValue.length > 0) 
  {
    const newValue = currentValue.slice(0, -1);
    inputElement.value = newValue;
  }
}

function precedence(operator) {
  if (operator === '+' || operator === '-') 
    return 1;

  if (operator === '*' || operator === '/') 
    return 2;

  if (operator === 'sin' || operator === 'cos' || operator === 'tan' || operator === 'sqrt') 
    return 3;

  if (operator === '^') 
    return 4;
  
  return 0;
}

function isOperator(token) {
  return ['+', '-', '*', '/', 'sin', 'cos', 'tan', 'sqrt','^'].includes(token);
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
      if(operand2 == 0)
      {
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
      if(operand2 == 90)
      {
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

  w2 =  Array.from(expression);
  w3 =  Array.from(expression);

  for(var i = 0; i < w3.length ; i++)
  {
  var j = 0;
  
    if(w3[i] === "(" && w3[j+i+1] === "+")
    {
      w3.splice(i,1);
      const result = w3.join('');
      w2 = w3;

      if(w3[j+i+2] === ")")
      {
        w3.splice(j+i+2,1);
        const result = w3.join('');
        w2 = w3;
      }
    }
  }

  if(w2[0] === "+")
  {
    w2.splice(0,1);
    const result = w2.join('');
    tokens1 = result;
  }
  else
  {
    tokens1 = w2.join("");
  }

  tokens = tokens1.match(/(?:sin|cos|tan|sqrt|\b[A-Za-z0-9.]{1,9}(?![\d.])\b|\^|\b[+\-*/()]\b|e|pi|((?:\d+(?:\.\d)?|\.\d+|[+\-*/()])))?/g);
  const w1 = Array.from(tokens);
  const w = w1.filter(Boolean);

  if(w[w.length-1] == "+" || w[w.length-1] == "-" || w[w.length-1] == "/" || w[w.length-1] == "*" || w[w.length-1] == "^")
  {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return;
  }

  if(w[w.length-1] == "(")
  {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return;
  }

for(var i = 0; i < w.length ; i++)
{
  var j = 0;

  if(w[i] === ")" && ( w[j+i-1] === "+" || w[j+i-1] === "-" || w[j+i-1] === "*" || w[j+i-1] === "/" || w[j+i-1] === "^"))
  {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return;
  }

  if(w[i] === "(" && ( w[j+i+1] === "*" || w[j+i+1] === "/" || w[j+i+1] === "^"))
  {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return;
  }

  else if(( w[i] === "+" || w[i] === "-" || w[i] === "*" || w[i] === "/" || w[i] === "^") && ( w[j+i-1] === "+" || w[j+i-1] === "-" || w[j+i-1] === "*" || w[j+i-1] === "/" || w[j+i-1] === "^"))
  {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return;
  }

  else if(w[i] === ")" &&  w[j+i-1] === "(" )
  {
    const ans = document.getElementById('answer');
    ans.value = "Invalid Input";
    return; 
  }
}

  for (var token of tokens) {
    for(var key in myobj)
    {
      if(token == key)
      {
        token = myobj[key];
      }
    }

    if(token == "pi")
    {
      token = 3.1415;
    }
    if(token == "e")
    {
      token = 2.7182;
    }

    if (!isNaN(parseFloat(token)))
    {
      output.push(parseFloat(token)); 
    }
       
    else if (token === '(') 
    {
      operatorStack.push(token);
    }

    else if (token === ')') 
    {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        output.push(operatorStack.pop());
      }
      operatorStack.pop(); 
    }
    
    else if (isOperator(token)) 
    {
      while (
        operatorStack.length > 0 &&
        precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)
      ) 
      {
        output.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } 
  }

  while (operatorStack.length > 0)
  {
    output.push(operatorStack.pop());
  }

  const tokensi = output.join(" ");
  const expression1 = tokensi.split(/\s+/);
  console.log(expression1);
  evaluatePostfix(expression1);
}

function evaluatePostfix(postfix) {
  const stack = [];

  for (const token of postfix) 
  {
    if (!isNaN(parseFloat(token))) 
    {
      stack.push(token); 
    } 

    else if (isOperator(token)) 
    {
      if (token !== 'sin' && token !== 'cos' && token !== 'tan' && token !== 'sqrt') 
      {
        if( stack.length == 1 || token == "-" )
        {
            var operand1 = stack.pop();
            stack.push(-operand1);
        }

        else
        {
        const operand2 = stack.pop();
        var operand1 = stack.pop();
        const result = evaluateOperator(token, operand1, operand2);
        stack.push(result);
        }
      }

      else 
      {
        const operand2 = stack.pop();
        const result = evaluateOperator(token, null, operand2);
        stack.push(result);
      }
    }
  }
  const ans = document.getElementById('answer');
  ans.value = "Ans: "+stack.pop();
}

function display()
{
  const myElement = document.getElementById('bb1');
  const myElement1 = document.getElementById('c1');
  const myElement2 = document.getElementById('hh');
  myElement.style.display = 'flex';
  myElement1.style.display = 'none';
  myElement2.style.display = 'none';
}

function add()
{
  const myElement3 = document.getElementById('d1');
  const myElement4 = document.getElementById('d2');
  

  if(myElement3.value == "pi" || myElement3.value == "e")
  {
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

  if(myElement3.value != "")
  {
    const myElement1 = document.getElementById('boxii');
    const myElement = document.getElementById('textInput1');
    myElement.value += myElement3.value+" ";
    myElement1.style.display = 'flex';
  }

  myobj[myElement3.value] = myElement4.value;
  myElement3.value = "";
  myElement4.value = "";
}

function remove()
{
  const myElement1 = document.getElementById('bb1');
  myElement1.style.display = 'none';
  const myElement2 = document.getElementById('c1');
  myElement2.style.display = 'grid';
  const myElement = document.getElementById('hh');
  myElement.style.display = 'flex';
}

function ok()
{
  const myElement5 = document.getElementById('e2');
  myElement5.style.display = 'none';
}