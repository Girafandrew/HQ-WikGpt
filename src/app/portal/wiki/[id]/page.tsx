import { notFound } from 'next/navigation';

export default async function WikiPage({ params }: { params: { id: string } }) {
  // Busca dados da Wikipedia pelo pageid vindo da rota
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&pageids=${params.id}&prop=extracts|pageimages&exintro&explaintext&format=json&pithumbsize=500&origin=*`
  );
  const data = await res.json();

  const page = data.query.pages[params.id];

  if (!page || page.missing) return notFound();

  return (
    <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      {page.thumbnail?.source && (
        <img src={page.thumbnail.source} alt={page.title} className="mb-4 w-full rounded" />
      )}
      <p className="text-gray-800">{page.extract}</p>
      <a
        href={`https://en.wikipedia.org/?curid=${params.id}`}
        className="block mt-6 text-blue-600 font-medium hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver na Wikipedia
      </a>
    </div>
  );
}
