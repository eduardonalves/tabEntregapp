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
    CADASTRO_USUARIO_ERRO,
    CADASTRO_USUARIO_SUCESSO,
    CARREGA_ESTADO,
    CARREGA_ESTADO_FALHA,
    CARREGA_CIDADE,
    CARREGA_CIDADE_FALHA,
    CARREGA_BAIRRO ,
    CARREGA_BAIRRO_FALHA,
    LIMPA_CIDADE,
    LIMPA_BAIRRO,
    LIMPA_ESTADO
} from './ActionTypes';

import {
    APP_URL,
    FILIAL,
    EMPRESA,
    SEM_DESCRICAO,
    SALT
} from '../Settings'


export const autenticarUsuario = (usuario) => {
   

    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });
        
        
        axios.post(`${APP_URL}/entregapp_sistema/RestClientes/loginmobile.json`, usuario)
        .then(res => {
            //console.log('res login');
            //console.log(res);
            if(typeof res.data.ultimopedido != 'undefined'){
                if(res.data.ultimopedido == 'ErroLogin'){
                    Alert.alert(
                        'Mensagem',
                        `Ops, houve um erro ao tentar te autenticar, provalvelmente seu usuário ou senha estão errados, por favor tente novamente!`,
                        [
                          {
                            text: 'OK',
                            style: 'OK',
                          },
                        ],
                        { cancelable: false },
                      );
                }else{
                    dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimopedido.Cliente });
                }
                
            }
            dispatch({ type: SHOW_LOADER, payload: false });
            dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
        }).catch(error => {
            //console.log('error');
            //console.log(error);
            dispatch({ type: SHOW_LOADER, payload: false });
             dispatch({ type: CADASTRO_USUARIO_ERRO, payload: true });
        });
       
    }
}



export const cadastraUsuario = (usuario) => {
   

    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });
        
        
        axios.post(`${APP_URL}/entregapp_sistema/RestClientes/addmobile.json`, usuario)
        .then(res => {
            //console.log('res');
            //console.log(res);
            if(res.data.ultimocliente=="ErroUsuarioDuplo"){
                Alert.alert(
                    'Mensagem',
                    `Ops, este nome de usuário já não está mais disponível, por favor, escolha outro nome de usuário!`,
                    [
                      {
                        text: 'OK',
                        style: 'OK',
                      },
                    ],
                    { cancelable: false },
                  );
                dispatch({ type: SHOW_LOADER, payload: false });
                
                dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
            }else if( res.data.ultimocliente =="Erro"){
                Alert.alert(
                    'Mensagem',
                    `Ops, houve um erro ao tentar te cadastrar, por favor, tente novamente mais tarde!`,
                    [
                      {
                        text: 'OK',
                        style: 'OK',
                      },
                    ],
                    { cancelable: false },
                  );
                  dispatch({ type: SHOW_LOADER, payload: false });
                    
                dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
            }else{
                //dispatch({ type: SHOW_LOADER, payload: false });
                //dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
                //dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimocliente  });
                let dadosUsuario = {
                    username:usuario.Cliente.username,
                    password:usuario.Cliente.password,
                    salt:usuario.Cliente.salt,
                    empresa: usuario.Cliente.empresa_id,
                    filial: usuario.Cliente.filial_id
                };
                axios.post(`${APP_URL}/entregapp_sistema/RestClientes/loginmobile.json`, dadosUsuario)
                .then(res => {
                    
                    if(typeof res.data.ultimopedido != 'undefined'){
                        dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimopedido.Cliente });
                    }
                    
                    dispatch({ type: SHOW_LOADER, payload: false });
                    dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
                }).catch(error => {
                    //console.log(error);
                    dispatch({ type: SHOW_LOADER, payload: false });
                    dispatch({ type: CADASTRO_USUARIO_ERRO, payload: true });
                });

                //dispatch(NavigationActions.navigate({ routeName: 'RoutesLogin' }));
                /*Alert.alert(
                    'Mensagem',
                    `Parabéns, \n Seu cadastro foi efetuado com sucesso! Agora você já pode fazer seus pedidos.`,
                    [
                    {
                        text: 'OK',
                        style: 'OK',
                    },
                    ],
                    { cancelable: false },
                );*/
            }
            
            
        }).catch(error => {
            //console.log(error);
            
            dispatch({ type: SHOW_LOADER, payload: false });
             dispatch({ type: CADASTRO_USUARIO_ERRO, payload: true });
        });
       
    }
}

