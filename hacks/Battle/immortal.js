//> Immortal hack
//>> Makes it so your health dropping below 0 doesn't even matter
_.player.isKnockedOut = () => false;
_.player.kennel.petTeam.forEach(pet => {
  if(pet && pet.isKnockedOut) pet.isKnockedOut = () => false;
});
