import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Despesa } from './database/dto/ConsolidadoPagamento';
import { Pagamento } from './database/schemas/pagamento.schema';

@Injectable()
export class PagamentoService {

  constructor(
    @Inject('PAG_MODEL')
    private pagModel: Model<Pagamento>,
  ){}

  async create(pag: Pagamento): Promise<Pagamento> {
    pag.atualizacao = new Date();

    if(!pag.usuario || !pag.ano || !pag.atualizacao) return;

    const createPag = new this.pagModel(pag);

    var _registro = await createPag.collection.findOne({usuario: pag.usuario, ano: pag.ano});

    if(!_registro)
    return createPag.save();

    return await new Promise<Pagamento>((resolve, reject) =>{
      createPag.collection.findOneAndReplace({usuario: pag.usuario, ano: pag.ano}, pag, {upsert: true}, (err, doc) =>{
        if(err) reject(err);
        resolve(createPag);
      })
    });
  }

  async getPagamento(usuario:string, ano:number): Promise<Pagamento> {
    return this.pagModel.findOne({usuario: usuario, ano: ano}, 'lancamentos');
  }

  
  async getUltimaAtualizacao(usuario:string, ano:number): Promise<Date> {
    let pag = await this.pagModel.findOne({usuario: usuario, ano: ano}, 'atualizacao');
    return pag.atualizacao;
  }

  async getTotalMes(_usuario:string, _ano:number): Promise<Despesa[]> {
    return await this.pagModel.aggregate<Despesa>([
      {
        $match: {
          ano: parseInt(_ano.toString()),
          usuario: _usuario
        }
      },
      {
        $unwind: "$lancamentos"
      },
      {
        $addFields: {
          "itens.mes": {
            $add: "$lancamentos.mes"
          },
          "itens.count": {
            $size: "$lancamentos.itens"
          },
          "itens.sum": {
            $reduce: {
              input: "$lancamentos.itens",
              initialValue: 0,
              in: {
                $add: [
                  "$$value",
                  "$$this.valor"
                ]
              }
            }
          }
        }
      },
      {
        $group: {
          _id: "$_id",
          despesas: {
            $push: "$itens"
          }
        }
      }
    ])
    .sort({mes:1})
    .exec();
  };

 
}
