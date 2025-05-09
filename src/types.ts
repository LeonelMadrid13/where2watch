export type TMDBRespose = {
    page: number;
    results: TMDBResult[];
    total_pages: number;
    total_results: number;
}

export type TMDBResult = {
    adult: boolean;
    backdrop_path: null | string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    providers?: {
    [countryCode: string]: Ad | Ao;
};
}

export enum OriginalLanguage {
    En = "en",
    Ja = "ja",
}

export type Ad = {
    link: string;
    flatrate: Flatrate[];
}

export type Flatrate = {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export type Ao = {
    link: string;
    flatrate?: Flatrate[];
    buy: Flatrate[];
    rent: Flatrate[];
    free?: Flatrate[];
    ads?: Flatrate[];
}
