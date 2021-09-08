import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { DatabaseModule } from './database/database.module';
import { pagProviders } from './database/providers/pagamento.providers';
import { PagamentoSocketService } from './pagamento.socket';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    DatabaseModule],
  controllers: [PagamentoController],
  providers: [PagamentoService, ...pagProviders, PagamentoSocketService],
})
export class AppModule {}
