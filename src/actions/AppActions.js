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
    CARREGA_BAIRRO,
    CARREGA_BAIRRO_FALHA,
    LIMPA_CIDADE,
    LIMPA_BAIRRO,
    LIMPA_ESTADO,
    MODIFICA_USERNAME,
    MODIFICA_SENHA_ANTIGA,
    MODIFICA_ID_USUARIO,
    USUARIO_ATUALIZOU_CADASTRO,
    MODIFICA_NOME_ESTADO,
    MODIFICA_NOME_CIDADE,
    MODIFICA_NOME_BAIRRO,
    IS_VALID_TOKEN,
    DADOS_PREMIO,
    INICIOU_PARTIDA,
    DADOS_PARTIDA,
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
} from './ActionTypes';

import {
    APP_URL,
    FILIAL,
    EMPRESA,
    SEM_DESCRICAO,
    SALT
} from '../Settings'

export const modificaTokenNotificacao = (txt) => {
    return dispatch => {
        dispatch({ type: TOKEN_NOTIFICACAO, payload: txt })
    }
}

export const modificaMensagem = (txt) => {
    return dispatch => {
        dispatch({ type: MESSAGE_TEXT, payload: txt })
    }
}

export const modificaNotificacao = (notofication) => {
    return dispatch => {
        dispatch({ type: NOTIFICATION, payload: notofication })
    }
}

export const autenticarUsuario = (usuario) => {


    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });

        let loadError = false;
        let interval;
        let passouOk = false;


        axios.post(`${APP_URL}/RestClientes/loginmobile.json`, usuario)
            .then(res => {

                loadError = false;
                if (typeof res.data.ultimopedido != 'undefined') {
                    if (res.data.ultimopedido == 'ErroLogin') {

                        clearInterval(interval);
                        
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
                    } else {

                        clearInterval(interval);
                        dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimopedido.Cliente });
                        dispatch({ type: IS_VALID_TOKEN, payload: 'OK' });
                    }

                }
                //console.log('res');
                //console.log(res);
                dispatch({ type: SHOW_LOADER, payload: false });
                dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
                passouOk = true;
            }).catch(error => {
                loadError = true;
                passouOk = true;
                //console.log('error');
                //console.log(error);
                if (loadError == true) {
                    interval = setInterval(() => {

                        autenticarUsuario(usuario);
                    }, 10000);
                }

            });

        if (passouOk == false) {
            let contVezesErrou = 0;
            interval = setInterval(() => {
                contVezesErrou += 1;


                if (contVezesErrou < 5) {
                    axios.post(`${APP_URL}/RestClientes/loginmobile.json`, usuario)
                        .then(res => {
                            //console.log('res');
                           // console.log(res);
                            loadError = false;
                            if (typeof res.data.ultimopedido != 'undefined') {
                                if (res.data.ultimopedido == 'ErroLogin') {

                                    clearInterval(interval);
                                    clearInterval(interval);
                                    Alert.alert(
                                        'Mensagem',
                                        `Ops, houve um erro ao tentar autenticar seu usuário, provalvelmente seu usuário ou senha estão errados, por favor tente novamente!`,
                                        [
                                            {
                                                text: 'OK',
                                                style: 'OK',
                                            },
                                        ],
                                        { cancelable: false },
                                    );
                                } else {

                                    clearInterval(interval);
                                    dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimopedido.Cliente });
                                }

                            }
                            dispatch({ type: SHOW_LOADER, payload: false });
                            dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
                            passouOk = true;
                        });
                } else {
                    //console.log()
                    clearInterval(interval);
                    passouOk = true;
                    loadError = false;
                    clearInterval(interval);
                    Alert.alert(
                        'Mensagem',
                        `Ops, houve um erro ao tentar ao tentar autenticar seu usuário, por favor, verifique sua internet e tente novamente, caso isto não funcione, por favor entre em contato com a loja! Obrigado ;-D`,
                        [
                            {
                                text: 'OK',
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }
                dispatch({ type: SHOW_LOADER, payload: false });
            }, 10000);
        }

    }
}

export const recuperarSenha = (usuario) => {


    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });
        let loadError = false;
        let interval;
        let passouOk = false;

        axios.post(`${APP_URL}/RestClientes/recuperarsenha.json`, usuario)
            .then(res => {
                loadError = false;
                passouOk = true;
                clearInterval(interval);
                if (typeof res.data.ultimocliente != 'undefined') {
                    if (res.data.ultimocliente == 'ok') {
                        Alert.alert(
                            'Mensagem',
                            `Sucesso, enviamos um link de recuperação de senha para seu e-mail cadastrado `,
                            [
                                {
                                    text: 'OK',
                                    style: 'OK',
                                },
                            ],
                            { cancelable: false },
                        );
                    } else {
                        Alert.alert(
                            'Mensagem',
                            `Ops, não encontramos seu usuário`,
                            [
                                {
                                    text: 'OK',
                                    style: 'OK',
                                },
                            ],
                            { cancelable: false },
                        );
                    }

                }

                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {

                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                passouOk = true;
                if (loadError == true) {
                    interval = setInterval(() => {

                        recuperarSenha(usuario);
                    }, 10000);
                }

            });

        if (passouOk == false) {
            let contVezesErrou = 0;
            interval = setInterval(() => {
                contVezesErrou += 1;


                if (contVezesErrou < 5) {
                    axios.post(`${APP_URL}/RestClientes/recuperarsenha.json`, usuario)
                        .then(res => {
                            loadError = false;
                            passouOk = true;
                            clearInterval(interval);

                            if (typeof res.data.ultimocliente != 'undefined') {
                                if (res.data.ultimocliente == 'ok') {
                                    Alert.alert(
                                        'Mensagem',
                                        `Sucesso, enviamos um link de recuperação de senha para seu e-mail cadastrado `,
                                        [
                                            {
                                                text: 'OK',
                                                style: 'OK',
                                            },
                                        ],
                                        { cancelable: false },
                                    );
                                } else {
                                    Alert.alert(
                                        'Mensagem',
                                        `Ops, não encontramos seu usuário`,
                                        [
                                            {
                                                text: 'OK',
                                                style: 'OK',
                                            },
                                        ],
                                        { cancelable: false },
                                    );
                                }

                            }
                            dispatch({ type: SHOW_LOADER, payload: false });

                        }).catch(error => {

                            //dispatch({ type: SHOW_LOADER, payload: false });
                            loadError = true;
                            passouOk = true;
                            if (loadError == true) {
                                interval = setInterval(() => {

                                    recuperarSenha(usuario);
                                }, 10000);
                            }

                        });
                } else {
                    clearInterval(interval);
                    passouOk = true;
                    loadError = false;
                    dispatch({ type: SHOW_LOADER, payload: false });
                    clearInterval(interval);
                    Alert.alert(
                        'Mensagem',
                        `Ops, houve um erro ao tentar ao tentar recuperar sua senha, por favor, verifique sua internet e tente novamente, caso isto não funcione, por favor entre em contato com a loja! Obrigado ;-D`,
                        [
                            {
                                text: 'OK',
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }

            }, 10000);
        }

    }
}

export const cadastraUsuarioEdit = (usuario) => {


    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });
        dispatch({ type: USUARIO_ATUALIZOU_CADASTRO, payload: false });
        dispatch({ type: CARREGA_ESTADO_FALHA, payload: false });



        axios.post(`${APP_URL}/RestClientes/addmobile.json`, usuario)
            .then(res => {

                if (res.data.ultimocliente == "ErroUsuarioDuplo") {
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
                } else if (res.data.ultimocliente == "Erro") {
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
                } else {
                    dispatch({ type: SHOW_LOADER, payload: false });
                    dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
                    dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimocliente.Cliente });
                    dispatch({ type: USUARIO_ATUALIZOU_CADASTRO, payload: true });

                    Alert.alert(
                        'Mensagem',
                        `Parabéns, seu  cadastro foi atualizado!`,
                        [
                            {
                                text: 'OK',
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }

            }).catch(error => {

                dispatch({ type: SHOW_LOADER, payload: false });
                dispatch({ type: CADASTRO_USUARIO_ERRO, payload: true });

            });

    }
}

