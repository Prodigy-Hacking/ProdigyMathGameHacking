from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from discord.ext import commands
import time, os, discord, threading

client = commands.Bot(command_prefix='!')

@client.event
async def on_ready():
    print(f"Logged in as {client.user}")
    await client.change_presence(activity=discord.Game(
        name=f"{str(client.user).split('#')[0]} | !help"))

@client.event
async def on_message(message):
    if str(message.channel.type) != "private" and str(message.content).startswith("!"):
        await message.channel.send("Please DM the bot.")
    await client.process_commands(message)

def _gold(username, password, gold):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_extension("./extension (1).zip")
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=chrome_options)

    driver.get('https://sso.prodigygame.com/game/login?rid=c5884060-d4c7-495d-a8b3-7658d7921a0d')
    driver.find_element_by_id("unauthenticated_game_login_form_username").send_keys(username)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(password)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(Keys.ENTER)
    time.sleep(30)
    print("Script!")
    driver.execute_script(f"""
_.player.data.gold = {gold}
""")
    time.sleep(5)
    driver.quit()

def _level(username, password, level):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_extension("./extension (1).zip")
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=chrome_options)

    driver.get('https://sso.prodigygame.com/game/login?rid=c5884060-d4c7-495d-a8b3-7658d7921a0d')
    driver.find_element_by_id("unauthenticated_game_login_form_username").send_keys(username)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(password)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(Keys.ENTER)
    time.sleep(30)
    print("Script!")
    driver.execute_script(f"""
const i = {level} - 2;
// xpConstant from 3-16-1.js:8528
const xpConstant = 1.042;
_.player.data.stars = Math.round((1 - Math.pow(xpConstant, i)) / (1 - xpConstant) * 20 + 10);

_.player.data.level = +{level};
_.player.getLevel = () => _.player.data.level;
_.player.forceSaveCharacter()
""")
    time.sleep(5)
    driver.quit()

def _items(username, password):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_extension("./extension (1).zip")
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=chrome_options)

    driver.get('https://sso.prodigygame.com/game/login?rid=c5884060-d4c7-495d-a8b3-7658d7921a0d')
    driver.find_element_by_id("unauthenticated_game_login_form_username").send_keys(username)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(password)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(Keys.ENTER)
    time.sleep(30)
    print("Script!")
    driver.execute_script("""
//> Item stacker hack
//>> Gives all armor, hats, boots, currencies, etc.
(() => {
    // FMI: every time prodigy patches, update scopeObj.
    const scopeObj = _.instance;
    const playerObject = _.player;
    
    // Do not modify.
    const bootData = scopeObj.game.state.states.Boot._gameData;
    const backpackData = playerObject.backpack.data;
    
    playerObject.data.gold = playerObject.data.stars = playerObject.data.bountyScore = playerObject.data.level = 1e69;

    // All equipment
    let categories = ["boots", "follow", "fossil", "hat", "key", "mathTownFrame", "mathTownInterior", "outfit", "relic", "spellRelic", "weapon"];
    for (let category of categories) {
        backpackData[category] = [];

        for (let item in bootData[category]) {
            backpackData[category][item] = {"ID": bootData[category][item].ID};
        }
    }

    // Special cases
    // Currency
    backpackData.currency = [];
    for (let i in bootData.currency) {
        backpackData.currency[i] = {"ID": bootData.currency[i].ID, "N": 99999999};
    }

    // All items
    backpackData.item=[];
    for (let i in bootData.item) {
        backpackData.item[i] = {"ID": bootData.item[i].ID, "N": 99999999};
    }

    // Furniture
    playerObject.house.data.items = []
    for (let i in bootData.dorm) {
        playerObject.house.data.items[bootData.dorm[i]["ID"]] = {A: [], N: 999};
    }
    
    // Remove bounty notes (#229)
    let bountyIndex = _.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86)
    while (bountyIndex > -1) _.player.backpack.data.item.splice(bountyIndex, 1)
})();
    """)
    time.sleep(5)
    driver.quit()

def _pets(username, password):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_extension("./extension (1).zip")
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=chrome_options)

    driver.get('https://sso.prodigygame.com/game/login?rid=c5884060-d4c7-495d-a8b3-7658d7921a0d')
    driver.find_element_by_id("unauthenticated_game_login_form_username").send_keys(username)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(password)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(Keys.ENTER)
    time.sleep(30)
    print("Script!")
    driver.find_element_by_id("menu-toggler").click()
    driver.find_element_by_xpath("/html/body/div[2]/div[1]/div[1]/div[4]/button[1]").click()
    time.sleep(5)
    driver.quit()

@client.command()
async def gold(ctx, username, password, gold):
    """
    Give user gold.
    """
    t = threading.Thread(name="Gold",target=_gold, args=(username, password, gold))
    t.start()
    t.join()
    await ctx.send(f"You now have {gold} gold.")

@client.command()
async def level(ctx, username, password, level):
    """
    Change user level.
    """
    t = threading.Thread(name="level",target=_level, args=(username, password, level))
    t.start()
    t.join()
    await ctx.send(f"You are now at level {level}.")

@client.command()
async def items(ctx, username, password):
    """
    Give user all items.
    """
    t = threading.Thread(name="Item",target=_items, args=(username, password))
    t.start()
    t.join()
    await ctx.send("You have all items.")

@client.command()
async def pets(ctx, username, password):
    """
    Give user all pets.
    """
    t = threading.Thread(name="Pets",target=_pets, args=(username, password))
    t.start()
    t.join()
    await ctx.send("You have all pets.")
    
class HelpCommand(commands.DefaultHelpCommand):
    async def send_pages(self):
        destination = self.context.author
        text = ""
        for page in self.paginator.pages:
            text += page
        await destination.send(text)


client.help_command = HelpCommand()

client.run("token")
def _arena(username, password):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_extension("./extension (1).zip")
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    #chrome_options.add_extension('C:\\Users\\laure\\Downloads\\extension (1).zip')

    driver = webdriver.Chrome(options=chrome_options)

    driver.get('https://sso.prodigygame.com/game/login?rid=c5884060-d4c7-495d-a8b3-7658d7921a0d')
    driver.find_element_by_id("unauthenticated_game_login_form_username").send_keys(username)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(password)
    driver.find_element_by_id("unauthenticated_game_login_form_password").send_keys(Keys.ENTER)
    time.sleep(30)
    print("Script!")
    driver.execute_script("""
    _.constants.constants["GameConstants.Inactivity.LOG_OUT_TIMER_SECONDS"] = 0;
    function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
    return JSON.parse(jsonPayload)
};

let userID = parseJwt(localStorage.JWT_TOKEN).content.userID
let arenaseason = await (await fetch(`https://api.prodigygame.com/leaderboard-api/user/${userID}/init?userID=${userID}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Authorization': localStorage.JWT_TOKEN,
    },
})).json();
arenaseason = arenaseason.seasonID;
console.log("Good")
setInterval(_ => {
    fetch(("https://api.prodigygame.com/leaderboard-api/season/" + arenaseason + "/user/" + userID + "/pvp?userID=" + userID), {
        headers: {
            "authorization": localStorage.JWT_TOKEN,
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-mode": "cors"
        },
        referrer: "https://play.prodigygame.com/",
        referrerPolicy: "no-referrer-when-downgrade",
        body: ("seasonID=" + arenaseason + "&action=win"),
        method: "POST",
        mode: "cors"
    }).then(v => v.text()).then(v => console.log(v))
}, 60500);
    """)
