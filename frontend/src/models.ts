export interface ICard {
    id: string;
    date: string;
}


export interface IColumn {
    id: string;
    cards: ICard[];
}
