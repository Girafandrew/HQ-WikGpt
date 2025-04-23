'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
// O import correto agora:
import { login } from '../actions/server-actions';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const initialState = { error: '' };
  const [state, formAction] = useFormState(login, initialState);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>HQ- WikGPT</CardTitle>
        <CardDescription>Faça login para continuar.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {/* Mostra mensagem de erro, se houver */}
            {state.error && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                <span aria-hidden="true">⚠️</span>
                <span>{state.error}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Entrar</Button>
          <Link
            href="/portal/cadastro"
            className={buttonVariants({ variant: 'link' })}
          >
            Criar Conta
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
