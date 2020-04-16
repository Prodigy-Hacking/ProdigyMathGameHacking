import requests
import json
from time import sleep
s = requests.session()
username = input("Enter your username: ")
password = input("Enter your password: ")

gameStatus = requests.get(
    "https://api.prodigygame.com/game-api/status").json()
print("Server status loaded.")
gameData = requests.get(
    "https://cdn.prodigygame.com/game/data/dev/data.json").json()
print("Game data loaded.")
login = s.post("https://api.prodigygame.com/game-auth-api/v1/login",
               data=json.dumps({"username": username,
                                "password": password,
                                "clientVersion": gameStatus["data"]["gameClientVersion"]}), headers={"Content-type": "application/json"})
if not login.ok:
    print("Invalid credentials.")
    exit()
user = login.json()
userID = user["userID"]
token = user["token"]
char = requests.get(
    f"https://api.prodigygame.com/game-api/v2/characters/{userID}")
print("Loaded character!")
leaderboard = requests.get(
    f"https://api.prodigygame.com/leaderboard-api/user/{userID}/init?userID={userID}", headers={"authorization": f"Bearer {token}"})
print("Leaderboard loaded.")
lb = leaderboard.json()
print("Loading hack...")
seasonID = lb["seasonID"]


def hack():
    login2 = s.post("https://api.prodigygame.com/game-auth-api/v1/login",
                    data=json.dumps({"username": username,
                                     "password": password,
                                     "clientVersion": gameStatus["data"]["gameClientVersion"]}), headers={"Content-type": "application/json"}).json()
    token2 = login2["token"]
    result = requests.post(
        f"https://api.prodigygame.com/leaderboard-api/season/{seasonID}/user/${userID}/pvp?userID=${userID}",
        headers={"authorization": f"Bearer {token2}",
                 "content-type": "application/x-www-form-urlencoded; charset=UTF-8", },
        data=f"seasonID=${seasonID}&action=win")
    print(result.request.headers)
    resultString = result.text
    if resultString == "":
        print("Failed to add points.")
    else:
        resultJson = json.loads(resultString)
        print(resultJson)
        points = resultJson["points"]
        print(f"{points} Points (+100)")
        rank = requests.get(
            f"https://api.prodigygame.com/leaderboard-api/season/{seasonID}/user/{userID}/rank?userID={userID}", headers={"authorization": f"Bearer {token}"}).json()
        e = rank["rank"]
        print(f"- Current Rank: {e}")


while True:
    hack()
    sleep(60.5)
