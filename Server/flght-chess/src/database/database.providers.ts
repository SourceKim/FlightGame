// import { createConnection } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATABASE_CONNECTION',
//     useFactory: async () => await createConnection({
//       type: 'sqlite',
//       database: './flight_chess.sql',
//       entities: [
//           __dirname + '/../**/*.entity{.ts,.js}',
//       ],
//       synchronize: true,
//     }),
//   },
// ];