export const estadosFetch = () => {
    return dispatch => {
        dispatch({ type: CARREGA_ESTADO, payload: [] });
        dispatch({ type: CARREGA_CIDADE, payload: [] });
        dispatch({ type: CARREGA_BAIRRO, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/entregapp_sistema/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=e`)
            .then(res => {
               
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_ESTADO, payload: res.data.resultados });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: CARREGA_ESTADO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                 dispatch({ type: CARREGA_ESTADO_FALHA, payload: true });
                 dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}

export const cidadesFetch = (estado) => {
    return dispatch => {
        dispatch({ type: CARREGA_CIDADE, payload: [] });
        dispatch({ type: CARREGA_BAIRRO, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/entregapp_sistema/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=c&e=${estado}`)
            .then(res => {
                //console.log('res cidade');
                //console.log(res);
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_CIDADE, payload: res.data.resultados });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: CARREGA_CIDADE_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                 dispatch({ type: CARREGA_CIDADE_FALHA, payload: true });
                 dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}

export const bairroFetch = (cidade) => {
    return dispatch => {
        dispatch({ type: CARREGA_BAIRRO, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/entregapp_sistema/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=b&c=${cidade}`)
            .then(res => {
                //console.log(res);
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_BAIRRO, payload: res.data.resultados });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: CARREGA_BAIRRO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                 dispatch({ type: CARREGA_BAIRRO_FALHA, payload: true });
                 dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}

export const limpaListaCidades = () => {
    return dispatch => {
        dispatch({ type: LIMPA_CIDADE, payload: [] })
    }
}

export const limpaListaBairros = () => {
    return dispatch => {
        dispatch({ type: LIMPA_BAIRRO, payload: [] })
    }
}

export const limpaListaEstados = () => {
    return dispatch => {
        dispatch({ type: LIMPA_ESTADO, payload: [] })
    }
}

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

export const addToCart = (produto, carrinho, frete = 0) => {
    carrinho.push(produto);
    let total = updateCart(carrinho, frete);
    total = total;
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

export const removeFromCart = (item_id, carrinho, frete=0) => {
    let newItem = [];
    carrinho.map((item) => {
        if (item.item_id != item_id) {
            newItem.push(item);
        }
    });
    let total = updateCart(newItem, frete);
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


export const updateCart = (carrinho, frete) => {
    let total = frete;
    total  = parseFloat(total);
    
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

export const setStatusCadastroUsuario = (status) => {
    
    return dispatch => {
        //console.log('STATUS_ENVIO_PEDIDO');
        //console.log(status);
        dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: status });
        
    }
}
export const montaPedido = (pedido) => {
    //console.log(pedido);
    let novoPedido = {
        Pedido:{
            filial_id:  FILIAL,
            a: "entrega",
            cliente_id: pedido.cliente_id,
            empresa_id: EMPRESA,
            pagamento_id:pedido.pagamento_id,
            trocovalor: '',
            trocoresposta: pedido.trocoresposta,
            entrega_valor:0,
            salt: SALT,
            token:pedido.token,
            obs: pedido.obs,
            entrega_valor: pedido.entrega_valor

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
        dispatch({ type: ATUALIZA_FORMA_PAGAMENTO, payload: '' });
        dispatch({ type: ATUALIZA_TROCO, payload: '' });
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