export const cadastraUsuarioEditComSenha = (usuario) => {


    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });
        dispatch({ type: USUARIO_ATUALIZOU_CADASTRO, payload: false });
        dispatch({ type: CARREGA_ESTADO_FALHA, payload: false });

        axios.post(`${APP_URL}/RestClientes/addmobile.json`, usuario)
            .then(res => {

                if (res.data.ultimocliente == "ErroUsuarioDuplo") {
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
                } else if (res.data.ultimocliente == "Erro") {
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
                } else {

                    let dadosUsuario = {
                        username: usuario.Cliente.username,
                        password: usuario.Cliente.password,
                        salt: usuario.Cliente.salt,
                        empresa: usuario.Cliente.empresa_id,
                        filial: usuario.Cliente.filial_id
                    };
                    axios.post(`${APP_URL}/RestClientes/loginmobile.json`, dadosUsuario)
                        .then(res => {

                            if (typeof res.data.ultimopedido != 'undefined') {
                                dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimopedido.Cliente });
                            }

                            dispatch({ type: SHOW_LOADER, payload: false });
                            dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
                            dispatch({ type: USUARIO_ATUALIZOU_CADASTRO, payload: true });
                        }).catch(error => {

                            dispatch({ type: SHOW_LOADER, payload: false });
                            dispatch({ type: CADASTRO_USUARIO_ERRO, payload: true });
                        });

                    //dispatch(NavigationActions.navigate({ routeName: 'RoutesLogin' }));
                    Alert.alert(
                        'Mensagem',
                        `Parabéns, \n Seu cadastro foi atualizado!`,
                        [
                            {
                                text: 'OK',
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }


            }).catch(error => {


                dispatch({ type: SHOW_LOADER, payload: false });
                dispatch({ type: CADASTRO_USUARIO_ERRO, payload: true });
            });

    }
}

export const cadastraUsuario = (usuario) => {


    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });


        axios.post(`${APP_URL}/RestClientes/addmobile.json`, usuario)
            .then(res => {

                if (res.data.ultimocliente == "ErroUsuarioDuplo") {
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
                } else if (res.data.ultimocliente == "Erro") {
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
                } else {

                    let dadosUsuario = {
                        username: usuario.Cliente.username,
                        password: usuario.Cliente.password,
                        salt: usuario.Cliente.salt,
                        empresa: usuario.Cliente.empresa_id,
                        filial: usuario.Cliente.filial_id
                    };
                    axios.post(`${APP_URL}/RestClientes/loginmobile.json`, dadosUsuario)
                        .then(res => {

                            if (typeof res.data.ultimopedido != 'undefined') {
                                dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: res.data.ultimopedido.Cliente });
                            }

                            dispatch({ type: SHOW_LOADER, payload: false });
                            dispatch({ type: CADASTRO_USUARIO_ERRO, payload: false });
                        }).catch(error => {

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
        let loadError = false;
        let interval;
        let passouOk = false;
        clearInterval(interval);

        axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=e`)
            .then(res => {
                loadError = false;
                passouOk = true;
                clearInterval(interval);

                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_ESTADO, payload: res.data.resultados });
                } else {

                    dispatch({ type: CARREGA_ESTADO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                //dispatch({ type: CARREGA_ESTADO_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                passouOk = true;
                clearInterval(interval);
                if (loadError == true) {
                    interval = setInterval(() => {

                        estadosFetchInterval();
                    }, 10000);
                }
            });
        if (passouOk == false) {
            interval = setInterval(() => {

                axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=e`)
                    .then(res => {
                        loadError = false;
                        passouOk = true;
                        clearInterval(interval);

                        if (typeof res.data.resultados != 'undefined') {
                            dispatch({ type: CARREGA_ESTADO, payload: res.data.resultados });
                        } else {

                            dispatch({ type: CARREGA_ESTADO_FALHA, payload: false });
                        }
                        dispatch({ type: SHOW_LOADER, payload: false });

                    }).catch(error => {
                        //dispatch({ type: CARREGA_ESTADO_FALHA, payload: true });
                        //dispatch({ type: SHOW_LOADER, payload: false });
                        loadError = true;
                        passouOk = true;
                        clearInterval(interval);
                        if (loadError == true) {
                            interval = setInterval(() => {

                                estadosFetchInterval();
                            }, 10000);
                        }
                    });
            }, 10000);
        }
        //console.log('continuou');
    }
}
export const estadosFetchInterval = () => {
    return dispatch => {
        
        let loadError = false;
        let interval;
        let passouOk = false;
        clearInterval(interval);

        axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=e`)
            .then(res => {
                loadError = false;
                passouOk = true;
                clearInterval(interval);

                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_ESTADO, payload: res.data.resultados });
                } else {

                    dispatch({ type: CARREGA_ESTADO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                //dispatch({ type: CARREGA_ESTADO_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                passouOk = true;
                clearInterval(interval);
                if (loadError == true) {
                    interval = setInterval(() => {

                        estadosFetchInterval();
                    }, 10000);
                }
            });
        if (passouOk == false) {
            interval = setInterval(() => {

                axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=e`)
                    .then(res => {
                        loadError = false;
                        passouOk = true;
                        clearInterval(interval);

                        if (typeof res.data.resultados != 'undefined') {
                            dispatch({ type: CARREGA_ESTADO, payload: res.data.resultados });
                        } else {

                            dispatch({ type: CARREGA_ESTADO_FALHA, payload: false });
                        }
                        dispatch({ type: SHOW_LOADER, payload: false });

                    }).catch(error => {
                        //dispatch({ type: CARREGA_ESTADO_FALHA, payload: true });
                        //dispatch({ type: SHOW_LOADER, payload: false });
                        loadError = true;
                        passouOk = true;
                        clearInterval(interval);
                        if (loadError == true) {
                            interval = setInterval(() => {

                                estadosFetchInterval();
                            }, 10000);
                        }
                    });
            }, 10000);
        }
        //console.log('continuou');
    }
}
export const cidadesFetch = (estado) => {
    return dispatch => {
        dispatch({ type: CARREGA_CIDADE, payload: [] });
        dispatch({ type: CARREGA_BAIRRO, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        let loadError = false;
        let interval;
        let passouOk = false;
        clearInterval(interval);

        axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=c&e=${estado}`)
            .then(res => {
                loadError = false;
                passouOk = true;
                clearInterval(interval);
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_CIDADE, payload: res.data.resultados });
                } else {

                    dispatch({ type: CARREGA_CIDADE_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                //dispatch({ type: CARREGA_CIDADE_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                passouOk = true;
                clearInterval(interval);
                if (loadError == true) {
                    interval = setInterval(() => {

                        cidadesFetchInterval(estado);
                    }, 10000);
                }
            });
        if (passouOk == false) {
            interval = setInterval(() => {
                axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=c&e=${estado}`)
                    .then(res => {
                        loadError = false;
                        passouOk = true;
                        clearInterval(interval);
                        if (typeof res.data.resultados != 'undefined') {
                            dispatch({ type: CARREGA_CIDADE, payload: res.data.resultados });
                        } else {

                            dispatch({ type: CARREGA_CIDADE_FALHA, payload: false });
                        }
                        dispatch({ type: SHOW_LOADER, payload: false });

                    }).catch(error => {
                        //dispatch({ type: CARREGA_CIDADE_FALHA, payload: true });
                        //dispatch({ type: SHOW_LOADER, payload: false });
                        loadError = true;
                        passouOk = true;
                        clearInterval(interval);
                        if (loadError == true) {
                            interval = setInterval(() => {

                                cidadesFetchInterval(estado);
                            }, 10000);
                        }
                    });

            }, 10000);
        }
    }
}

