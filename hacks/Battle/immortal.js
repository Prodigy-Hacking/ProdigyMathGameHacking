// Makes it so your health dropping below 0 doesn't even matter
hack.instance.prodigy.player.isKnockedOut = () => false;
hack.instance.prodigy.player.kennel.petTeam.forEach(pet => {
  if(pet && pet.isKnockedOut) pet.isKnockedOut = () => false;
});
