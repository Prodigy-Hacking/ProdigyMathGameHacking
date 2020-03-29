import { login } from "./utils/api";
import { Swal } from "./utils/swal";

(async () => {
	if (!(await login()))
		await Swal.fire(
			"Invalid Credentials",
			"The username or password was incorrect.",
			"error"
		),
			location.reload();
	else
		await Swal.fire(
			"Logged in!",
			"You have successfully logged in.",
			"success"
		);
})();
