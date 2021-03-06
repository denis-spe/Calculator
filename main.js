// Instantiate boxInput 
var boxInput = document.querySelector('#input-box');

var userInput = "";
var result = "";
var finalOutPut = "";

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
          boxInput.autofocus = true;
          boxInput.value = userInput;
        }
        
      }
      
      if (btn.value === "C"){
        userInput = "";
        finalOutPut = "";
        document.querySelector('.result').innerHTML = "";
        boxInput.value = userInput;
      }
      
      if (btn.value == '+'){
        if (finalOutPut){
          finalOutPut = finalOutPut + "+"
          boxInput.value = finalOutPut;
        }
        else{
          userInput = userInput + "+";
          boxInput.value = userInput;
        }
      }
      
      if (btn.value == "="){
        
        if (finalOutPut){
          userInput = eval(finalOutPut)
          boxInput.value = eval(finalOutPut);
          finalOutPut = "";
          document.querySelector('.result').innerHTML = "";
        }
        else{
          // save the final output
          finalOutPut = eval(userInput);
          // put the final output to the input box
          boxInput.value = eval(userInput);
          document.querySelector('.result').innerHTML = "";
          userInput = "";
        }
        
        
      }
      
      if (userInput.match(/\d+[+]\d+/g)){
        document.querySelector('.result').innerHTML = eval(userInput);
      }
      
      if (finalOutPut.match(/\d+[+]\d+/g)){
        document.querySelector('.result').innerHTML = eval(finalOutPut);
      }
    }
 })
})














