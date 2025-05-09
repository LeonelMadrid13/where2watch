// src/app/api/handler/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import type { TMDBRespose } from '@/types';

async function fetcher(url: string, options: RequestInit) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
    return res.json();
}

// GET /api/handler?name=Transformers
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    if (!name) {
        return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    // build the RapidAPI URL with your "name" as originalTitle
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        name
    )}&include_adult=false&language=en-US`;
    
    const searchOptions: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_AUTH_KEY}`
        }
      };
    const providersOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_AUTH_KEY}`
        }
      };

    try {
        const data: TMDBRespose = await fetcher(searchUrl, searchOptions);
        for (const movie of data.results) {
            movie.poster_path = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`;
            const providersUrl = `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`
            const providers = await fetcher(providersUrl, providersOptions)
            movie.providers = providers.results;
        }
        return NextResponse.json({ data });
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching data:', err);
        return NextResponse.json({ message }, { status: 502 });
      }
}

export async function DELETE() {
    return NextResponse.json(
        { message: 'Method DELETE Not Allowed' },
        { status: 405, headers: { Allow: 'GET' } }
    );
}
