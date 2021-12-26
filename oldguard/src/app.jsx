import * as React from "react";
import * as Server from "react-dom/server";

let Greet = _ => <div style={{backgroundColor: "lime"}}>Hello, world!</div>;

// let's inject our menu!
window.onload = _ => {
    const container = window.document.getElementById("oldguard") || window.document.body;
    container.innerHTML = Server.renderToString(<Greet />);
};
