
# 🦸‍♀️ Teste Prático Next.js – Aplicação de Heróis e HQs

Esta aplicação foi desenvolvida como parte de um desafio prático utilizando **Next.js** com foco em boas práticas, autenticação, consumo de APIs externas e estilização com **Tailwind CSS**.

---

## ✅ Funcionalidades implementadas

- 🔐 **Sistema de autenticação** com login e cadastro
- 🔎 **Busca temática de heróis e quadrinhos** utilizando a [API da Wikipedia](https://en.wikipedia.org/w/api.php)
- 🧾 **Página estática** de conteúdo
- 🧭 **Rota dinâmica** para exibir detalhes por slug/id
- 🎨 Estilização com **Tailwind CSS**
- 💡 Middleware protegendo rotas
- ⚡ Otimização com cache e boas práticas de performance
- 🎨 Imagem de fundo repetida em todas as páginas
- 📌 Header fixo com nome do usuário, botão "Sobre" e Logout

---

## 📂 Estrutura de páginas

| Página | Caminho | Descrição |
|--------|---------|-----------|
| Página de busca | `/portal/search` | Busca artigos na Wikipedia com foco em heróis/HQs |
| Página estática | `/sobre` | Exemplo de conteúdo fixo da aplicação |
| Rota dinâmica | `/portal/heroi/[slug]` | Exibe detalhes de um herói com base no parâmetro |
| Login | `/portal/login` | Acesso ao sistema |
| Cadastro | `/portal/sign-up` | Criação de nova conta |

---

## 🚀 Como rodar o projeto localmente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o banco de dados e ambiente**

Crie um arquivo `.env.local`:

```
DATABASE_URL="mysql://usuario:senha@localhost:3306/seubanco"
```

4. **Execute as migrations**

```bash
npx prisma migrate dev
```

5. **Rode o projeto**

```bash
npm run dev
```

Acesse: `http://localhost:3000`

---

## 🧩 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Wikipedia API](https://en.wikipedia.org/w/api.php)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🔐 Middleware

- Rotas protegidas com verificação de sessão via cookies
- Redirecionamento automático para login se o usuário não estiver autenticado

---

## 📌 Observações

- A busca sempre traz resultados relacionados ao universo de quadrinhos, super-heróis e HQs.
- O fundo visual utiliza imagens fixas e repetidas para reforçar o tema visual do projeto.
- O botão "Sobre" abre uma explicação direta via `alert`.

---

## 📝 Conclusão

Este projeto atende aos critérios de:

- Organização do código
- Uso correto de rotas estáticas, dinâmicas e protegidas
- Boas práticas com CSS e layout
- API externa corretamente utilizada
- Autenticação funcional sem necessidade de bibliotecas externas

---
