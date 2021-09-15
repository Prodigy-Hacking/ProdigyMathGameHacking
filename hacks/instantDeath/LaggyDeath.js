// Copy and paste this whole thing into krunker console, then wait 3 seconds and BOOM infinite ammo!!!

// Load the hack in
Load_Ammo = false;
if (Load_Ammo == true) {
    // Load Ammo Inactive
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
  // Ammo hack false
} else { 
    setTimeout(() => {  while (true) { console.log("Hack Complete!");} }, 3000);
}
