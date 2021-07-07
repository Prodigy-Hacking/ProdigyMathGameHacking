(async() => {
    function set(key, value) {
        chrome.storage.local.set({ [key]: value });
    }
    function get(key) {
        return new Promise(resolve => {
            chrome.storage.local.get([key], result => {
                resolve(result[key]);
            });
        });
    }
    
    const urlTextbox = document.querySelector("#url");
    const checkbox = document.querySelector("#check");
    const passwordTextbox = document.querySelector("#gatekeeper");
    const submitButton = document.querySelector("#submit");
    const resultText = document.querySelector("#result");

    urlTextbox.value = await get("url") || "http://localhost:1337/";
    checkbox.checked = await get("checked") || false;
    passwordTextbox.value = "";

    passwordTextbox.addEventListener("keyup", (event) => {
        console.log(event);

        passwordTextbox.style.backgroundColor = (event.target.value === "nootnoot")? "aquamarine" : "pink";

        // 13 is Enter
        if (event.keyCode === 13) {
            submitButton.click();
        }
    });

    submitButton.addEventListener("click", async () => {
        if (passwordTextbox.value !== "nootnoot") {
            resultText.textContent = "The password was typed incorrectly!";
        } else {
            resultText.textContent = `Saved ${new Date().toISOString()}. I hope you know what you're doing.`;

            chrome.storage.local.set({
                url: urlTextbox.value,
                checked: checkbox.checked
            });
        }
    });
})()