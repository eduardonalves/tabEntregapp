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
    categoria_carregada_falha:false,
    meus_pedidos: [],
    meus_pedidos_carregados_falha:false,
    pedido:[],
    pedido_carregado_falha:false,
    produto_carregado_falha:false,
    msgErroLogin: '',
    loadingLogin: '',
    nome: '',
    email:'',
    senha: '',
    cep:'',
    endereco:'',
    numero:'',
    complemento:'',
    ponto_referencia:'',
    estado:'',
    cidade:'',
    bairro:'',
    telefone:'',
    username:'',
    lista_estados:[],
    lista_cidades:[],
    lista_bairros:[],
    cadastro_usuario:'',
    cadastro_usuario_falha:false,
    confirma_senha:'',
    usuario:'',
    carrega_cidade_falha:false,
    carrega_bairro_falha: false,
    carrega_estado_falha:false,
    cadastro_usuario_sucesso:false,
    usuario_id:'',
    senha_antiga:'',
    usuario_atualizou_cadastro:false,
    estado_nome:'',
    bairro_nome:'',
    cidade_nome:'',
    is_valid_token:'',
    iniciou_partida: false,
    dados_partida: '',
    dados_premio:'',
    resultado: '', 
    txtColor: 'red', 
    escolhaDoComputador: '', 
    escolhaUsuario: '', 
    showImage: false, 
    imagemComputador: require('../../assets/images/pedra.png'), 
    imagemUsuario: require('../../assets/images/pedra.png'),
    n_vitorias:0,
    n_derrotas:0,
    resultado_final:'',
    saldo:0,
    notification:null,
    messageText: '',
    token_notificacao:'',
    estado_do_app:'',
    valor_frete: 0,
    valor_frete_aux: 0,
    retirada_loja:false,
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
    CATEGORIA_CARREGADA_FALHA,
    PEDIDO_CARREGADO_FALHA,
    PEDIDO_CARREGADO_OK,
    MEUS_PEDIDOS_CARREGADOS_OK,
    MEUS_PEDIDOS_CARREGADOS_FALHA,
    MODIFICA_NOME,
    MODIFICA_EMAIL,
    MODIFICA_CEP, 
    MODIFICA_SENHA,
    MODIFICA_ENDERECO,
    MODIFICA_NUMERO,
    MODIFICA_COMPLEMENTO,
    MODIFICA_PONTO_REFERENCIA,
    MODIFICA_ESTADO,
    MODIFICA_CIDADE,
    MODIFICA_BAIRRO,
    MODIFICA_TELEFONE,
    MODIFICA_CONFIRMA_SENHA,
    CADASTRO_USUARIO,
    CADASTRO_USUARIO_ERRO,
    CONFIRMA_SENHA,
    MODIFICA_CONFIR,
    CARREGA_CIDADE,
    CARREGA_BAIRRO,
    CARREGA_BAIRRO_FALHA,
    CARREGA_CIDADE_FALHA,
    CARREGA_ESTADO,
    CARREGA_ESTADO_FALHA,
    LIMPA_BAIRRO,
    LIMPA_CIDADE,
    LIMPA_ESTADO,
    CADASTRO_USUARIO_SUCESSO,
    ATUALIZA_USUARIO,
    MODIFICA_USERNAME,
    MODIFICA_SENHA_ANTIGA,
    MODIFICA_ID_USUARIO,
    USUARIO_ATUALIZOU_CADASTRO,
    MODIFICA_NOME_ESTADO,
    MODIFICA_NOME_CIDADE,
    MODIFICA_NOME_BAIRRO,
    IS_VALID_TOKEN,
    INICIOU_PARTIDA,
    DADOS_PARTIDA,
    DADOS_PREMIO,
    RESULTADO,
    TXTCOLOR,
    ESCOLHA_DO_COMPUTADOR,
    ESCOLHA_DO_USUARIO,
    SHOW_IMAGE,
    IMAGEM_COMPUTADOR,
    IMAGEM_USUARIO,
    N_VITORIAS,
    N_DERROTAS,
    RESULTADO_FINAL,
    SALDO,
    NOTIFICATION,
    MESSAGE_TEXT,
    TOKEN_NOTIFICACAO,
    VALOR_FRETE,
    RETIRADA_LOJA,
    VALOR_FRETE_AUX
} from '../actions/ActionTypes';

