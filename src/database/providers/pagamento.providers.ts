import { Connection } from "mongoose";
import { PagamentoSchema } from "../schemas/pagamento.schema";

export const pagProviders = [
    {
      provide: 'PAG_MODEL',
      useFactory: (connection: Connection) => connection.model('Pagamento', PagamentoSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ];