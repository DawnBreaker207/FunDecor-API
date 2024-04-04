import dotnet from 'dotenv';
dotnet.config({ path: './.env.local' });

const { PORT, URI, JWT_SECRET } = process.env;

export { PORT, URI, JWT_SECRET };
