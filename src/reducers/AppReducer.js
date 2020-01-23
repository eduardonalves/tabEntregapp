const INITIAL_STATE = {
    adiciona_contato_email: '',
    msgErroCadastroUsuario: '',
    cadastroResultadoUsuario: false,
    categorias: '',
    mensagem: '',
    carrinho: [],
    qtd_carrinho: 0,
    item_id: 1,
    total_carrinho: 0,
    qtd: 1,
    info_modal: 'Sem descrição disponível',
    show_modal: false,
    obs_pedido: '',
    troco_pedido: '',
    forma_pagamento: '',
    status_envio_pedido: false,
    tipos_pagamento: [],
    tipo_pagamento_falha: '',
    pode_enviar_pedido: true,
    show_loader: false,
    show_loader_categoria:false,
    show_loader_produto:false,
    categoria_carregada_falha:false
};

import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM_SUCESSO,
    CATEGORIA_CARREGADA_OK,
    ADICIONA_PRODUTO,
    REMOVE_PRODUTO,
    
    ATUALIZA_ITEM_ID,
    ATUALIZA_TOTAL_CARRINHO,
    ATUALIZA_QTD,
    CARREGA_INFO_MODAL,
    SHOW_MODAL,
    ATUALIZA_FORMA_PAGAMENTO,
    ATUALIZA_OBS,
    ATUALIZA_TROCO,
    PEDIDO_NAO_OK,
    PEDIDO_OK,
    STATUS_ENVIO_PEDIDO,
    CARREGA_TIPOS_PAGAMENTO_OK,
    CARREGA_TIPOS_PAGAMENTO_FALHA,
    PODE_ENVIAR_PEDIDO,
    SHOW_LOADER,
    LIMPA_CARRINHO,
    LIMPA_QTD_CARRINHO,
    LIMPA_TOTAL_CARRINHO,
    SHOW_LOADER_CATEGORIA,
    SHOW_LOADER_PRODUTO,
    CATEGORIA_CARREGADA_FALHA

} from '../actions/ActionTypes';

export default (state = INITIAL_STATE, action) => {
   
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload };
        case CATEGORIA_CARREGADA_OK:
            return { ...state, categorias: action.payload };
        case CATEGORIA_CARREGADA_FALHA:
                return { ...state, categoria_carregada_falha: action.payload };
        case ADICIONA_CONTATO_ERRO:
            return { ...state, msgErroCadastroUsuario: action.payload };
        case ADICIONA_CONTATO_SUCESSO:
            return { ...state, cadastroResultadoUsuario: action.payload, adiciona_contato_email: '' };
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload };
        case ENVIA_MENSAGEM_SUCESSO:
            return { ...state, mensagem: '' };
        case ADICIONA_PRODUTO:
            return { ...state, carrinho: action.payload, qtd_carrinho: action.payload.length };
        case REMOVE_PRODUTO:
            return { ...state, carrinho: action.payload, qtd_carrinho: action.payload.length };
        case ATUALIZA_ITEM_ID:
            return { ...state, item_id: action.payload };
        case CARREGA_INFO_MODAL:
            return { ...state, info_modal: action.payload };
        case SHOW_MODAL:
            return { ...state, show_modal: action.payload };
        case ATUALIZA_TOTAL_CARRINHO:
            return { ...state, total_carrinho: action.payload.toFixed(2) };
        case ATUALIZA_QTD:
            return { ...state, qtd: action.payload };
        case ATUALIZA_FORMA_PAGAMENTO:
            return { ...state, forma_pagamento: action.payload };
        case ATUALIZA_OBS:
            return { ...state, obs_pedido: action.payload };
            
        case STATUS_ENVIO_PEDIDO:
            //console.log('passou reducer status envio pedido');
            //console.log('action.payload');
            //console.log(action.payload);
            return { ...state, status_envio_pedido: action.payload };
        case ATUALIZA_TROCO:
            
            return { ...state, troco_pedido: action.payload };
        case PEDIDO_OK:
            //console.log('passou reducer pedido ok');
            return { ...state, status_envio_pedido: true };
        case PEDIDO_NAO_OK:
            //console.log('passou reducer pedido nao ok');
            return { ...state, status_envio_pedido: false };
        case LIMPA_CARRINHO:
            //console.log('passou reducer limpa carrinho');
            return { ...state, carrinho: action.payload };
        case LIMPA_QTD_CARRINHO:
                
                return { ...state, qtd_carrinho: action.payload };
        case LIMPA_TOTAL_CARRINHO:
                
                return { ...state, total_carrinho: action.payload };      
        case CARREGA_TIPOS_PAGAMENTO_OK:
            return { ...state, tipos_pagamento: action.payload };
        case CARREGA_TIPOS_PAGAMENTO_FALHA:
            return { ...state, tipo_pagamento_falha: action.payload };
        case SHOW_LOADER:      
            return { ...state, show_loader: action.payload }; 
        case SHOW_LOADER_CATEGORIA:      
            return { ...state, show_loader_categoria: action.payload }; 
        case SHOW_LOADER_PRODUTO:      
            return { ...state, show_loader_produto: action.payload }; 
        case PODE_ENVIAR_PEDIDO:
                return { ...state, pode_enviar_pedido: action.payload };
        
        default:
            return state;
    }
}