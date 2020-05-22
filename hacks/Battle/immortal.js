// Makes it so your health dropping below 0 doesn't even matter
hack.player.isKnockedOut = () => false;
hack.player.kennel.petTeam.forEach(pet => {
  if(pet && pet.isKnockedOut) pet.isKnockedOut = () => false;
});
