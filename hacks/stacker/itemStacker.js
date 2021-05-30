//> Item stacker hack
//>> Gives all armor, hats, boots, currencies, etc.
const _.gameData = _.instance.game.state.states.get('Boot').__.gameData
const ids = ['boots', 'follow', 'fossil', 'hat', 'item', 'key', 'mathTownFrame', 'mathTownInterior', 'mount', 'outfit','spellRelic', 'weapon', 'currency']

const itemify = (item, amount) =>
	item.map(x => ({
		ID: x.ID,
		N: amount,
	})).filter(v => v !== undefined);

ids.forEach(id => {
    _.player.backpack.data[id] = itemify(_.gameData[id], 9e9)
});
_.gameData.dorm.forEach(x =>
    _.player.house.data.items[x.ID] = {A: [], N: 999}
)
_.player.backpack.data.mount = itemify(gameData.mount, 1);

// Remove bounty notes (#229)
let bountyIndex = _ => _.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86)
while (bountyIndex() > -1) _.player.backpack.data.item.splice(bountyIndex(), 1)