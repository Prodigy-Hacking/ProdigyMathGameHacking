// Copy and paste this whole thing into prodigy console, then wait 3 seconds and BOOM seizure death!!!

// Load the hack in
Load_Seizure = false;
if (Load_Seizure == true) {
    // Load seizure Inactive
} else { 
    // Start loading process
    setTimeout(() => {  console.log("Hacking.. 25% complete!"); }, 1000);
}
Loading = false;
if (Loading == true) {
    // Stop Loading
} else {
    setTimeout(() => {  console.log("Hacking.. 50% complete!"); }, 2000);
}

// Make button appear
button = false;
if (button == true) {
  // Seizure hack false
} else {
    setTimeout(() => {  console.log("Hack Complete!"); }, 3000);
    setTimeout(function () {
        var txt="Flop Like A Fish Bitch"
        document.write("" + txt.fontcolor ("green") + "</p>");
   }, 3000);
}

// Make it stylish
    setInterval(function () {
        document.body.style.background = "white";
        setTimeout(function () { document.body.style.background = "black" }, 100);
    }, 200);
