const { make } = require("./util/dom");

const div = make`div`;
div.innerText = "test";

document.body.append(div);
