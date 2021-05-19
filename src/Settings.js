


//export const APP_URL = 'http://10.0.2.2/entregapp_sistema';
export const APP_URL = 'https://sistema.rudo.com.br';
//xport const APP_URL ='http://localhost:8080/entregapp_sistema';

import axios from "axios";



/*let getUsers = async () => {
    let res = await axios.get(`${APP_URL}RestFilials/getdatafilial.json`, {
        params: {
            e: 1,
        }
    });
    return res.data;
};
let teste =getUsers().then((res)=>{
    console.log('res');
    console.log(res);
    teste=res;
    return res;
});*/

/*function checkUniqueness () {
    return axios.get(`${APP_URL}RestFilials/getdatafilial.json?e=1`, {
        params: {
            id: 1,
            alias: 1,
        }
    })
    .then((response) => {
        
        console.log(response.data);
        teste='passou';
        return response.data;
        
    });
}
checkUniqueness().then((response) =>{
    console.log(response);
}).catch((err) =>{
    console.log(err);
});*/

var request = new XMLHttpRequest();

var pathname=document.location.pathname;
pathname= pathname.replace('/','');
request.open('GET', `${APP_URL}/RestFilials/getdatafilial.json?e=${pathname}`, false);  // `false` makes the request synchronous
request.send(null);
let my_filial_id='';
let my_empresa_id='';
let my_idx='';
if (request.status === 200) {
    //console.log(request.response);
    let obj= JSON.parse(request.response);
    //console.log(obj.resultados.Filial);
    my_filial_id=obj.resultados.Filial.id;
    my_empresa_id=obj.resultados.Filial.empresa_id;
    my_idx=obj.resultados.Filial.idx;
  
}

export const FILIAL = my_filial_id;
export const EMPRESA = my_empresa_id;
export const SEM_DESCRICAO= "Sem descrição disponível";
export const SALT = my_idx;
export const PUSH_REGISTRATION_ENDPOINT = 'http://generated-ngrok-url/token';
export const MESSAGE_ENPOINT = 'http://generated-ngrok-url/message';

//console.log(my_filial_id);
//console.log('aqui');

