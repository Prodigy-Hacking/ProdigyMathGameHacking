//> Item stacker hack
//>> Gives all armor, hats, boots, currencies, etc.
const gameData = _.instance.game.state.states.get('Boot')._gameData
const ids = ['boots', 'follow', 'fossil', 'hat', 'item', 'key', 'mathTownFrame', 'mathTownInterior', 'mount', 'outfit','spellRelic', 'weapon', 'currency']

const itemify = (item, amount) =>
	item.map(x => ({
		ID: x.ID,
		N: amount,
	})).filter(v => v !== undefined);

ids.forEach(id => {
    _.player.backpack.data[id] = itemify(gameData[id], 9e9)
});
gameData.dorm.forEach(x =>
    _.player.house.data.items[x.ID] = {A: [], N: 999}
)