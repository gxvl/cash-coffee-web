# 🚀 Configuração de Deploy na Vercel

## Problema Resolvido: Mixed Content (HTTP/HTTPS)

Este projeto está configurado para fazer requisições à API através de um **proxy** no Vercel, resolvendo o problema de Mixed Content onde o navegador bloqueia requisições HTTP de páginas HTTPS.

## 📋 Arquivos Importantes

### 1. `vercel.json`
Configura o proxy que redireciona `/api/*` para o servidor backend HTTP:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://3.210.253.103/api/:path*"
    }
  ]
}
```

### 2. `src/services/api.ts`
Detecta automaticamente o ambiente e usa a URL correta:
- **Produção (Vercel)**: Usa `/api/v1` (proxy local)
- **Desenvolvimento**: Usa `NEXT_PUBLIC_API_URL` do `.env.local`

## 🔧 Configuração para Deploy na Vercel

### Passo 1: Deploy Inicial
1. Faça commit das alterações:
   ```bash
   git add .
   git commit -m "feat: adiciona proxy Vercel e tipo de conta em português"
   git push
   ```

2. A Vercel fará o deploy automaticamente (se conectada ao repositório)

### Passo 2: Variáveis de Ambiente (Opcional)
**Não é necessário** configurar `NEXT_PUBLIC_API_URL` na Vercel, pois o proxy está configurado no `vercel.json`.

Mas se precisar para outros ambientes:
1. Acesse [vercel.com](https://vercel.com)
2. Vá em **Settings** → **Environment Variables**
3. Adicione apenas se necessário

## 🖥️ Configuração Local

Para desenvolvimento local, crie um arquivo `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://3.210.253.103/api/v1
```

## ✅ Melhorias Implementadas

### 1. Proxy HTTP → HTTPS
- ✅ Requisições agora vão para `https://cash-coffee-web.vercel.app/api/v1/users`
- ✅ Vercel redireciona para `http://3.210.253.103/api/v1/users` internamente
- ✅ Navegador não bloqueia mais por Mixed Content

### 2. Tipo de Conta em Português
- ✅ Campo "Tipo de Conta" agora é um **Select/Combo**
- ✅ Opções em português: "Conta Corrente" e "Conta Poupança"
- ✅ Conversão automática para inglês antes de enviar à API:
  - "Corrente" → "Checking"
  - "Poupança" → "Savings"

## 🧪 Testando

### Local
```bash
npm run dev
# Acesse http://localhost:3000/register
```

### Produção
Após o deploy, teste em:
```
https://cash-coffee-web.vercel.app/register
```

## 🔍 Troubleshooting

### Erro: "Network Error" persiste
1. Verifique se o `vercel.json` foi commitado
2. Force um novo deploy na Vercel
3. Verifique os logs na Vercel Dashboard

### API não responde
- Confirme que `http://3.210.253.103` está online
- Teste diretamente: `curl http://3.210.253.103/api/v1/users`

### Tipo de Conta não aparece
- Limpe o cache do navegador
- Verifique se o deploy incluiu as alterações em `StepFive`

## 📝 Notas Importantes

- ⚠️ O servidor backend (`3.210.253.103`) ainda usa HTTP
- ✅ O proxy Vercel converte HTTPS → HTTP internamente
- 🔒 Para produção ideal, recomenda-se adicionar HTTPS no backend
- 📦 Todos os arquivos necessários estão incluídos no repositório
