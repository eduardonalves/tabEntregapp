import _ from 'lodash';
import axios from 'react-native-axios';

import { Actions } from 'react-redux';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import {
    CATEGORIA_CARREGADA_OK,
    CATEGORIA_CARREGADA_FALHA,
    ADICIONA_PRODUTO,
    ATUALIZA_ITEM_ID,
    REMOVE_PRODUTO,
    ATUALIZA_TOTAL_CARRINHO,
    ATUALIZA_QTD,
    CARREGA_INFO_MODAL,
    SHOW_MODAL,
    ATUALIZA_OBS,
    ATUALIZA_FORMA_PAGAMENTO,
    ATUALIZA_TROCO,
    PEDIDO_NAO_OK,
    PEDIDO_OK,
    CARREGA_TIPOS_PAGAMENTO_OK,
    CARREGA_TIPOS_PAGAMENTO_FALHA,
    PODE_ENVIAR_PEDIDO,
    STATUS_ENVIO_PEDIDO,
    SHOW_LOADER,
    LIMPA_CARRINHO,
    LIMPA_QTD_CARRINHO,
    LIMPA_TOTAL_CARRINHO,
    SHOW_LOADER_CATEGORIA,
    SHOW_LOADER_PRODUTO,
    PEDIDO_CARREGADO_OK,
    PEDIDO_CARREGADO_FALHA,
    MEUS_PEDIDOS_CARREGADOS_OK,
    MEUS_PEDIDOS_CARREGADOS_FALHA,
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_CONFIRMA_SENHA,
    MODIFICA_NOME,
    MODIFICA_CEP,
    MODIFICA_ENDERECO,
    MODIFICA_NUMERO,
    MODIFICA_COMPLEMENTO,
    MODIFICA_PONTO_REFERENCIA,
    MODIFICA_ESTADO,
    MODIFICA_CIDADE,
    MODIFICA_BAIRRO,
    MODIFICA_TELEFONE,
    CADASTRO_USUARIO,
    CONFIRMA_SENHA
} from './ActionTypes';

import {
    APP_URL,
    FILIAL,
    EMPRESA,
    SEM_DESCRICAO,
    SALT
} from '../Settings'



export const pedidosViewFetch = (cliente, token, atendimento ) => {
    return dispatch => {
        dispatch({ type: PEDIDO_CARREGADO_OK, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/entregapp_sistema/RestAtendimentos/viewmobile.json?a=${atendimento}&fp=${FILIAL}&lj=${EMPRESA}&b=${cliente}&c=${token}&limit=20`)
            .then(res => {

                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: PEDIDO_CARREGADO_OK, payload: res.data.resultados });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: PEDIDO_CARREGADO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                 dispatch({ type: PEDIDO_CARREGADO_FALHA, payload: true });
                 dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}

export const pedidosFetch = (cliente, token ) => {
    return dispatch => {
        dispatch({ type: MEUS_PEDIDOS_CARREGADOS_OK, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/entregapp_sistema/RestAtendimentos/indexmobile.json?fp=${FILIAL}&lj=${EMPRESA}&clt=${cliente}&token=${token}&limit=20`)
            .then(res => {
                //console.log(res);
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: MEUS_PEDIDOS_CARREGADOS_OK, payload: res.data.resultados });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: MEUS_PEDIDOS_CARREGADOS_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                 dispatch({ type: MEUS_PEDIDOS_CARREGADOS_FALHA, payload: true });
                 dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}

export const categoriasFetch = () => {
    return dispatch => {
        dispatch({ type: CATEGORIA_CARREGADA_OK, payload: [] });
        dispatch({ type: SHOW_LOADER_CATEGORIA, payload: true });
        axios.get(`${APP_URL}/entregapp_sistema/RestCategorias/catsmobile.json?fp=${FILIAL}`)
            .then(res => {

                if (typeof res.data.categorias != 'undefined') {
                    dispatch({ type: CATEGORIA_CARREGADA_OK, payload: res.data.categorias });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER_CATEGORIA, payload: false });

            }).catch(error => {
                 dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: true });
                 dispatch({ type: SHOW_LOADER_CATEGORIA, payload: false });
            });
    }
}


export const tiposPagamentoFetch = () => {
    return dispatch => {

        axios.get(`${APP_URL}/entregapp_sistema/RestPagamentos/pagamentosmobile.json?fp=${FILIAL}`)
            .then(res => {
                
                if (typeof res.data.pagamentos != 'undefined') {
                    return dispatch({ type: CARREGA_TIPOS_PAGAMENTO_OK, payload: res.data.pagamentos });
                } else {
                    //  console.log('deu erro');
                    return dispatch({ type: CARREGA_TIPOS_PAGAMENTO_FALHA, payload: false });
                }


            }).catch(error => {
                //console.log('error');
                //console.log(error);
                return dispatch({ type: CARREGA_TIPOS_PAGAMENTO_FALHA, payload: false });
            });
    }
}

export const addToCart = (produto, carrinho) => {
    carrinho.push(produto);
    let total = updateCart(carrinho);
    return dispatch => {
        dispatch({ type: ADICIONA_PRODUTO, payload: carrinho })
        dispatch({ type: ATUALIZA_TOTAL_CARRINHO, payload: total })
    }
}

export const updateItemId = (item_id) => {

    return dispatch => {
        return dispatch({ type: ATUALIZA_ITEM_ID, payload: item_id + 1 });
    }
}

export const removeFromCart = (item_id, carrinho) => {
    newItem = [];
    carrinho.map((item) => {
        if (item.item_id != item_id) {
            newItem.push(item);
        }
    });
    let total = updateCart(newItem);
    return dispatch => {
        dispatch({ type: REMOVE_PRODUTO, payload: newItem })
        dispatch({ type: ATUALIZA_TOTAL_CARRINHO, payload: total })

    }
}


