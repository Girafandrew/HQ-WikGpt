import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import AuthService from '../services/auth-service';

const prisma = new PrismaClient();

async function createAccount(state: { error: string }, formData: unknown) {
  'use server';

  if (!(formData instanceof FormData)) {
    console.log('>>> [createAccount] NÃO é FormData! Retornando erro.');
    return { error: 'Erro inesperado no envio do formulário.' };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!password || password.length < 6) {
    return { error: 'A senha deve ter pelo menos 6 caracteres.' };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: 'Já existe um usuário com este e-mail.' };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    console.log('>>> [createAccount] Usuário cadastrado com sucesso!');
    redirect('/portal/login');
  } catch (error: any) {
    console.log('>>> [createAccount] ERRO:', error);
    if (
      error.code === 'P2002' ||
      (error.message && error.message.includes('Unique constraint failed'))
    ) {
      return { error: 'Já existe um usuário com este e-mail.' };
    }
    return { error: 'Erro interno ao cadastrar usuário.' };
  }
}

async function login(state: { error: string }, formData: unknown) {
  'use server';

  if (!(formData instanceof FormData)) {
    console.log('>>> [login] NÃO é FormData! Retornando erro.');
    return { error: 'Erro inesperado no envio do formulário.' };
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    console.log('>>> [login] Usuário não encontrado');
    return { error: 'E-mail ou senha inválidos.' };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log('>>> [login] Senha inválida');
    return { error: 'E-mail ou senha inválidos.' };
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  });

  console.log('>>> [login] Login efetuado com sucesso!');
  redirect('/portal');
}

const AuthActions = {
  createAccount,
  login,
};

export default AuthActions;
