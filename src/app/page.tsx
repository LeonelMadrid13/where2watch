/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TMDBResult } from '@/types';
import RenderProvidersComponent from '@/app/components/renderproviders';

export default function Home() {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState<TMDBResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const url = new URL('/api/imdb', window.location.origin);
      url.searchParams.set('name', title);

      const res = await fetch(url.toString());
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || res.statusText);
      }

      const { data } = (await res.json()) as { data: { results: TMDBResult[] } };
      setMovies(data.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Buscar por título</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Escribe un título…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">❌ {error}</p>}
      {!loading && movies.length === 0 && !error && (
        <p className="text-gray-500">Sin resultados</p>
      )}

      <div className="grid gap-4 w-full text-black grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-[#d8d8d8] rounded-lg shadow overflow-hidden flex flex-col">
            <Image
              src={movie.poster_path!}
              alt={movie.original_title}
              width={240}
              height={360}
              className="h-60 p-2 w-90"
              style={{ objectFit: 'cover' }}
              unoptimized
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-2 flex-1">{movie.original_title}</h2>
              <p className="text-sm mb-2">⭐ {movie.vote_average}</p>
            </div>
            <div className="p-4 bg-gray-200 flex flex-col">
              <h3 className="text-md font-semibold mb-2">Proveedores</h3>
              <RenderProvidersComponent movie={movie} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}