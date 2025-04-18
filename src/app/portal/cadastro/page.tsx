import SignUpForm from '@/modules/auth/components/sign-up-form';

export default function SignUpPage() {
  const backgroundUrl =
    'https://img.freepik.com/vetores-premium/pagina-de-quadrinhos-em-preto-e-branco-dividida-por-linhas-com-bolhas-de-fala-e-efeito-de-sons-ilustracao-vetorial_212216-748.jpg?semt=ais_hybrid&w=740';

  return (
    <div
      className="min-h-screen w-full bg-left-top bg-repeat"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'auto',
      }}
    >
      {/* camada escura para legibilidade */}
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black bg-opacity-60">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full">
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
