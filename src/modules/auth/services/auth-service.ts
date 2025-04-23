import * as jose from 'jose';
import { cookies } from 'next/headers';

async function openSessionToken(token: string) {
  const rawSecret = process.env.AUTH_SECRET;
  if (!rawSecret || rawSecret.trim() === '') {
    throw new Error('AUTH_SECRET não está definida.');
  }
  const secret = new TextEncoder().encode(rawSecret);

  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

async function createSessionToken(payload = {}) {
  const rawSecret = process.env.AUTH_SECRET;
  if (!rawSecret || rawSecret.trim() === '') {
    throw new Error('AUTH_SECRET não está definida.');
  }
  const secret = new TextEncoder().encode(rawSecret);

  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('1d')
    .sign(secret);

  const { exp, role } = await openSessionToken(session);

  cookies().set('session', session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  });
}

async function isSessionValid() {
  const sessionCookie = cookies().get('session');

  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const currentDate = new Date().getTime();

    return (exp as number) * 1000 > currentDate;
  }

  return false;
}

function destroySession() {
  cookies().delete('session');
}

async function getSessionUser() {
  const sessionCookie = cookies().get('session');
  if (!sessionCookie) return null;

  try {
    const payload = await openSessionToken(sessionCookie.value);
    return {
      name: payload.name as string,
      email: payload.email as string,
      // id: payload.sub, // Se quiser retornar o id também
    };
  } catch (e) {
    return null;
  }
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
  getSessionUser, // <-- nova função exportada
};

export {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
  getSessionUser,
};
export default AuthService;
