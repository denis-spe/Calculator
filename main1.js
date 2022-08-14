/*
* Script for Calculator.
* ======================
**/

// Get the input box by id ...........
const inputBox = document.getElementById("input-box");

// Window Listener ..............
window.addEventListener('DOMContentLoaded', 
() => {
  
  // Select all the input button on the page.
  document.querySelectorAll("input[type=button]").forEach(button => {
    
    // On click callback ..............
    button.onclick = () => {
      
      // Enable focus on each click.
      inputBox.focus()
      if (button.dataset.num === undefined){
        // if the button doesn't have num dataset.
        inputBox.value += button.dataset.sign;

      }
      else{
        // else it has a num dataset.
        inputBox.value += button.dataset.num;

      }
      
      // Make a clear button ********
      if (button.value === "C"){
        // clear the input box.
        inputBox.value = "";

        // Go back to the default font size.
        inputBox.style.fontSize = "40px";
      }
    }
  })
  
  // Get the equal button by id ............
  document.getElementById("equal-sign").onclick = function(){
    
    // Get the output from the input box.
    var output = inputBox.value;
    
    // Replace some sign in output.
    output = output.replace("÷", "/").replace("x", "*").replace(",", ".");

    // Change the % to percent.

    // Instantiate the Regex instance.
    var re = new RegExp(/(\d*%)/g);

    // Declare a match.
    var match;

    do{
      try{
        // Extract the match from the output.
        match = re.exec(output);

        // Compute the percentage.
        var percent = (eval(match[0].replace('%', '') + "/100"));

        // Replace any string values which starts with digits and ends with %.
        output = output.replace(match[0], percent)

        console.log(output);

      }catch(TypeError){
      }

    }while(match)
    console.log(output.length)
    
    // Compute the output in the input box.
    var compute = eval(output);
    
    // Change the compute to string.
    compute = compute.toString();
    
    
    // Replace back '.' to ','
    compute = compute.replace('.', ',');

    if (compute.length > 7){
      inputBox.style.fontSize = '20px';
    }
    

    // Insert the results to the input box.
    inputBox.value = compute;
    
    // Enable focus on input box.
    inputBox.focus()
  }
})