export const cidadesFetchInterval = (estado) => {
    return dispatch => {
       
        let loadError = false;
        let interval;
        let passouOk = false;
        clearInterval(interval);

        axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=c&e=${estado}`)
            .then(res => {
                loadError = false;
                passouOk = true;
                clearInterval(interval);
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_CIDADE, payload: res.data.resultados });
                } else {

                    dispatch({ type: CARREGA_CIDADE_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                //dispatch({ type: CARREGA_CIDADE_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                passouOk = true;
                clearInterval(interval);
                if (loadError == true) {
                    interval = setInterval(() => {

                        cidadesFetchInterval(estado);
                    }, 10000);
                }
            });
        if (passouOk == false) {
            interval = setInterval(() => {
                axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=c&e=${estado}`)
                    .then(res => {
                        loadError = false;
                        passouOk = true;
                        clearInterval(interval);
                        if (typeof res.data.resultados != 'undefined') {
                            dispatch({ type: CARREGA_CIDADE, payload: res.data.resultados });
                        } else {

                            dispatch({ type: CARREGA_CIDADE_FALHA, payload: false });
                        }
                        dispatch({ type: SHOW_LOADER, payload: false });

                    }).catch(error => {
                        //dispatch({ type: CARREGA_CIDADE_FALHA, payload: true });
                        //dispatch({ type: SHOW_LOADER, payload: false });
                        loadError = true;
                        passouOk = true;
                        clearInterval(interval);
                        if (loadError == true) {
                            interval = setInterval(() => {

                                cidadesFetchInterval(estado);
                            }, 10000);
                        }
                    });

            }, 10000);
        }
    }
}

export const bairroFetch = (cidade) => {
    return dispatch => {
        dispatch({ type: CARREGA_BAIRRO, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        let loadError = false;
        let interval;
        let passouOk = false;
        clearInterval(interval);

        axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=b&c=${cidade}`)
            .then(res => {
                loadError = false;
                passouOk = true;
                clearInterval(interval);
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_BAIRRO, payload: res.data.resultados });
                } else {

                    dispatch({ type: CARREGA_BAIRRO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                //dispatch({ type: CARREGA_BAIRRO_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                passouOk = true;
                clearInterval(interval);
                if (loadError == true) {
                    interval = setInterval(() => {
                        bairroFetchInterval(cidade);
                    }, 10000);
                }
            });
        if (passouOk == false) {
            interval = setInterval(() => {
                axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=b&c=${cidade}`)
                    .then(res => {
                        loadError = false;
                        passouOk = true;
                        clearInterval(interval);
                        if (typeof res.data.resultados != 'undefined') {
                            dispatch({ type: CARREGA_BAIRRO, payload: res.data.resultados });
                        } else {

                            dispatch({ type: CARREGA_BAIRRO_FALHA, payload: false });
                        }
                        dispatch({ type: SHOW_LOADER, payload: false });

                    }).catch(error => {
                        //dispatch({ type: CARREGA_BAIRRO_FALHA, payload: true });
                        //dispatch({ type: SHOW_LOADER, payload: false });
                        loadError = true;
                        passouOk = true;
                        clearInterval(interval);
                        if (loadError == true) {
                            interval = setInterval(() => {
                                bairroFetchInterval(cidade);
                            }, 10000);
                        }
                    });
            }, 10000);
        }

    }

}

