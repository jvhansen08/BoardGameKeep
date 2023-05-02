export type Boardgame = {
    id: number;
    title: string;
    minPlayers: number;
    maxPlayers: number;
    minPlayTime: number;
    maxPlayTime: number;
    rating: number;
}

export enum AuthPaths {
    MyGames = '/my-games',
    PickGame = '/pick-game',
    NearbyStores = '/nearby-stores',
    Profile = '/profile',
}

export type StoreData = {
    name: string;
    address: string;
    rating: number;
    numRatings: number;
}