import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

console.log({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

export const DatabaseProviders = [
    TypeOrmModule.forRootAsync({
        useFactory: async () => {
            try {
                return {
                    type: 'mssql',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT, 10),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: true,
                    options: {
                        encrypt: true,
                        enableArithAbort: true,
                    },
                    extra: {
                        trustServerCertificate: true, // Desactiva la verificación del certificado
                        encrypt: true,
                        enableArithAbort: true,
                    },
                };
            } catch (error) {
                throw new Error('ConnectionError');
            }
        },
    }),
];
