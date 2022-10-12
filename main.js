// Shortcut for console.log and assert.
let {log} = console;
let {assert} = console;

// Instantiate boxInput 
var boxInput = document.querySelector('#input-box');

var userInput = "";
var result = "";
var finalOutPut = "";

// 
document.addEventListener('DOMContentLoaded',
() => {
  var buttons = document.querySelectorAll('input[type=button');
  
  boxInput.autofocus = 'true';
  
  // for each button
  buttons.forEach(btn => {
    btn.onclick = function(){
      if (!isNaN(this.dataset.num)){
        if (finalOutPut){
          finalOutPut += this.dataset.num;
          boxInput.value = finalOutPut;
        }
        
        else{
          userInput += this.dataset.num;
          boxInput.focus();
          boxInput.value = userInput.replace("/100", "%").replace("/", '÷').replace("*", 'x');
        }
        
      }
      
      if (btn.value === "C"){
        userInput = "";
        finalOutPut = "";
        document.querySelector('.result').innerHTML = "";
        boxInput.value = userInput;
        boxInput.focus();
      }
      
      
      signCallback = (sign) => {
        if (btn.value == sign){
          if (finalOutPut){
            
            finalOutPut = finalOutPut + sign;
            boxInput.value = finalOutPut.replace("/100", "%");
            boxInput.focus();
          }
          else{
            userInput = userInput + sign;
            boxInput.value = userInput.replace("/100", "%");
            boxInput.focus();
          }
          /*if (btn.value == "%"){
            percentSign(boxInput.value);
          }*/
        }
      }
      
      // Call the sign callback
      signCallback("+");
      signCallback("-")
      signCallback("÷")
      signCallback("x")
      signCallback("%")
      
      if (btn.value == "="){
        
        if (finalOutPut){
          finalOutPut = finalOutPut.replace("÷", "/").replace("x", '*').replace("%", "/100");
          //finalOutPut = percentSign(finalOutPut);
          //log(finalOutPut);
          
          finalOutPut = eval(finalOutPut);
          
          userInput = finalOutPut;
          boxInput.value = finalOutPut;
          finalOutPut = "";
          document.querySelector('.result').innerHTML = "";
        }
        else{
          // save the final output
          finalOutPut = eval(userInput);
          // put the final output to the input box
          userInput = eval(userInput);
          boxInput.value = userInput;
          document.querySelector('.result').innerHTML = "";
          userInput = "";
        }
        
        
      }
      
      if (userInput.match(/\d+[+-÷x%]\d+/g)){
        userInput = userInput.replace("÷", "/").replace('x', "*").replace("%", "/100");
        if (/[+*\/]/g.test(userInput)){
          // Display the results if sign in useInput.
          document.querySelector('.result').innerHTML = eval(userInput);
        }
      }
      if (userInput.match(/\d+[%]/g)){
        // Replace modulus sign to /100.
        userInput = userInput.replace("%", "/100");
        
        document.querySelector('.result').innerHTML = eval(userInput);
      }
      
      
      if (finalOutPut.match(/\d+[+-÷x]\d+/g)){
        document.querySelector('.result').innerHTML = eval(finalOutPut);
      }
    }
 })
})













/*********** Glory Be To God ******/
