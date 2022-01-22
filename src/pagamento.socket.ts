import { Pagamento } from './database/schemas/pagamento.schema';
import {  MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import { PagamentoService } from './pagamento.service';

@WebSocketGateway({ cors: true })
export class PagamentoSocketService implements  OnGatewayConnection{
    
    constructor(private readonly pagService: PagamentoService) {
    }

    handleConnection(client: Socket, ...args: any[]) {
        
    }

    @WebSocketServer()
    private server:Server;

    @SubscribeMessage('lancamento-pagamento')
    async sendPagamentos(@MessageBody() pag:Pagamento){
        pag.usuario = process.env.CHAVE;
        await this.pagService.create(pag);
    }

}