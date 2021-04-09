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



export const produtosFetch = (categoria_id) => {
    
    return dispatch => {
        dispatch({ type: PRODUTO_CARREGADO_OK, payload: [] });
        dispatch({ type: SHOW_LOADER_PRODUTO, payload: true });
        axios.get(`${APP_URL}/RestProdutos/prodsmobilebycat.json?fp=${FILIAL}&cat=${categoria_id}`)
            .then(res => {
                
                if (typeof res.data.produtos != 'undefined') {
                    dispatch({ type: PRODUTO_CARREGADO_OK, payload: res.data.produtos });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: false });
                }

                dispatch({ type: SHOW_LOADER_PRODUTO, payload: false });
            }).catch(error => {
                dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: true });
                dispatch({ type: SHOW_LOADER_PRODUTO, payload: false });
            });
    }
}

export const adicionalFetch = (produto_id) => {
   
    return dispatch => {
        dispatch({ type: PRODUTO_CARREGADO_OK, payload: [] });
        dispatch({ type: SHOW_LOADER_PRODUTO, payload: true });
        axios.get(`${APP_URL}/RestProdutos/prodsmobilebyadc.json?fp=${FILIAL}&p=${produto_id}`)
            .then(res => {
               // console.log(`${APP_URL}/RestProdutos/prodsmobilebyadc.json?fp=${FILIAL}`);
               // console.log(res.data.produtos );
                if (typeof res.data.produtos != 'undefined') {
                    dispatch({ type: PRODUTO_CARREGADO_OK, payload: res.data.produtos });
                } else {
                    //  console.log('deu erro');
                    dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: false });
                }

                dispatch({ type: SHOW_LOADER_PRODUTO, payload: false });
            }).catch(error => {
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