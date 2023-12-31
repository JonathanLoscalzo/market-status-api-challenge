export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? ''),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC == 'true', // remover cuando haya migraciones
    logging: process.env.DATABASE_LOG == 'true',
    autoLoadEntities: false,
  },
});
