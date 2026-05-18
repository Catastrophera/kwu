# kwu
How to run in localhost:
- npm install
- create .env with the following variable:
    - DATABASE_URL="mysql://root:@localhost:3306/it_sticker"
    - NEXTAUTH_SECRET="my_super_secret_cyberpunk_nexauth_key"
    - NEXTAUTH_URL="http://localhost:3000"
    - MIDTRANS_SERVER_KEY="SB-Mid-server..."
    - NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="SB-Mid-client..."
- npx prisma db push
- npx ts-node prisma/seed.ts
- npm run dev