export const bairroFetchInterval = (cidade) => {
    return dispatch => {
        
        let loadError = false;
        let interval;
        let passouOk = false;
        clearInterval(interval);

        axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=b&c=${cidade}`)
            .then(res => {
                loadError = false;
                passouOk = true;
                clearInterval(interval);
                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: CARREGA_BAIRRO, payload: res.data.resultados });
                } else {

                    dispatch({ type: CARREGA_BAIRRO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                //dispatch({ type: CARREGA_BAIRRO_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                passouOk = true;
                clearInterval(interval);
                if (loadError == true) {
                    interval = setInterval(() => {
                        bairroFetchInterval(cidade);
                    }, 10000);
                }
            });
        if (passouOk == false) {
            interval = setInterval(() => {
                axios.get(`${APP_URL}/RestPedidos/getLocalidadePedidos.json?fp=${FILIAL}&p=b&c=${cidade}`)
                    .then(res => {
                        loadError = false;
                        passouOk = true;
                        clearInterval(interval);
                        if (typeof res.data.resultados != 'undefined') {
                            dispatch({ type: CARREGA_BAIRRO, payload: res.data.resultados });
                        } else {

                            dispatch({ type: CARREGA_BAIRRO_FALHA, payload: false });
                        }
                        dispatch({ type: SHOW_LOADER, payload: false });

                    }).catch(error => {
                        //dispatch({ type: CARREGA_BAIRRO_FALHA, payload: true });
                        //dispatch({ type: SHOW_LOADER, payload: false });
                        loadError = true;
                        passouOk = true;
                        clearInterval(interval);
                        if (loadError == true) {
                            interval = setInterval(() => {
                                bairroFetchInterval(cidade);
                            }, 10000);
                        }
                    });
            }, 10000);
        }

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

export const pedidosViewFetch = (cliente, token, atendimento) => {
    return dispatch => {
        dispatch({ type: PEDIDO_CARREGADO_OK, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        let loadError = false;
        let interval;
        axios.get(`${APP_URL}/RestAtendimentos/viewmobile.json?a=${atendimento}&fp=${FILIAL}&lj=${EMPRESA}&b=${cliente}&c=${token}&limit=20`)
            .then(res => {


                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: PEDIDO_CARREGADO_OK, payload: res.data.resultados });
                } else {

                    dispatch({ type: PEDIDO_CARREGADO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });
                loadError = false;
                clearInterval(interval);
                //console.log('limpouuuuuuu');

            }).catch(error => {
                loadError = true;
                if (loadError == true) {
                    interval = setInterval(() => {
                        //console.log('errou voz do Faustão....');
                        pedidosViewFetch(cliente, token, atendimento);
                    }, 10000);
                }

                //dispatch({ type: PEDIDO_CARREGADO_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}


export const pedidosViewFetchInterval = (cliente, token, atendimento) => {
    return dispatch => {
        //dispatch({ type: PEDIDO_CARREGADO_OK, payload: [] });
        //dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/RestAtendimentos/viewmobile.json?a=${atendimento}&fp=${FILIAL}&lj=${EMPRESA}&b=${cliente}&c=${token}&limit=20`)
            .then(res => {

                if (typeof res.data.resultados != 'undefined') {
                    dispatch({ type: PEDIDO_CARREGADO_OK, payload: res.data.resultados });
                } else {

                    //dispatch({ type: PEDIDO_CARREGADO_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });
                //console.log('passou no pedidosViewFetchInterval');

            }).catch(error => {
                //dispatch({ type: PEDIDO_CARREGADO_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}

export const pedidosFetch = (cliente, token) => {
    return dispatch => {
        dispatch({ type: MEUS_PEDIDOS_CARREGADOS_OK, payload: [] });
        dispatch({ type: SHOW_LOADER, payload: true });
        let loadError = false;
        let interval;

        axios.get(`${APP_URL}/RestAtendimentos/indexmobile.json?fp=${FILIAL}&lj=${EMPRESA}&clt=${cliente}&token=${token}&limit=20`)
            .then(res => {

                if (typeof res.data.resultados != 'undefined') {
                    //console.log(res.data.resultados);
                    dispatch({ type: MEUS_PEDIDOS_CARREGADOS_OK, payload: res.data.resultados });
                } else {

                    dispatch({ type: MEUS_PEDIDOS_CARREGADOS_FALHA, payload: false });
                }
                dispatch({ type: SHOW_LOADER, payload: false });

                loadError = false;
                clearInterval(interval);
            }).catch(error => {
                //dispatch({ type: MEUS_PEDIDOS_CARREGADOS_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
                loadError = true;
                if (loadError == true) {
                    interval = setInterval(() => {
                        //console.log('errou voz do Faustão....');
                        pedidosFetch(cliente, token);
                    }, 10000);
                }

            });
    }
}

export const pedidosFetchInverval = (cliente, token) => {
    return dispatch => {
        //dispatch({ type: MEUS_PEDIDOS_CARREGADOS_OK, payload: [] });
        //dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/RestAtendimentos/indexmobile.json?fp=${FILIAL}&lj=${EMPRESA}&clt=${cliente}&token=${token}&limit=20`)
            .then(res => {

                if (typeof res.data.resultados != 'undefined') {
                    //console.log(res.data.resultados);
                    dispatch({ type: MEUS_PEDIDOS_CARREGADOS_OK, payload: res.data.resultados });
                } else {

                    //dispatch({ type: MEUS_PEDIDOS_CARREGADOS_FALHA, payload: false });
                }

                dispatch({ type: SHOW_LOADER, payload: false });

            }).catch(error => {
                //dispatch({ type: MEUS_PEDIDOS_CARREGADOS_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER, payload: false });
            });
    }
}

export const categoriasFetch = () => {
    return dispatch => {
        dispatch({ type: CATEGORIA_CARREGADA_OK, payload: [] });
        dispatch({ type: SHOW_LOADER_CATEGORIA, payload: true });
        let loadError = false;
        let interval;
        axios.get(`${APP_URL}/RestCategorias/catsmobile.json?fp=${FILIAL}`)
            .then(res => {

                if (typeof res.data.categorias != 'undefined') {
                    dispatch({ type: CATEGORIA_CARREGADA_OK, payload: res.data.categorias });
                } else {
                    loadError = true;
                    if (loadError == true) {
                        interval = setInterval(() => {
                            //console.log('errou voz do Faustão....');
                            categoriasFetchInterval();
                        }, 10000);
                    }
                    //dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
                }
                loadError = false;
                clearInterval(interval);

                dispatch({ type: SHOW_LOADER_CATEGORIA, payload: false });

            }).catch(error => {
                loadError = true;
                if (loadError == true) {
                    interval = setInterval(() => {
                        //console.log('errou voz do Faustão....');
                        categoriasFetchInterval();
                    }, 10000);
                }
                //dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER_CATEGORIA, payload: false });
            });
    }
}


export const categoriasFetchInterval = () => {
    return dispatch => {
        //dispatch({ type: CATEGORIA_CARREGADA_OK, payload: [] });
        //dispatch({ type: SHOW_LOADER_CATEGORIA, payload: true });
        let loadError = false;
        let interval;
        axios.get(`${APP_URL}/RestCategorias/catsmobile.json?fp=${FILIAL}`)
            .then(res => {

                if (typeof res.data.categorias != 'undefined') {
                    dispatch({ type: CATEGORIA_CARREGADA_OK, payload: res.data.categorias });
                } else {
                    loadError = true;
                    if (loadError == true) {
                        interval = setInterval(() => {
                            //console.log('errou voz do Faustão....');
                            categoriasFetchInterval();
                        }, 10000);
                    }
                    //dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
                }
                loadError = false;
                clearInterval(interval);

                dispatch({ type: SHOW_LOADER_CATEGORIA, payload: false });

            }).catch(error => {
                loadError = true;
                if (loadError == true) {
                    interval = setInterval(() => {
                        //console.log('errou voz do Faustão....');
                        categoriasFetchInterval();
                    }, 10000);
                }
                //dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: true });
                //dispatch({ type: SHOW_LOADER_CATEGORIA, payload: false });
            });
    }
}

export const freteFetch = (id) => {
    return dispatch => {
        let loadError = false;
        let interval;
        dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/RestClientes/getfrete.json?fp=${FILIAL}&id=${id}`)
            .then(res => {
                clearInterval(interval);
                console.log(`${APP_URL}/RestClientes/getfrete.json?fp=${FILIAL}&id=${id}`);
               

                if (typeof res.data.frete != 'undefined') {
                    //console.log('res.data.frete');
                    //console.log(res.data.frete);
                    dispatch({ type: VALOR_FRETE, payload: res.data.frete });
                } else {

                    dispatch({ type: VALOR_FRETE, payload: 0 });
                }

                dispatch({ type: SHOW_LOADER, payload: false });
            }).catch(error => {
                clearInterval(interval);
                loadError = true;

                if (loadError == true) {
                    interval = setInterval(() => {
                        freteFetch();
                    }, 10000);
                }
            });
        if (loadError == false) {
            interval = setInterval(() => {
                axios.get(`${APP_URL}/RestClientes/getfrete.json?fp=${FILIAL}&id=${id}`)
                    .then(res => {
                        clearInterval(interval);
                        if (typeof res.data.pagamentos != 'undefined') {
                            dispatch({ type: VALOR_FRETE, payload: res.data.frete });
                        } else {

                            dispatch({ type: VALOR_FRETE, payload: 0});
                        }

                        dispatch({ type: SHOW_LOADER, payload: false });
                    }).catch(error => {
                        clearInterval(interval);
                        loadError = true;

                        if (loadError == true) {
                            interval = setInterval(() => {
                                freteFetch();
                            }, 10000);
                        }
                    });
            }, 10000);
        }
    }
}

export const tiposPagamentoFetch = () => {
    return dispatch => {
        let loadError = false;
        let interval;
        dispatch({ type: SHOW_LOADER, payload: true });
        axios.get(`${APP_URL}/RestPagamentos/pagamentosmobile.json?fp=${FILIAL}`)
            .then(res => {
                clearInterval(interval);
                if (typeof res.data.pagamentos != 'undefined') {
                    dispatch({ type: CARREGA_TIPOS_PAGAMENTO_OK, payload: res.data.pagamentos });
                } else {

                    dispatch({ type: CARREGA_TIPOS_PAGAMENTO_FALHA, payload: false });
                }

                dispatch({ type: SHOW_LOADER, payload: false });
            }).catch(error => {
                clearInterval(interval);
                loadError = true;

                if (loadError == true) {
                    interval = setInterval(() => {
                        tiposPagamentoFetch();
                    }, 10000);
                }
            });
        if (loadError == false) {
            interval = setInterval(() => {
                axios.get(`${APP_URL}/RestPagamentos/pagamentosmobile.json?fp=${FILIAL}`)
                    .then(res => {
                        clearInterval(interval);
                        if (typeof res.data.pagamentos != 'undefined') {
                            dispatch({ type: CARREGA_TIPOS_PAGAMENTO_OK, payload: res.data.pagamentos });
                        } else {

                            dispatch({ type: CARREGA_TIPOS_PAGAMENTO_FALHA, payload: false });
                        }

                        dispatch({ type: SHOW_LOADER, payload: false });
                    }).catch(error => {
                        clearInterval(interval);
                        loadError = true;

                        if (loadError == true) {
                            interval = setInterval(() => {
                                tiposPagamentoFetch();
                            }, 10000);
                        }
                    });
            }, 10000);
        }
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

export const removeFromCart = (item_id, carrinho, frete = 0) => {
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
    total = parseFloat(total);

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
    //console.log(pedido);
    return dispatch => {
        dispatch({ type: SHOW_LOADER, payload: true });
        let meuPedido = montaPedido(pedido);
        dispatch({ type: PEDIDO_CARREGADO_OK, payload: [] });
        let loadError = false;
        let passouOk= false;
        let interval;
        
        axios.post(`${APP_URL}/RestPedidos/addmobile.json`, meuPedido)
            .then(res => {
                clearInterval(interval);
                loadError = false;
                passouOk= true;
                
               // console.log(res);


                if(res.data.resultados== "errolojafechada" || res.data.resultados== "" || res.data== ""){
                    Alert.alert(
                        'Mensagem',
                        `Ops, no momento não conseguimos enviar seu pedido porque a loja está fechada.`,
                        [
                            {
                                text: 'OK',
                                //onPress: () => limpaCarrinho(),
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }else if(res.data.resultados== "erro")
                {
                    Alert.alert(
                        'Mensagem',
                        `Houve um erro ao tentar enviar seu pedido, por favor, tente novamente mais tarde. Caso o erro persista, entre em contato com a loja.`,
                        [
                            {
                                text: 'OK',
                                //onPress: () => limpaCarrinho(),
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }else if(res.data.resultados == "erroUsuarioInativo")
                {
                    Alert.alert(
                        'Mensagem',
                        `Houve um erro inesperado ao tentar enviar seu pedido, por favor, tente novamente mais tarde. Caso o erro persista, entre em contato com a loja.`,
                        [
                            {
                                text: 'OK',
                                //onPress: () => limpaCarrinho(),
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }else{

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
                    dispatch({ type: PEDIDO_CARREGADO_OK, payload: res.data.resultados.Pedido });
                    dispatch({ type: LIMPA_QTD_CARRINHO, payload: 0 });
                    dispatch({ type: ATUALIZA_FORMA_PAGAMENTO, payload: '' });
                    dispatch({ type: LIMPA_CARRINHO, payload: [] });
                    dispatch({ type: LIMPA_TOTAL_CARRINHO, payload: 0 });
                    dispatch({ type: PEDIDO_OK, payload: true });

                    
                    
                }
                
                dispatch({ type: SHOW_LOADER, payload: false });
                
                //console.log('res');
                //console.log(res);  
            }).catch(error => {
                //console.log('error');
                //console.log(error);
               // dispatch({ type: PEDIDO_CARREGADO_OK, payload: [] });
                //dispatch({ type: SHOW_LOADER, payload: false });
                //dispatch({ type: PEDIDO_NAO_OK, payload: false });
                clearInterval(interval);
                loadError = true;
                passouOk= true;

                if (loadError == true) {
                    interval = setInterval(() => {
                        enviaPedido(pedido);
                    }, 10000);
                }
            });
            if(passouOk==false){
                interval = setInterval(() => {
                    axios.post(`${APP_URL}/RestPedidos/addmobile.json`, meuPedido)
                    .then(res => {
                        clearInterval(interval);
                        loadError = false;
                        passouOk= true;
                        dispatch({ type: PEDIDO_CARREGADO_OK, payload: res.data.resultados.Pedido });
        
        
        
                        dispatch({ type: LIMPA_QTD_CARRINHO, payload: 0 });
                        dispatch({ type: ATUALIZA_FORMA_PAGAMENTO, payload: '' });
                        dispatch({ type: LIMPA_CARRINHO, payload: [] });
                        dispatch({ type: LIMPA_TOTAL_CARRINHO, payload: 0 });
                        dispatch({ type: PEDIDO_OK, payload: true });
                        dispatch({ type: SHOW_LOADER, payload: false });
        
        
        
        
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
        
                    }).catch(error => {
                       // dispatch({ type: PEDIDO_CARREGADO_OK, payload: [] });
                        //dispatch({ type: SHOW_LOADER, payload: false });
                        //dispatch({ type: PEDIDO_NAO_OK, payload: false });
                        clearInterval(interval);
                        loadError = true;
                        passouOk= true;
        
                        if (loadError == true) {
                            interval = setInterval(() => {
                                enviaPedido(pedido);
                            }, 10000);
                        }
                    });
                }, 10000);
            }

    }
}


export const validaToken = (usuario,token) => {
    return dispatch => {
        
        axios.get(`${APP_URL}/RestClientes/validatoken.json?fp=${FILIAL}&lj=${EMPRESA}&clt=${usuario}&token=${token}&limit=20`)
        .then(res => {
           
           
            
            dispatch({ type: IS_VALID_TOKEN, payload: res.data.users });
        }).catch(error => {
            //console.log('errou cli');
        });
    }
    
}

export const entrarJokenpo = (usuario,token) => {
    return dispatch => {
        
        let dados= {
            fp: FILIAL.toString(),
            lj: EMPRESA.toString(),
            clt: usuario,
            token: token
        }
        //console.log(dados);
        dispatch({type: SHOW_LOADER, payload: true});
        axios.post(`${APP_URL}/RestClientes/validajogos.json?`, dados)
        .then(res => {
            //console.log('res')
            //console.log(res.data.users)
            if(typeof res.data.users != 'undefined'){
                if(res.data.users.resultado=='OK'){
                    if(res.data.users.Partida == ''){
                        dispatch({type: DADOS_PREMIO, payload: res.data.users});
                        dispatch({type: INICIOU_PARTIDA, payload: true});
                        dispatch({type: SALDO, payload: res.data.users.moedas});
                        dispatch({type: DADOS_PARTIDA, payload: ''});
                        dispatch({type: DADOS_PREMIO, payload: ''});
                        dispatch({type: RESULTADO, payload: ''});
                        dispatch({type: TXTCOLOR, payload: 'red'});
                        dispatch({type: ESCOLHA_DO_USUARIO, payload: ''});
                        dispatch({type: ESCOLHA_DO_COMPUTADOR, payload: ''});
                        dispatch({type: SHOW_IMAGE, payload: false});
                        dispatch({type: IMAGEM_COMPUTADOR, payload: require('../../assets/images/pedra.png')});
                        dispatch({type: IMAGEM_USUARIO , payload: require('../../assets/images/pedra.png')});
                        dispatch({type: N_VITORIAS, payload: 0});
                        dispatch({type: N_DERROTAS, payload: 0});
                        dispatch({type: RESULTADO_FINAL, payload: ''})
                    }else{
                       /* dispatch({type: DADOS_PREMIO, payload: res.data.users});
                        dispatch({type: INICIOU_PARTIDA, payload: true});
                        dispatch({type: SALDO, payload: res.data.users.moedas});
                        //dispatch({type: DADOS_PARTIDA, payload: res.data.users.Partida});
                        //dispatch({type: DADOS_PREMIO, payload: ''});
                        dispatch({type: RESULTADO, payload: res.data.users.ultima_parcial});
                        //dispatch({type: TXTCOLOR, payload: 'red'});
                        dispatch({type: ESCOLHA_DO_USUARIO, payload: res.data.users.escolha_usuario});
                        dispatch({type: ESCOLHA_DO_COMPUTADOR, payload: res.data.users.escolha_computador});
                        dispatch({type: SHOW_IMAGE, payload: true});
                        if(res.data.users.escolha_usuario=='Pedra'){
                            dispatch({type: IMAGEM_USUARIO , payload: require('../../assets/images/pedra.png')});    
                        }else if(res.data.users.escolha_usuario=='Teso'){

                        }
                        dispatch({type: IMAGEM_COMPUTADOR, payload: require('../../assets/images/pedra.png')});
                        
                        dispatch({type: N_VITORIAS,  payload: res.data.users.n_vitorias});
                        dispatch({type: N_DERROTAS, payload: res.data.users.n_derrotas});
                        dispatch({type: RESULTADO_FINAL, payload: res.data.users.restultado})*/
                        dispatch({type: INICIOU_PARTIDA, payload: true});

                        let resultado = res.data.users.Partida.ultima_parcial;
                        let imagemComputador = '';
                        let imagemUsuario = '';
                        let txtColor='';
                        
                        if (res.data.users.Partida.escolha_computador == 'Pedra') {
                            imagemComputador = require('../../assets/images/pedra.png');
                        } else if (res.data.users.Partida.escolha_computador == 'Papel') {
                            imagemComputador = require('../../assets/images/papel.png');
                        } else {
                            imagemComputador = require('../../assets/images/tesoura.png');
                        }

                        if (res.data.users.Partida.escolha_usuario == 'Pedra') {
                            imagemUsuario = require('../../assets/images/pedra.png');
                        } else if (res.data.users.Partida.escolha_usuario == 'Papel') {
                            imagemUsuario = require('../../assets/images/papel.png');
                        } else {
                            imagemUsuario = require('../../assets/images/tesoura.png');
                        }

                        //this.setState({  showImage: true, imagemComputador: imagemComputador, imagemUsuario: imagemUsuario })
                        
                        if (resultado == 'Você Ganhou') {
                            txtColor = 'green'
                        } else if (resultado == 'Você Empatou') {
                            txtColor = '#E1AD01'
                        } else {
                            txtColor = 'red'
                        }
                        if(res.data.users.Partida.escolha_usuario =='' || res.data.users.Partida.escolha_usuario ==null){
                            dispatch({ type: SHOW_IMAGE, payload: false })
                        }else{
                            dispatch({ type: SHOW_IMAGE, payload: true })
                        }
                        dispatch({ type: RESULTADO, payload: resultado })
                        
                        dispatch({ type: IMAGEM_COMPUTADOR, payload: imagemComputador })
                        dispatch({ type: IMAGEM_USUARIO, payload: imagemUsuario })
                        
                        if(res.data.users.Partida.n_vitorias != '' && res.data.users.Partida.n_vitorias != null ){
                            dispatch({ type: N_VITORIAS, payload: res.data.users.Partida.n_vitorias })
                        }
                        
                        if(res.data.users.Partida.n_derrotas != '' && res.data.users.Partida.n_derrotas != null){
                            dispatch({ type: N_DERROTAS, payload: res.data.users.Partida.n_derrotas })
                        }

                        if(res.data.users.Partida.restultado != ''&& res.data.users.Partida.restultado != null){
                            dispatch({ type: RESULTADO_FINAL, payload: res.data.users.Partida.restultado })
                            dispatch({ type: INICIOU_PARTIDA, payload: false });
                        }

                        dispatch({ type: TXTCOLOR, payload: txtColor })
                        dispatch({ type: ESCOLHA_DO_COMPUTADOR, payload: res.data.users.Partida.escolha_computador })
                        dispatch({ type: ESCOLHA_DO_USUARIO, payload: res.data.users.Partida.escolha_usuario })
                    }
                    
                    //dispatch({type: SALDO, payload: 0})
   
    

                    //dispatch(NavigationActions.navigate({ routeName: 'Jokenpo' }))
                    
                }else {
                    dispatch({type: INICIOU_PARTIDA, payload: false});
                    dispatch({type: DADOS_PREMIO, payload:''});
                    Alert.alert(
                        'Mensagem',
                        `Ops, acho que você não tem moedas suficientes para jogar.`,
                        [
                            {
                                text: 'OK',
                                style: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }
                
            }
            dispatch({type: SHOW_LOADER, payload: false});
        }).catch(error => {
            //console.log('errou cli');
           // console.log(error);
            dispatch({type: DADOS_PREMIO, payload: ''});
            dispatch({type: INICIOU_PARTIDA, payload: false});
            dispatch({type: SHOW_LOADER, payload: false});
        });
    }
    
}

export const jogarJokenpo = (usuario,token, escolhaUsuario) => {
    return dispatch => {
        
        let dados= {
            fp: FILIAL.toString(),
            lj: EMPRESA.toString(),
            clt: usuario,
            token: token,
            escolhaUsuario:escolhaUsuario,
        }
        //console.log(dados);
        dispatch({ type: SHOW_LOADER, payload: true })
        axios.post(`${APP_URL}/RestClientes/jogarjokenpo.json?`, dados)
        .then(res => {
            
           //console.log('res');
           //console.log(res);
            if(typeof res.data.users !='undefined'){
                if(res.data.users !=''){
                    
                    
                    let resultado = res.data.users.Partida.ultima_parcial;
                    let imagemComputador = '';
                    let imagemUsuario = '';
                    let txtColor='';
                    
                    if (res.data.users.Partida.escolha_computador == 'Pedra') {
                        imagemComputador = require('../../assets/images/pedra.png');
                    } else if (res.data.users.Partida.escolha_computador == 'Papel') {
                        imagemComputador = require('../../assets/images/papel.png');
                    } else {
                        imagemComputador = require('../../assets/images/tesoura.png');
                    }

                    if (res.data.users.Partida.escolha_usuario == 'Pedra') {
                        imagemUsuario = require('../../assets/images/pedra.png');
                    } else if (res.data.users.Partida.escolha_usuario == 'Papel') {
                        imagemUsuario = require('../../assets/images/papel.png');
                    } else {
                        imagemUsuario = require('../../assets/images/tesoura.png');
                    }

                    //this.setState({  showImage: true, imagemComputador: imagemComputador, imagemUsuario: imagemUsuario })
                    
                    if (resultado == 'Você Ganhou') {
                        txtColor = 'green'
                    } else if (resultado == 'Você Empatou') {
                        txtColor = '#E1AD01'
                    } else {
                        txtColor = 'red'
                    }
                 
                    dispatch({ type: RESULTADO, payload: resultado })
                    dispatch({ type: SHOW_IMAGE, payload: true })
                    dispatch({ type: IMAGEM_COMPUTADOR, payload: imagemComputador })
                    dispatch({ type: IMAGEM_USUARIO, payload: imagemUsuario })
                    
                    if(res.data.users.Partida.n_vitorias != '' && res.data.users.Partida.n_vitorias != null ){
                        dispatch({ type: N_VITORIAS, payload: res.data.users.Partida.n_vitorias })
                    }
                    
                    if(res.data.users.Partida.n_derrotas != '' && res.data.users.Partida.n_derrotas != null){
                        dispatch({ type: N_DERROTAS, payload: res.data.users.Partida.n_derrotas })
                    }

                    if(res.data.users.Partida.restultado != ''&& res.data.users.Partida.restultado != null){
                        dispatch({ type: RESULTADO_FINAL, payload: res.data.users.Partida.restultado })
                        dispatch({ type: INICIOU_PARTIDA, payload: false });
                    }

                    dispatch({ type: TXTCOLOR, payload: txtColor })
                    dispatch({ type: ESCOLHA_DO_COMPUTADOR, payload: res.data.users.Partida.escolha_computador })
                    dispatch({ type: ESCOLHA_DO_USUARIO, payload: res.data.users.Partida.escolha_usuario })
                }    
            }
            dispatch({ type: SHOW_LOADER, payload: false })
        }).catch(error => {
            dispatch({ type: SHOW_LOADER, payload: false })
        });
    }
    
}
export const modificaSaldo = (status) => {
    return dispatch => {
        dispatch({ type: SALDO, payload: status })
    }
}
export const verificasaldo = (usuario,token) => {
    return dispatch => {
        
        let dados= {
            fp: FILIAL.toString(),
            lj: EMPRESA.toString(),
            clt: usuario,
            token: token,
        }
        //console.log(dados);
        dispatch({ type: SHOW_LOADER, payload: true })
        axios.post(`${APP_URL}/RestClientes/verificasaldo.json`, dados)
        .then(res => {
            //console.log('res saldo');
            //console.log(res);
            //console.log(dados);
            if(typeof res.data.users !='undefined'){
                if(res.data.users !=''){
                    
                    dispatch({ type: SALDO, payload: res.data.users })
                }    
            }
            dispatch({ type: SHOW_LOADER, payload: false })
        }).catch(error => {
            dispatch({ type: SHOW_LOADER, payload: false })
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

        dispatch({ type: STATUS_ENVIO_PEDIDO, payload: status });

    }
}

export const setStatusCadastroUsuario = (status) => {
   // console.log('sete cadastro')
    return dispatch => {

        dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: status });

    }
}
export const montaPedido = (pedido) => {
    
    let novoPedido = {
        Pedido: {
            filial_id: FILIAL,
            a: "entrega",
            status_novo: 1,
            cliente_id: pedido.cliente_id,
            empresa_id: EMPRESA,
            pagamento_id: pedido.pagamento_id,
            trocovalor: '',
            trocoresposta: pedido.trocoresposta,
            salt: SALT,
            token: pedido.token,
            obs: pedido.obs,
            entrega_valor: pedido.entrega_valor,
            retirada_loja: pedido.retirada_loja,
            logradouro: pedido.logradouro,
            numero: pedido.numero,
            ponto_referencia: pedido.ponto_referencia,
            bairro_id: pedido.bairro_id,
            cidad_id: pedido.cidad_id,
            estado_id: pedido.estado_id,
            telefone: pedido.telefone,
            email: pedido.email,
            complemento: pedido.complemento,
            bairro_nome: pedido.bairro_nome,
            cidade_nome: pedido.cidade_nome,
            estado_nome: pedido.estado_nome,
            ponto_referencia: pedido.ponto_referencia,
            ptk: pedido.ptk
        },
        Itensdepedido: [],
        
    }
    let itensPedido = pedido.carrinho.map((v, k) => {

        let p_total = v.preco_venda * v.qtd;
        novoPedido.Itensdepedido.push({
            produto_id: v.id,
            qtde: v.qtd,
            valor_unit: v.preco_venda,
            valor_total: p_total.toFixed(2),
            obs_sis: "",
            partida_id: v.partida_id
        });
        
    });
    //console.log(novoPedido);
    return novoPedido;
}

export const limpaCarrinho = () => {

    return dispatch => {
        dispatch({ type: LIMPA_CARRINHO, payload: [] });
        dispatch({ type: LIMPA_QTD_CARRINHO, payload: 0 });
        dispatch({ type: LIMPA_TOTAL_CARRINHO, payload: 0 });
        dispatch({ type: ATUALIZA_FORMA_PAGAMENTO, payload: '' });
        dispatch({ type: ATUALIZA_TROCO, payload: '' });
        dispatch({ type: VALOR_FRETE_AUX, payload: 0 });
        dispatch({ type: RETIRADA_LOJA, payload: false });
    }
}


export const modificaEmail = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_EMAIL, payload: texto });

    }
}
export const modificaUsuarioModificouCadastro = (texto) => {
    return dispatch => {
        dispatch({ type: USUARIO_ATUALIZOU_CADASTRO, payload: texto });

    }
}

export const modificaUsuario = (usuario) => {
    return dispatch => {
        dispatch({ type: CADASTRO_USUARIO, payload: usuario });

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
export const modificaUsername = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_USERNAME, payload: texto });
    }
}

export const modificaCarregaEstadoFalha = (texto) => {
    return dispatch => {
        dispatch({ type: CARREGA_ESTADO_FALHA, payload: texto });
    }
}



export const limpaFormularioCadastro = () => {
    return dispatch => {
        dispatch({ type: MODIFICA_PONTO_REFERENCIA, payload: '' });
        dispatch({ type: MODIFICA_ESTADO, payload: '' });
        dispatch({ type: MODIFICA_ESTADO, payload: '' });
        dispatch({ type: MODIFICA_CIDADE, payload: '' });
        dispatch({ type: MODIFICA_BAIRRO, payload: '' });
        dispatch({ type: MODIFICA_TELEFONE, payload: '' });
        dispatch({ type: MODIFICA_COMPLEMENTO, payload: '' });
        dispatch({ type: MODIFICA_NUMERO, payload: '' });
        dispatch({ type: MODIFICA_ENDERECO, payload: '' });
        dispatch({ type: MODIFICA_CEP, payload: '' });
        dispatch({ type: MODIFICA_NOME, payload: '' });
        dispatch({ type: MODIFICA_CONFIRMA_SENHA, payload: '' });
        dispatch({ type: MODIFICA_SENHA, payload: '' });
        dispatch({ type: MODIFICA_EMAIL, payload: '' });
        dispatch({ type: MODIFICA_USERNAME, payload: '' });
        dispatch({ type: MODIFICA_NOME, payload: '' });
    }
}

export const modificaSenhaAntiga = (senha) => {
    return dispatch => {
        dispatch({ type: MODIFICA_SENHA_ANTIGA, payload: senha });
    }
}

export const modificaIdUsuario = (id) => {
    return dispatch => {
        dispatch({ type: MODIFICA_ID_USUARIO, payload: id });
    }
}

export const modificaNomeEstado = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_NOME_ESTADO, payload: texto });
    }
}

export const modificaNomeCidade = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_NOME_CIDADE, payload: texto });
    }
}
export const modificaNomeBairro = (texto) => {
    return dispatch => {
        dispatch({ type: MODIFICA_NOME_BAIRRO, payload: texto });
    }
}

export const modificaIniciouPartida = (status) => {
    return dispatch => {
        dispatch({ type: INICIOU_PARTIDA, payload: status });
    }
}

export const modificaDadosPartida = (txt) => {
    return dispatch => {
        dispatch({ type: DADOS_PARTIDA, payload: txt });
    }
}
export const modificaDadosJokenpo = (dados) => {
    return dispatch => {
        dispatch({ type: DADOS_PARTIDA, payload: txt });
    }
}
export const modificaRetiradaLoja = (status) => {
    return dispatch => {
        dispatch({ type: RETIRADA_LOJA, payload: status })
    }
}

export const modificaValorFrete= (valor) => {
    return dispatch => {
        dispatch({ type: VALOR_FRETE, payload: valor })
    }
}
export const modificaValorFreteAux= (valor) => {
    return dispatch => {
        dispatch({ type: VALOR_FRETE_AUX, payload: valor })
    }
}
export const atualizaTotalPedidoFrete= (total) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_TOTAL_CARRINHO, payload: total })
    }
}

    
