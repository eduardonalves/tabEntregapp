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



export const produtosByRecFetch = (cliente_id, token) => {
    
    return dispatch => {
        
        dispatch({ type: PRODUTO_CARREGADO_OK, payload: [] });
        dispatch({ type: SHOW_LOADER_PRODUTO, payload: true });
        dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: false });
        let datatosend= {
            clt: cliente_id,
            token: token,
            fp: FILIAL,
            lj: EMPRESA,
        }
        axios.post(`${APP_URL}/RestProdutos/prodsmobilebyrec.json`, datatosend)
            .then(res => {
                console.log('res');
                console.log(res);    
                if (typeof res.data.produtos != 'undefined') {
                        
                    dispatch({ type: PRODUTO_CARREGADO_OK, payload: res.data.produtos });
                }  
                setTimeout(function(){
                    dispatch({ type: SHOW_LOADER_PRODUTO, payload: false });
                },2000);
            }).catch(error => {
               
                dispatch({ type: PRODUTO_CARREGADO_OK, payload: [] });
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