//> Fix pet team script
//>> Fixes your pet kennel

hack.player.kennel.petTeam.forEach(v => {
    if (v && v.assignRandomSpells) {
        v.assignRandomSpells();
    }
});
