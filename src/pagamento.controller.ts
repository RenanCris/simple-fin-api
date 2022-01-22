import { Despesa } from './database/dto/ConsolidadoPagamento';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Pagamento } from './database/schemas/pagamento.schema';
import { PagamentoService } from './pagamento.service';
import { AuthGuard } from './auth';

@Controller()
@UseGuards(AuthGuard)
export class PagamentoController {
  constructor(private readonly pagService: PagamentoService) {}

  @Get(":usuario/ano/:ano")
  async obterTodos(@Param("usuario") usuario:string, @Param("ano") ano:number): Promise<Pagamento> {
    return await this.pagService.getPagamento(usuario, ano);
  }

  @Get("ultima-atualizacao/:usuario/ano/:ano")
  async obterUltimaAtualizacao(@Param("usuario") usuario:string, @Param("ano") ano:number): Promise<Date> {
    return await this.pagService.getUltimaAtualizacao(usuario, ano);
  }

  @Get("totais/:usuario/ano/:ano")
  async obterTotais(@Param("usuario") usuario:string, @Param("ano") ano:number): Promise<Despesa[]> {
    return await this.pagService.getTotalMes(usuario, ano);
  }

  @Post("usuario/:usuario")
  async lancarValor(@Param("usuario") usuario:string,@Body() pag: Pagamento ): Promise<Pagamento> {
    return await this.pagService.create(pag);
  }
}
