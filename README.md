# Next.js Multi-Timer App — README

Pequeno guia para configurar, executar localmente e fazer deploy (Supabase + Vercel).

## Resumo
- **Frontend**: [Next.js](https://nextjs.org/) (TypeScript)
- **Realtime / Persistência**: [Supabase](https://supabase.com/)
- **Deploy**: [Vercel](https://vercel.com/)

## Tecnologias Utilizadas
- **Next.js**: Framework React para desenvolvimento web.
- **Supabase**: Backend-as-a-Service com suporte a Realtime e banco de dados PostgreSQL.
- **Prisma**: ORM para interagir com o banco de dados.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Vercel**: Plataforma para deploy de aplicações web.

## Pré-requisitos
- Node.js (>=16)
- Conta no [Supabase](https://supabase.com/)
- Conta no [Vercel](https://vercel.com/)
- Git & GitHub (para deploy fácil no Vercel)

## Instalar Dependências
```powershell
cd c:\Users\andre\Documents\CRONO\nextjs-multi-timer-app
npm install
npm install @supabase/supabase-js clsx date-fns
```

## Configurar Supabase
1. Criar novo projeto no Supabase.
2. Abrir **SQL Editor** → executar `db\setup.sql` (cria tabela `timers`).
3. Em **Project Settings → API**, copiar:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon public key)
4. Habilitar **Realtime** para a tabela `timers` (normalmente está disponível por padrão em tabelas públicas).

## Variáveis de Ambiente Locais
Criar um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Executar Localmente
```powershell
npm run dev
# Abrir http://localhost:3000/dashboard e http://localhost:3000/display
```
- Abra `/dashboard` no dispositivo de controle e `/display` em um projetor ou outro dispositivo. As alterações devem sincronizar em tempo real.

## Comandos Úteis
Criar um commit e enviar para o GitHub:
```powershell
git init
git add .
git commit -m "Initial multi-timer app"
# Criar repositório no GitHub e enviar
```
```powershell
git remote add origin <repo-url>
git branch -M main
git push -u origin main
```

## Deploy no Vercel
1. Conectar o repositório GitHub ao Vercel.
2. Em **Project Settings → Environment Variables**, adicionar:
   - `NEXT_PUBLIC_SUPABASE_URL` = (valor do Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (valor do Supabase)
3. Configurações de Build:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (detectado automaticamente pelo Vercel)
   - **Output Directory**: `.next`
4. Deploy. Abrir `/dashboard` e `/display` na URL pública.

## Teste Multi-Dispositivo
- Abrir a URL pública `/dashboard` em um laptop (controlo) e `/display` em um tablet ou projetor (visualização).
- Criar um cronômetro no dashboard → deve aparecer no display em menos de 1 segundo.

## Notas Rápidas e Troubleshooting
- **Timers não atualizam**: Verifique as variáveis de ambiente e se o Realtime está ativo para a tabela `timers`.
- **Diferenças de tempo**: O estado de execução depende de `started_at` no servidor. Diferenças entre relógios podem causar discrepâncias de 1–2 segundos.
- **Melhorias sugeridas**: Considere usar uma função server-side para "tick" e corrigir drift (opcional).

## Checklist para Aula (18/12/2025)
- [ ] Tabela `timers` criada no Supabase
- [ ] Variáveis de ambiente definidas no Vercel
- [ ] Deploy feito no Vercel e URL testada
- [ ] `/dashboard` e `/display` sincronizam entre dispositivos

## Contribuição
Contribuições são bem-vindas! Para colaborar:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça commit das alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie para o repositório remoto (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Contato
Se precisar de ajuda, entre em contato e informe o passo que falhou (erro no build, variáveis, Realtime, etc.).