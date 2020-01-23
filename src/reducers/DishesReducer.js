const INITIAL_STATE = {
    adiciona_contato_email: '',
    msgErroCadastroUsuario: '',
    cadastroResultadoUsuario: false,
    produtos:'',
    mensagem: '',
    show_loader_produto:true,
    produto_carregado_falha:false
};

import {
    PRODUTO_CARREGADO_OK,
    SHOW_LOADER_PRODUTO,
    PRODUTO_CARREGADO_FALHA
} from '../actions/ActionTypes';

export default (state = INITIAL_STATE, action) => {
    //console.log(action);
    switch(action.type) {
        case PRODUTO_CARREGADO_OK:
            return { ...state, produtos: action.payload };
        case SHOW_LOADER_PRODUTO:
            return { ...state, show_loader_produto: action.payload };
        case PRODUTO_CARREGADO_FALHA:
                return { ...state, produto_carregado_falha: action.payload };
        default:
            return state;
    }
}