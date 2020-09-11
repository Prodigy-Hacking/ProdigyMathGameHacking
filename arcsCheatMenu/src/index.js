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
        let aboutbutton = document.createElement('button')
        aboutbutton.innerText = 'About'
        aboutbutton.style.font = 'bold 20px Arvo'
        aboutbutton.style.transition = 'all 0.3s'
        aboutbutton.style.borderRadius = '10px'
        aboutbutton.onclick = function () {
           swal('Hello there!',"This menu was made for people who have issues with our redirect hack. Because although limited, script based hacks (hacks without redirector) still do exist.",'https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/arcsCheatMenu/src/assets/prodlogo.png')
        }
        aboutbutton.style.background = "#292525"
        div.append(aboutbutton)
        aboutbutton.onmouseover = function () {
            aboutbutton.style.background = '#CDCDCD'
        }
        aboutbutton.onmouseout = function () {
            aboutbutton.style.background = '#292525'
        }
        let level100button = document.createElement('button')
        level100button.innerText = 'Set level'
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
        let goldbutton = document.createElement('button')
        goldbutton.innerText = 'Set gold'
        goldbutton.style.font = 'bold 20px Arvo'
        goldbutton.style.transition = 'all 0.3s'
        goldbutton.style.borderRadius = '10px'
        goldbutton.onclick = function () {
            swal("How much gold would you like?",'','info', {
                content: "input",
            })
                .then((value) => {
                   if(value){
                    modifyData(`playerdata.data.gold = ${value}`)
                    swal('Success.', 'Your gold has been added.', 'success')
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
        goldbutton.style.background = "#292525"
        div.append(goldbutton)
        goldbutton.onmouseover = function () {
            goldbutton.style.background = '#CDCDCD'
        }
        goldbutton.onmouseout = function () {
            goldbutton.style.background = '#292525'
        }
        let running = false
        let arbutton = document.createElement('button')
        arbutton.innerText = 'Get Arena Points'
        arbutton.style.font = 'bold 20px Arvo'
        arbutton.style.transition = 'all 0.3s'
        arbutton.style.borderRadius = '10px'
        arbutton.onclick = async function () {
            if(!running){
            setInterval(async function(){
                function parseJwt(token){var base64Url=token.split('.')[1];var base64=base64Url.replace(/-/g,'+').replace(/_/g,'/');var jsonPayload=decodeURIComponent(atob(base64).split('').map(function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''));return JSON.parse(jsonPayload)};
                let userID=parseJwt(localStorage.JWT_TOKEN).content.userID
                let arenaseason=await(await fetch(`https://api.prodigygame.com/leaderboard-api/user/${userID}/init?userID=${userID}`,{method:'GET',credentials:'same-origin',headers:{'Authorization':localStorage.JWT_TOKEN,},})).json();arenaseason=arenaseason.seasonID
                fetch(("https://api.prodigygame.com/leaderboard-api/season/"+arenaseason+"/user/"+userID+"/pvp?userID="+userID),{headers:{"authorization":localStorage.JWT_TOKEN,"content-type":"application/x-www-form-urlencoded; charset=UTF-8","sec-fetch-mode":"cors"},referrer:"https://play.prodigygame.com/",referrerPolicy:"no-referrer-when-downgrade",body:("seasonID="+arenaseason+"&action=win"),method:"POST",mode:"cors"}).then(v=>v.text()).then(v=>console.log(v))
                            },60500)
                           swal('Arena Points are being added',"Notes: This doesn't require a reload\nDon't run this more then once, it will go forever\nYou get arena points once every minute.",'success')
                           running = true;
        }else{
            swal('You already have Arena Points running.','Reload to disable them.','error')
        }
        }
        arbutton.style.background = "#292525"
        div.append(arbutton)
        arbutton.onmouseover = function () {
            arbutton.style.background = '#CDCDCD'
        }
        arbutton.onmouseout = function () {
            arbutton.style.background = '#292525'
        }
    
    })()
