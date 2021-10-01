module.exports = {
    make: name => document.createElement(name),
    makeDiv: _ => make`div`,
    button: _ => make`button`
    
}