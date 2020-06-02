const setCurrency = (id, value) => {
    let config = "currency";
    let x = hack.player.backpack.data[config]; // shorten things
    let i = x.findIndex(v => v.ID === id); // find index if it exists
    
    if (i === -1) x.push({N: value, ID: id}) // if it doesn't, push
    else x[i] = {N: value, ID: id} // if it does, modify it
}

/** Possible config values:
 * boots: []
 * currency: []
 * follow: []
 * fossil: []
 * hat: []
 * item: []
 * key: []
 * mount: []
 * outfit: []
 * relic: []
 * spellRelic: []
 * weapon: []
 **/
 
 /** Usage of setCurrency(id, value)
  * setCurrency(1, 999);
  * setCurrency(5, 420);
  * setCurrency(16, 42);
  * setCurrency(4, 10000);
  **/
