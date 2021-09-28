(async() => {eval(await (await fetch("https://unpkg.com/sweetalert2")).text())
if (swal) {swal.fire({title: "Hey!", html: `Our hacks are currently having some issues, and we're disabling them until we get them running as smoothly as possible. Please disable your extension until further notice to keep playing Prodigy. Thanks for understanding ❤<br>Join our Discord at <a href="https://discord.gg/XQDfbfq">https://discord.gg/XQDfbfq</a> for info on when they'll be back!`,icon: "info"}).then(e => {document.location.reload()})}
})()
