"use strict";
// Phaser.GAMES[0].state.states.Login._gameObj.network.emitMessage
// e = Phaser.GAMES[0].state.states.Login._gameObj.network.emitMessage;Phaser.GAMES[0].state.states.Login._gameObj.network.emitMessage = function(a){console.log(a);return e.bind(Phaser.GAMES[0].state.states.Login._gameObj.network)(a)}
(async () => {
    const fetchJson = async (url, opts) => await (await fetch(url, opts)).json();
    const gameStatus = await fetchJson("https://api.prodigygame.com/game-api/status");
    const createAccount = async () => {
        const params = new URLSearchParams("data=%7B%22new%22%3Afalse%7D&equipment=%7B%22follow%22%3A19%2C%22hat%22%3A19%2C%22outfit%22%3A19%2C%22weapon%22%3A19%2C%22spellRelic%22%3Anull%2C%22boots%22%3A19%2C%22mount%22%3Anull%7D&pets=%5B%5D&inventory=%7B%22hat%22%3A%5B%5D%2C%22boots%22%3A%5B%5D%2C%22weapon%22%3A%5B%5D%2C%22outfit%22%3A%5B%5D%2C%22item%22%3A%5B%5D%2C%22fossil%22%3A%5B%5D%2C%22key%22%3A%5B%5D%2C%22relic%22%3A%5B%5D%2C%22currency%22%3A%5B%5D%2C%22follow%22%3A%5B%5D%2C%22mount%22%3A%5B%5D%2C%22spellRelic%22%3A%5B%5D%7D&appearance=%7B%22name%22%3A%7B%22first%22%3A44%2C%22middle%22%3A754%2C%22last%22%3A882%2C%22nick%22%3Anull%7D%2C%22gender%22%3A%22male%22%2C%22hair%22%3A%7B%22color%22%3A1%2C%22style%22%3A19%7D%2C%22skinColor%22%3A1%2C%22eyeColor%22%3A1%2C%22face%22%3A1%7D&grade=8&chosenGrade=8&curriculumTreeID=1&classCode=+&password=rrrr&first_name=penis&last_name=e&clientVersion=2-97-3");
        params.set("first_name", "_bobby_");
        params.set("last_name", "_");
        params.set("password", "bobby4life");
        params.set("chosenGrade", "1");
        params.set("grade", "1");
        params.set("classCode", "CAD2D6");
        const acc = await (await fetch("https://api.prodigygame.com/game-auth-api/v1/users", {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-mode": "cors",
            },
            referrer: "https://play.prodigygame.com/",
            referrerPolicy: "no-referrer-when-downgrade",
            body: params.toString(),
            method: "POST",
            mode: "cors",
        })).json();
        console.log(`Created account ${acc.username} with password ${acc.password}`);
        const login = await (await fetch("https://api.prodigygame.com/game-auth-api/v1/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: acc.username,
                password: acc.password,
                clientVersion: gameStatus.data.gameClientVersion,
            }),
        })).json();
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm9iYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtFQUFrRTtBQUNsRSwwT0FBME87QUFDMU8sQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNYLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQUUsSUFBOEIsRUFBRSxFQUFFLENBQ3ZFLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxNQUFNLFVBQVUsR0FFWixNQUFNLFNBQVMsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sYUFBYSxHQUFHLEtBQUssSUFBSSxFQUFFO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUNqQyxzMkJBQXMyQixDQUN0MkIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FDakIsTUFBTSxLQUFLLENBQUMsb0RBQW9ELEVBQUU7WUFDakUsT0FBTyxFQUFFO2dCQUNSLGNBQWMsRUFDYixrREFBa0Q7Z0JBQ25ELGdCQUFnQixFQUFFLE1BQU07YUFDeEI7WUFDRCxRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLGNBQWMsRUFBRSw0QkFBNEI7WUFDNUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDdkIsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsTUFBTTtTQUNaLENBQUMsQ0FDRixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FDVixtQkFBbUIsR0FBRyxDQUFDLFFBQVEsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FDL0QsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FDbkIsTUFBTSxLQUFLLENBQUMsb0RBQW9ELEVBQUU7WUFDakUsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFLGtCQUFrQjthQUNsQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNwQixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDdEIsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCO2FBQ2hELENBQUM7U0FDRixDQUFDLENBQ0YsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNWLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUMifQ==