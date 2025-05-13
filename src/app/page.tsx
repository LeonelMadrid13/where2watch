// src/app/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import type { dataType } from '@/types';
import MovieDetailsComponent from '@/components/ui/moviedetailscard';

export default function Home() {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState<dataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  // fetch popular movies at page load if title is empty
  useEffect(() => {
    if (title === '') {
      const fetchPopularMovies = async () => {
        setLoading(true);
        setError(null);
        setMovies([]);

        try {
          const url = new URL('/api/imdb', window.location.origin);
          const res = await fetch(url.toString());
          if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message || res.statusText);
          }
          const { treatedData } = (await res.json()) as { treatedData: dataType[] };
          setMovies(treatedData);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPopularMovies();
    }
  }, [title]);

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
      const { treatedData } = (await res.json()) as { treatedData: dataType[] };
      setMovies(treatedData);
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
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">❌ {error}</p>}
      {!loading && movies.length === 0 && !error && (
        <p className="text-gray-500">Sin resultados</p>
      )}
      <MovieDetailsComponent movies={movies} />

    </div>
  );
}