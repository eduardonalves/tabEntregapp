import _ from 'lodash';
import axios from 'react-native-axios';

import { Actions } from 'react-redux';
import {
    PRODUTO_CARREGADO_OK,
    PRODUTO_CARREGADO_FALHA,
    SHOW_LOADER_PRODUTO
} from './ActionTypes';

import {
    APP_URL,
    FILIAL,
    EMPRESA
} from '../Settings'



export const produtosFetch = (cliente_id, token) => {
    return dispatch => {
        console.log('passou aqui 2');
        dispatch({ type: PRODUTO_CARREGADO_OK, payload: [] });
        dispatch({ type: SHOW_LOADER_PRODUTO, payload: true });
        let datatosend= {
            clt: cliente_id,
            token: token,
            fp: FILIAL,
            lj: EMPRESA,
        }
        axios.post(`${APP_URL}/RestProdutos/prodsmobilebyrec.json`, datatosend)
            .then(res => {
                
                if (typeof res.data.produtos != 'undefined') {
                    console.log('res');
                console.log(res);
                    dispatch({ type: PRODUTO_CARREGADO_OK, payload: res.data.produtos });
                } else {
                      console.log('deu erro');
                    dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: false });
                }

                dispatch({ type: SHOW_LOADER_PRODUTO, payload: false });
            }).catch(error => {
                //console.log('error');
                //console.log(error);
                dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: true });
                dispatch({ type: SHOW_LOADER_PRODUTO, payload: false });
            });
    }
}

export const showMyLoaderProduct = (status) => {
    return dispatch => {
        dispatch({ type: SHOW_LOADER_PRODUTO, payload: status })
    }
}