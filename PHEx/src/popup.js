(async() => {
    function set(key, value) {
        chrome.storage.sync.set({ [key]: value })
    };
    function get(key) {
        return new Promise(resolve => {
            chrome.storage.sync.get([key], result => {
                resolve(result[key])
            })
        })
    };
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
        }
    const checkbox = document.querySelector(".check")
    const input = document.querySelector("input")
    input.value = await get("url") || ""
    checkbox.checked = await get("checked") || false
    checkbox.addEventListener("click", () => {
        set("checked", checkbox.checked)
        if (checkbox.checked) {
            if (validURL(input.value)) {
                set("url", input.value)
            } else {
                document.querySelector("p").innerHTML = "Invalid URL"
                input.onchange = () => {
                    document.querySelector("p").innerHTML = ""
                }
                checkbox.checked = false;
            }
        }
    })
})()