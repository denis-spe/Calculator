window.onkeydown = function (e){
  return false;
}

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
      }
    }
  })
  
  // Get the equal button by id ............
  document.getElementById("equal-sign").onclick = function(){
    
    // Get the output from the input box.
    var output = inputBox.value;
    
    // Replace some sign in output.
    output = output.replace("÷", "/").replace("x", "*").replace(",", ".");
    
    // Compute the output in the input box.
    var compute = eval(output);
    
    // Change the compute to string.
    compute = compute.toString();
    
    
    // Replace back '.' to ','
    compute = compute.replace('.', ',');
    
    // Insert the results to the input box.
    inputBox.value = compute;
    
    // Enable focus on input box.
    inputBox.focus()
  }
})
