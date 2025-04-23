'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // <-- Importante para rotas internas

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const backgroundUrl =
    'https://cf.shopee.com.br/file/0e3cb03bb5c8c5ce8137c46587a082e4';

  async function handleSearch() {
    setLoading(true);
    const themedQuery = `${query} comic OR superhero OR "hq" OR "quadrinhos"`;

    // 1. Busca os resultados da Wikipedia
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        themedQuery
      )}&format=json&origin=*`
    );
    const data = await res.json();
    const searchResults = data.query.search;

    // 2. Busca imagens para todos os resultados encontrados
    const pageIds = searchResults.map((item: any) => item.pageid).join('|');
    let images: Record<number, string> = {};

    if (pageIds.length > 0) {
      const imgRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageIds}&prop=pageimages&format=json&pithumbsize=180&origin=*`
      );
      const imgData = await imgRes.json();
      images = Object.fromEntries(
        Object.entries(imgData.query.pages).map(([id, page]: any) => [
          Number(id),
          page.thumbnail?.source ?? null,
        ])
      );
    }

    setResults(
      searchResults.map((item: any) => ({
        ...item,
        image: images[item.pageid] || null,
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setUser(data);
      });
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-left-top bg-repeat transition-all duration-700"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'auto',
      }}
    >
      {/* Header fixo no topo */}
      <header className="w-full fixed top-0 left-0 bg-white bg-opacity-90 shadow-md p-4 z-50 flex justify-between items-center">
        <div className="text-gray-800 font-semibold text-lg">
          {user ? `Olá, ${user.name}` : 'Carregando...'}
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() =>
              alert(
                'Essa aplicação permite pesquisar heróis e quadrinhos via Wikipedia!'
              )
            }
            className="text-blue-600 font-medium hover:underline"
          >
            Sobre
          </button>
          <button
            onClick={async () => {
              await fetch('/api/logout');
              window.location.href = '/portal/login';
            }}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="min-h-screen w-full bg-black bg-opacity-60 flex items-center justify-center p-8 pt-28">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl max-w-3xl w-full shadow-xl">
          <h1 className="text-2xl font-bold mb-4">
            Pesquisar Heróis e HQs na Wikipedia
          </h1>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite um herói ou HQ"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Buscar
            </button>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul className="space-y-2">
              {results.map((item) => (
                <li
                  key={item.pageid}
                  className="border p-4 rounded bg-white bg-opacity-90 flex gap-4 items-center"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded">
                      <span className="text-gray-400 text-xl">?</span>
                    </div>
                  )}
                  <div>
                    {/* Agora usa Link do Next.js para rota dinâmica */}
                    <Link
                      href={`/portal/wiki/${item.pageid}`}
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p
                      dangerouslySetInnerHTML={{ __html: item.snippet }}
                      className="text-gray-700 text-sm mt-1"
                    />
                    {/* (Opcional) Link extra para Wikipedia externa */}
                    <a
                      href={`https://en.wikipedia.org/?curid=${item.pageid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:underline block mt-1"
                    >
                      Ver na Wikipedia
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