export const updateCartQtd = (qtd) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_QTD, payload: qtd })
    }
}


export const updateCart = (carrinho) => {
    let total = 0;
    
    carrinho.map((item) => {
        total += item.preco_venda * item.qtd;

    });
    return total;
}

export const loadInfoModal = (content) => {
    if (typeof content == 'undefined') {
        content = SEM_DESCRICAO;
    }
    if (content == '') {
        content = SEM_DESCRICAO;
    }

    return dispatch => {
        return dispatch({ type: CARREGA_INFO_MODAL, payload: content });
    }
}
export const setModalVisible = (status, content) => {
    if (typeof content == 'undefined') {
        content = SEM_DESCRICAO;
    }
    if (content == '') {
        content = SEM_DESCRICAO;
    }
    return dispatch => {
        dispatch({ type: SHOW_MODAL, payload: status });
        dispatch({ type: CARREGA_INFO_MODAL, payload: content });
    }
}

export const atualizaTroco = (troco) => {
    return dispatch => {
        console.log('troco');
        console.log(troco);
        dispatch({ type: ATUALIZA_TROCO, payload: troco })
    }
}

export const atualizaObs = (obs) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_OBS, payload: obs })
    }
}

export const atualizaFormaDePagamento = (pagamento) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_FORMA_PAGAMENTO, payload: pagamento })
    }
}

export const enviaPedido = (pedido) => {
   
    /*return dispatch => {
        dispatch({ type: PEDIDO_OK, payload: true })
    }*/

    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });
        let meuPedido = montaPedido(pedido);
        
        axios.post(`${APP_URL}/entregapp_sistema/RestPedidos/addmobile.json`, meuPedido)
        .then(res => {
            //console.log('passou aqui2 ok');
            dispatch({ type: SHOW_LOADER, payload: false });
            
            
            dispatch({ type: LIMPA_QTD_CARRINHO, payload: 0 });
            
            dispatch({ type: LIMPA_CARRINHO, payload: [] });
            dispatch({ type: LIMPA_TOTAL_CARRINHO, payload: 0 });
            dispatch({ type: PEDIDO_OK, payload: true });
            //dispatch(NavigationActions.navigate({ routeName: 'Restaurants' }));
            Alert.alert(
                'Mensagem',
                `Pedido enviado com sucesso!`,
                [
                  {
                    text: 'OK',
                    onPress: () => limpaCarrinho(),
                    style: 'OK',
                  },
                ],
                { cancelable: false },
              );
            //dispatch(NavigationActions.navigate({ routeName: 'Restaurants' }));
        }).catch(error => {
            //console.log('passou aqui2 nok');
            dispatch({ type: SHOW_LOADER, payload: false });
             dispatch({ type: PEDIDO_NAO_OK, payload: false });
        });
       
    }
}

export const showMyLoader = (status) => {
    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: status })
    }
}

export const showMyLoaderCategory = (status) => {
    return dispatch => {
        dispatch({ type: SHOW_LOADER_CATEGORIA, payload: status })
    }
}



export const setStatusEnvioPedido = (status) => {
    
    return dispatch => {
        //console.log('STATUS_ENVIO_PEDIDO');
        //console.log(status);
        dispatch({ type: STATUS_ENVIO_PEDIDO, payload: status });
        
    }
}
export const montaPedido = (pedido) => {
    let novoPedido = {
        Pedido:{
            filial_id:  FILIAL,
            a: "entrega",
            cliente_id: 17,
            empresa_id: EMPRESA,
            pagamento_id:1,
            trocovalor: 0,
            trocoresposta:"Não",
            entrega_valor:0,
            salt: SALT,
            token:"k1wt0x33kg",
            obs:"",
            user_id: 1

        },
        Itensdepedido:[],
    }
    let itensPedido = pedido.carrinho.map((v, k) => {
       
        let p_total = v.preco_venda * v.qtd;
        novoPedido.Itensdepedido.push({
            produto_id:v.id,
            qtde: v.qtd,
            valor_unit: v.preco_venda,
            valor_total: p_total.toFixed(2),
            obs_sis:"",
        });
    });
    return novoPedido;
}

export const limpaCarrinho = () => {
    
    return dispatch => {
        dispatch({ type: LIMPA_CARRINHO, payload: [] });
        dispatch({ type: LIMPA_QTD_CARRINHO, payload: 0 });
        dispatch({ type: LIMPA_TOTAL_CARRINHO, payload: 0 });
    }
}

export const modificaEmail = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_EMAIL, payload: texto });
       
    }
}

export const modificaSenha = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_SENHA, payload: texto });
    }
}

export const modificaConfirmaSenha = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_CONFIRMA_SENHA, payload: texto });
    }
}
export const modificaNome = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_NOME, payload: texto });
    }
}

export const autenticarUsuario = () => {
    return dispatch => {
        dispatch({ type: LIMPA_CARRINHO, payload: [] });
    }
}



export const modificaCep = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_CEP, payload: texto });
    }
}

export const modificaEndereco = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_ENDERECO, payload: texto });
    }
}

export const modificaNumero = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_NUMERO, payload: texto });
    }
}

export const modificaComplemento = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_COMPLEMENTO, payload: texto });
    }
}

export const modificaPontoReferencia = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_PONTO_REFERENCIA, payload: texto });
    }
}

export const modificaEstado = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_ESTADO, payload: texto });
    }
}

export const modificaCidade = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_CIDADE, payload: texto });
    }
}

export const modificaBairro = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_BAIRRO, payload: texto });
    }
}

export const modificaTelefone = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_TELEFONE, payload: texto });
    }
}

