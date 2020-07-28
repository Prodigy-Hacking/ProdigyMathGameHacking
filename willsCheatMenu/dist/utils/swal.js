var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "sweetalert2"], function (require, exports, sweetalert2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Confirm = exports.Toast = exports.NumberInput = exports.Input = exports.Swal = void 0;
    sweetalert2_1 = __importDefault(sweetalert2_1);
    exports.Swal = sweetalert2_1.default;
    exports.Input = exports.Swal.mixin({
        input: "text",
        showCancelButton: true,
        showConfirmButton: true,
    });
    exports.NumberInput = exports.Input.mixin({
        input: "number",
    });
    exports.Toast = exports.Swal.mixin({
        toast: true,
        position: "bottom",
    });
    exports.Confirm = exports.Swal.mixin({
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
    });
});
//# sourceMappingURL=swal.js.map