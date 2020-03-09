// Partial credit goes to @RubberDuck55, I guess we don't need to hide customchat anymore.
// This pushes a new message to Prodigy's message filter thingy. Now you can type in this message, and it should show up.
// Not fully sure if this actually shows up on other computers though....

PIXI.game.prodigy.chat.phrases.push(prompt("What would you like to say?"));

// Bookmarklet:
javascript:PIXI.game.prodigy.chat.phrases.push(prompt(%22What%20would%20you%20like%20to%20say%3F%22))%3Bvoid+0
