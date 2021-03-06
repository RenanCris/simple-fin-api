import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`${process.env.URL_DATABASE}/${process.env.DB}`
          ,{ auth:{username:process.env.USER, password:process.env.PASSWORD} }),
  },
];