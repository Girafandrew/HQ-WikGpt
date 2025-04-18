import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cookieStore = cookies();
  const sessionEmail = cookieStore.get('sessionEmail')?.value;

  if (!sessionEmail) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: sessionEmail },
  });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
  });
}
