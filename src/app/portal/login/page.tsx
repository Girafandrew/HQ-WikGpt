import LoginForm from '@/modules/auth/components/login-form';

export default function LoginPage() {
  const backgroundUrl =
    'https://midiainterativanic.wordpress.com/wp-content/uploads/2016/10/hqs.jpg';

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
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
