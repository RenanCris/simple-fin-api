import * as mongoose from 'mongoose';

const ItensSchema = new mongoose.Schema({
    id: {type:String, required:true },
    descricao: {type:String, required:true },
    valor: {type:Number, required:true },
    pago: {type:Boolean, required:true, default: false },
});

 const LancamentoSchema =  new mongoose.Schema({
    mes:{type:Number, required:true },
    ano:{type:Number, required:true },
    itens: [ItensSchema]
});

export const PagamentoSchema = new mongoose.Schema({
  usuario:  {type:String, required:true},
  atualizacao:  {type:Date, required:true, default: new Date()},
  ano:{type:Number, required:true},
  lancamentos: [LancamentoSchema]
});

export class Iten {
    constructor(
        public id:string,
        public descricao:string,
        public valor:number,
        public pago:boolean
    ){

    }
}

export class Lancamento{

    constructor(
        public mes:number,
        public ano:number,
        public itens: Array<Iten>
    ) {
         
    }
}


export class Pagamento {
    constructor(
        public usuario:string,
        public ano: number,
        public atualizacao:Date,
        public lancamentos: Array<Lancamento>
    ){
        
    }
}