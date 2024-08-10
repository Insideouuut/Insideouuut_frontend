import dotenv from 'dotenv';
import path from 'path';
import { generateApi } from 'swagger-typescript-api';

// dotenv 설정
dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
});

// API 생성
generateApi({
  name: 'Apis.ts',
  output: path.resolve(process.cwd(), './src/api'),
  url: `https://modong-backend.site/v3/api-docs`,
  httpClientType: 'axios',
  extractEnums: true,
  unwrapResponseData: true,
}).catch(console.error);
