//> Fix pet team script
//>> Fixes your pet kennel

_.player.kennel.petTeam.forEach(v => {
    if (v && v.assignRandomSpells) {
        v.assignRandomSpells();
    }
});
