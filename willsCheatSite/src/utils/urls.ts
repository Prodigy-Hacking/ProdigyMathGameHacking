export const LOGIN = "https://api.prodigygame.com/game-auth-api/v1/login";
export const USER_UPDATE = (userID: number) => `https://api.prodigygame.com/game-api/v3/characters/${userID}`
export const GET_USER = (userID: number, foreignID: string | number) => `https://api.prodigygame.com/game-api/v2/characters/${foreignID}?userID=${userID}`