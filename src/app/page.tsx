import Link from 'next/link';

export default function Home() {
  const backgroundUrl =
    'https://cf.shopee.com.br/file/0e3cb03bb5c8c5ce8137c46587a082e4';

  return (
    <div
      className="min-h-screen w-full bg-left-top bg-repeat flex flex-col items-center justify-center transition-all duration-700"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'auto',
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm mb-4 text-center">
          Bem-vindo ao HQ-WikGPT!
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          O HQ-WikGPT é um portal interativo onde fãs de quadrinhos e super-heróis podem pesquisar e descobrir informações sobre seus personagens favoritos utilizando a Wikipedia, além de criar contas, salvar buscas e muito mais!
        </p>
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/portal"
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition text-lg"
          >
            Acesse o Portal
          </Link>
          <span className="text-gray-600 text-lg font-medium">ou</span>
          <Link
            href="/portal/cadastro"
            className="bg-green-600 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition text-lg"
          >
            Crie uma Conta
          </Link>
        </div>
        <hr className="w-full my-6 border-gray-300" />
        <div className="text-gray-600 text-center text-sm">
          <p>
            <b>Como funciona?</b>
            <br />
            Faça seu cadastro, acesse o portal e utilize nossa busca integrada à Wikipedia para descobrir detalhes, curiosidades e histórias de HQs e super-heróis. O HQ-WikGPT é seu hub para explorar o universo dos quadrinhos de forma prática, rápida e moderna.
          </p>
        </div>
      </div>
    </div>
  );
}
