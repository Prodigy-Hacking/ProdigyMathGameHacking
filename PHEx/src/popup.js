function set(key, value) {
    chrome.storage.local.set({ [key]: value })
}

function get(key) {
    return new Promise(resolve => {
        chrome.storage.local.get([key], result => {
            resolve(result[key])
        })
    })
}

function validURL(str) {
    try {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i') // fragment locator
        return !!pattern.test(str) || new URL(str).hostname === "localhost"
    } catch {
        return false
    }
}

const developerForm = document.querySelector("form#dev")
const revealButton = document.getElementById("reveal-button")
const checkbox = document.querySelector("input#checkbox")
const pnpUrl = document.querySelector("input#pnp-url")
const alert = document.getElementById("alert")
const closeButton = document.getElementById("close-button")

revealButton.addEventListener("click", () => {
    if (developerForm.classList.length === 1) {
        developerForm.classList.remove("hidden")
    } else {
        developerForm.classList.add("hidden")
    }
})

checkbox.addEventListener("change", () => {
    if (!validURL(pnpUrl.value)) {
        if (checkbox.checked) {
            alert.classList.remove("hidden")
        } else {
            alert.classList.add("hidden")
        }
        checkbox.checked = false
        set("url", "")
        set("checked", false)
        return
    }
    set("url", pnpUrl.value)
    set("checked", checkbox.checked)
})

closeButton.addEventListener("click", () => {
    alert.classList.add("hidden")
})
