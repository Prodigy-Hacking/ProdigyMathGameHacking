import make from "./util/dom"

if (globalThis.oldg === undefined) {
    globalThis.oldg = {};

    document.body.append(make("button"));
}
