// Thank you for using my cheat menu :) ~ In The works
var style = document.createElement('style');
style.innerHTML = '.hide {display: none;}';
document.head.appendChild(style);

var div = document.createElement('div');
var id = document.createAttribute("id");
id.value = 'menu';
div.setAttributeNode(id);

id = document.createAttribute("style");
id.value = 'dysplay:none; position: absolute; left: 12.7%; z-index: 10; background-color: purple;';
div.setAttributeNode(id);
