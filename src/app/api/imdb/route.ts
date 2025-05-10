// src/app/api/handler/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import type { TMDBRespose } from '@/types';

const searchOptions: RequestInit = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_AUTH_KEY}`
    }
};

async function fetcher(url: string, options: RequestInit) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
    return res.json();
}

const treatData = async (searchUrl:string) => {
    try {
        const data: TMDBRespose = await fetcher(searchUrl, searchOptions);
        console.log({ data})
        for (const movie of data.results) {
            movie.poster_path = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`;
            const providersUrl = `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`
            const providers = await fetcher(providersUrl, searchOptions)
            movie.providers = providers.results;
        }
        const treatedData = data.results.map((movie) => {
            console.log({ movie });
            return { 
                id: movie.id,
                title: movie.original_title, 
                providers: movie.providers,
                poster_path: movie.poster_path,
                rating: movie.vote_average
            };
        });
        return NextResponse.json({ treatedData }, { status: 200 });
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching data:', err);
        return NextResponse.json({ message }, { status: 502 });
    }
}

// GET /api/handler?name=Transformers
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    if (!name) {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
        return treatData(url);
    }else {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            name
        )}&include_adult=false&language=en-US`;
        return treatData(searchUrl);
    }
    // build the RapidAPI URL with your "name" as originalTitle
    
    
}

export async function DELETE() {
    return NextResponse.json(
        { message: 'Method DELETE Not Allowed' },
        { status: 405, headers: { Allow: 'GET' } }
    );
}
