import { NextResponse } from 'next/server';
import { getSessionUser } from '@/modules/auth/services/auth-service';

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
  });
}
