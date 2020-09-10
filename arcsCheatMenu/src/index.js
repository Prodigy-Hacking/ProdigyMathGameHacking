(async () => {
    const swal = require('sweetalert')
    const fetch = require('node-fetch')
    const fs = require('fs')
    const modifyData = require('./utils/modifyData').modifyData
    const div = document.createElement("div")
    div.style.position = "fixed"
    div.style.top = "-200px"
    div.style.background = "black"
    div.style.height = "200px"
    div.style.opacity = 0.90
    div.style.zIndex = 100
    div.style.width = "2000px"
    div.style.zIndex = "10000"
    div.style.transition = "top 0.35s"
    document.body.prepend(div)
    const toggler = document.createElement('button')
    toggler.innerText = "▼"
    toggler.style.position = "fixed"
    toggler.style.zIndex = Number.MAX_SAFE_INTEGER
    toggler.style.background = "black"
    toggler.style.color = "white"
    let invisible = true
    document.body.prepend(toggler)
    toggler.onclick = function () {
        if (invisible) {
            toggler.innerText = "▲"
            div.style.top = "0px"
            invisible = false
        } else {
            toggler.innerText = "▼"
            div.style.top = "-200px"
            invisible = true
        }
    }
    let title1 = document.createElement('h1')
    title1.innerText = "Arc's Non-Redirect Cheat Menu"
    title1.style.font = 'bold 30px Arvo'
    div.append(title1)
    const title2 = document.createElement('h1')
    title2.innerText = 'Hacks:'
    title2.style.font = 'bold 40px Arvo'
    div.append(title2)
    let level100button = document.createElement('button')
    level100button.innerText = 'Level 100'
    level100button.style.font = 'bold 20px Arvo'
    level100button.style.transition = 'all 0.3s'
    level100button.style.borderRadius = '10px'
    level100button.onclick = function () {
        swal("What level would you like to be?",'','info', {
            content: "input",
        })
            .then((value) => {
               if(value){
                modifyData(`playerdata.data.level = ${value}`)
                swal('Success.', 'Your level has been applied.', 'success')
                .then((value) => {
                    swal("Would you like to reload?", 'If not, press Esc.', 'info')
                    .then((value) => {
                        if (!value) return;
                        document.location.href = document.location.href
                    });
                })
            }
            })
    }
    level100button.style.background = "#292525"
    div.append(level100button)
    level100button.onmouseover = function () {
        level100button.style.background = '#CDCDCD'
    }
    level100button.onmouseout = function () {
        level100button.style.background = '#292525'
    }

})()