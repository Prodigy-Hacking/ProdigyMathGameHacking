import Swal from "sweetalert2";
import make from "./util/dom"

if (globalThis.oldg === undefined) {
    globalThis.Swal = Swal;
    globalThis.oldg = {};

    document.body.append(make("button"));
}