export default (state = INITIAL_STATE, action) => {
   
    switch (action.type) {
        case TOKEN_NOTIFICACAO:
            return { ...state, token_notificacao: action.payload };
        case VALOR_FRETE:
            return { ...state, valor_frete: action.payload };
        case VALOR_FRETE_AUX:
            return { ...state, valor_frete_aux: action.payload };
        case RETIRADA_LOJA:
            return { ...state, retirada_loja: action.payload };    
        case NOTIFICATION:
            return { ...state, notification: action.payload };
        case MESSAGE_TEXT:
            return { ...state, messageText: action.payload };    
        case SALDO:
            return { ...state, saldo: action.payload };
        case N_VITORIAS:
            return { ...state, n_vitorias: action.payload };
        case N_DERROTAS:
            return { ...state, n_derrotas: action.payload };

        case RESULTADO_FINAL:
            return { ...state, resultado_final: action.payload };

        case RESULTADO:
            return { ...state, resultado: action.payload };
        
        case RESULTADO:
            return { ...state, resultado: action.payload };
        
        case RESULTADO:
            return { ...state, resultado: action.payload };    
            
        case TXTCOLOR:
            return { ...state, txtColor: action.payload };   
        case ESCOLHA_DO_COMPUTADOR:
            return { ...state, escolhaDoComputador: action.payload };
        case ESCOLHA_DO_USUARIO:
            return { ...state, escolhaUsuario: action.payload };  
        case SHOW_IMAGE:
            return { ...state, showImage: action.payload };   
        case IMAGEM_COMPUTADOR:
            return { ...state, imagemComputador: action.payload };
        case IMAGEM_USUARIO:
            return { ...state, imagemUsuario: action.payload };    
        case DADOS_PREMIO:
            return { ...state, dados_premio: action.payload };
        case INICIOU_PARTIDA:
            return { ...state, iniciou_partida: action.payload };
        case DADOS_PARTIDA:
            return { ...state, dados_partida: action.payload };    

        case MODIFICA_SENHA_ANTIGA:
            return { ...state, senha_antiga: action.payload };
        case IS_VALID_TOKEN:
            return { ...state, is_valid_token: action.payload };
        case USUARIO_ATUALIZOU_CADASTRO:
            return { ...state, usuario_atualizou_cadastro: action.payload };
        case MODIFICA_ID_USUARIO:
            return { ...state, usuario_id: action.payload };
        case MODIFICA_NOME_ESTADO:
            return { ...state, estado_nome: action.payload };
        case MODIFICA_NOME_CIDADE:
            return { ...state, cidade_nome: action.payload };
        case MODIFICA_NOME_BAIRRO:
            return { ...state, bairro_nome: action.payload };   
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload };
        case MODIFICA_USERNAME:
            return { ...state, username: action.payload };
        case MEUS_PEDIDOS_CARREGADOS_OK:
            return { ...state, meus_pedidos: action.payload };
        case MEUS_PEDIDOS_CARREGADOS_FALHA:
                return { ...state, meus_pedidos_carregados_falha: action.payload };
        case PEDIDO_CARREGADO_OK:
            return { ...state, pedido: action.payload };
        case PEDIDO_CARREGADO_FALHA:
                return { ...state, pedido_carregado_falha: action.payload };
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
            return { ...state, status_envio_pedido: action.payload };
        case ATUALIZA_TROCO:
            return { ...state, troco_pedido: action.payload };
        case PEDIDO_OK:
            return { ...state, status_envio_pedido: true };
        case PEDIDO_NAO_OK:
            return { ...state, status_envio_pedido: false };
        case LIMPA_CARRINHO:
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
        case MODIFICA_NOME:
                return { ...state, nome: action.payload };
        case MODIFICA_EMAIL:
                return { ...state, email: action.payload };
        case MODIFICA_CEP:
                return { ...state, cep: action.payload };
        case MODIFICA_CONFIRMA_SENHA:
                return { ...state, confirma_senha: action.payload };        
         case MODIFICA_SENHA:
                return { ...state, senha: action.payload };
        case MODIFICA_ENDERECO:
                return { ...state, endereco: action.payload };
        case MODIFICA_NUMERO:
                return { ...state, numero: action.payload };
        case MODIFICA_COMPLEMENTO:
                return { ...state, complemento: action.payload };
        case MODIFICA_PONTO_REFERENCIA:
            return { ...state, ponto_referencia: action.payload };
        case MODIFICA_ESTADO:
            return { ...state, estado: action.payload };
        case MODIFICA_CIDADE:
            return { ...state, cidade: action.payload };
        case MODIFICA_BAIRRO:
            return { ...state, bairro: action.payload };
        case MODIFICA_TELEFONE:
            return { ...state, telefone: action.payload };
        case CADASTRO_USUARIO:
            return { ...state, usuario: action.payload };
        
        case CADASTRO_USUARIO_ERRO:
            return { ...state, cadastro_usuario_falha: action.payload };
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, usuario: action.payload };
        case CONFIRMA_SENHA:
            return { ...state, confirma_senha: action.payload };
        case CARREGA_ESTADO:
            return { ...state, lista_estados: action.payload };
        case CARREGA_ESTADO_FALHA:
            return { ...state, carrega_estado_falha: action.payload };  
        case CARREGA_CIDADE:
            return { ...state, lista_cidades: action.payload };
        case CARREGA_CIDADE_FALHA:
            return { ...state, carrega_cidade_falha: action.payload };
        case LIMPA_CIDADE:
            return { ...state, lista_cidades: action.payload };
        case CARREGA_BAIRRO:
            return { ...state, lista_bairros: action.payload };
        case LIMPA_BAIRRO:
                return { ...state, lista_bairros: action.payload };
        case LIMPA_ESTADO:
            return { ...state, lista_estados: action.payload };
        case CARREGA_BAIRRO_FALHA:
            return { ...state, carrega_bairro_falha: action.payload };
        case ATUALIZA_USUARIO:
            return { ...state, usuario: action.payload };
            
        default:
            return state;
    }
}