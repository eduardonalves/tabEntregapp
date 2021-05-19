import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Button,
    Alert,
    ActivityIndicator,
    ScrollView,
    Dimensions 
} from "react-native";
import AsyncStorage from '@callstack/async-storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { categoriasFetch, showMyLoader,validaToken,categoriasFetchInterval, showMyLoaderCategory, entrarJokenpo, setStatusCadastroUsuario, modificaIniciouPartida, verificasaldo, modificaSaldo } from '../actions/AppActions';
import CartButton from "./common/CartButton";
import Color from "../../constants/Colors";
import  BtnEscolha  from './Escolha';
import  Icone  from './IconeJokenpo';
import FILIAL from '../Settings';

class MenuReward extends Component {

    constructor(props) {
        super(props);
        //this.storeToken('')
        let userData = this.getToken();
        
        userData.then(resp => {
            //console.log(resp);
            if(resp == null || resp == ''){
                
                this.props.showMyLoader(false);
                this.props.navigation.navigate('RoutesLogin');
                
                alert(`Ops, você ainda não está autenticado no aplicativo, por favor, entre com seu usuário para ter acesso a esta funcionalidade .`);
            }else{
                if(typeof resp.token != 'undefined'){   
                    if(resp.filial_id != FILIAL){
                        this.storeToken('');
                        this.props.navigation.navigate('RoutesLogin');
                         alert(`Ops, você ainda não está autenticado no aplicativo, por favor, entre com seu usuário para ter acesso a esta funcionalidade .`);
                    }else{
                        this.props.setStatusCadastroUsuario(resp);
                        this.props.modificaSaldo(0);
                        this.props.verificasaldo(this.props.usuario.id, this.props.usuario.token );
                        this.props.validaToken(this.props.usuario.id, this.props.usuario.token);
                    }
                    
                    //this.props.validaToken(res.id,res.token);
                    //this.props.navigation.navigate('Main');
                }    
            }
             
        });
        //console.log(this.props);
        
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
      //  console.log(nextProps);
        if(typeof  nextProps.is_valid_token != 'undefined') {
            if(typeof  nextProps.usuario != 'undefined') {
                if(nextProps.usuario != ''){
                    if(nextProps.usuario){
                        //this.props.validaToken(nextProps.usuario.id,nextProps.usuario.token);
                        if(nextProps.is_valid_token == 'NOK' ){
                          this.storeToken('');
                          this.props.setStatusCadastroUsuario('');
                            this.props.navigation.navigate('RoutesLogin');
                            
                            alert( `Ops, você não está autenticado no aplicativo, por favor, entre com seu usuário para ter acesso a esta funcionalidade.`);
                        }
                        //this.props.setStatusCadastroUsuario(nextProps.usuario);
                        //this.props.navigation.navigate('Main');
                    }
                }
            }  
          }
        if(typeof  nextProps.iniciou_partida != 'undefined') {
            if(nextProps.iniciou_partida == true){
                this.props.navigation.navigate("Jokenpo");
                this.props.modificaIniciouPartida(false);

            }
        }
    }
    componentWillUnmount() {
        this.props.modificaIniciouPartida(false);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Recompensas",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: Color.headerBar
            },
            
            headerRight: (
                <CartButton
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                />
            ),
            headerTitleStyle: {
                color: Color.headerBarTitle,
                fontWeight:'bold'
              },
            
        };
    }
    async storeToken(user) {
        try {
           await AsyncStorage.setItem("userData", JSON.stringify(user));
        } catch (error) {
          //console.log("Something went wrong", error);
        }
    }
    async getToken() {
        try {
          let userData = await AsyncStorage.getItem("userData");
          let data = JSON.parse(userData);
          //console.log(data);
          return data;
        } catch (error) {
          //console.log("Something went wrong", error);
          return false;
        }
    }
    handleGotoJokenpo(){
        this.props.entrarJokenpo(this.props.usuario.id, this.props.usuario.token );
    }
    gotoJokenpo(){
        
          if (confirm(`Deseja mesmo jogar uma partida de pedra, papel e tesoura? Isto poderá te custar 10 moedas.`)) {
            // Save it!
            this.handleGotoJokenpo();
          } else {
            // Do nothing!
            this.props.showMyLoader(false);
          }
        
    }
    gotoMyGifts(){
        
        this.props.navigation.navigate("MyGifts", { user_id: this.props.usuario.id });
    }

    render() {
        
        let {width} = Dimensions.get('window');
        let imgwidth= width * 0.5;

        return (
            <ScrollView >
                {
                this.props.show_loader == true ? (
                    <View
                    style={{


                        opacity: 1.0,
                        width: '100%',

                        alignItems: 'center',
                        flex: 1,
                        position: 'absolute',
                        marginTop: '50%'
                    }}
                    >
                    <ActivityIndicator size="large" color={Color.ActivityIndicator}

                        animating={true}
                        hidesWhenStopped={true}

                    />
                    </View>

                ) : (
                    <View
                        style={{


                        opacity: 0.0,
                        width: '100%',

                        alignItems: 'center',
                        flex: 1,
                        position: 'absolute',
                        marginTop: '50%'
                        }}
                    >
                        <ActivityIndicator size="large" color={Color.ActivityIndicator}

                        animating={true}
                        hidesWhenStopped={true}

                        />
                    </View>



                    )
                }
                
                <View style={{flexDirection:'row'}}> 
                    <Image 
                        source={require('../../assets/images/jokenpo.png')} 
                        style={{flex:1, height:imgwidth, height:imgwidth}}/>
                </View>
                <View style={{alignContent:'center', padding:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1, padding:5}}> 
                            <Text style={{
                                fontSize:50, 
                                color:Color.text, 
                                
                                paddingLeft:30,
                                textAlign:'center'
                                }}>
                                Suas Moedas
                            </Text>
                        </View>
                    
                    </View>
                    <View style={{
                        flexDirection:'row', 
                        alignSelf:'center', 
                        paddingLeft:20, paddingRight:20}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={{ padding:5, alignItems:'flex-end'}}> 
                                <Text style={{fontSize:70, color:Color.text}}>
                                    {this.props.saldo}
                                </Text>
                            </View>
                            <View style={{ alignItems:'flex-start'}}> 
                                <Image style={{ width:65, height:60 }} source={require('../../assets/images/PngItem_5107354.png')} />
                            </View>
                        </View>
                        
                    </View>
                </View>
                
                <View style={{flexDirection:'row', alignSelf:'center'}}>
                    <View style={{padding:10}}>
                        <Button
                            onPress={e => this.gotoJokenpo() } 
                            title="Jogar Jokenpo (custa 10 moedas)"
                            color={Platform.OS === 'ios' ? Color.buttonIos : Color.button}
                            style={{
                                flex:1,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 8,
                                paddingBottom: 8,
                            }}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row', alignSelf:'center'}}>
                    <View style={{padding:10}}>
                        <Button
                            onPress={e => this.gotoMyGifts() } 
                            title="Resgatar Suas Recompensas"
                            color={Platform.OS === 'ios' ? Color.buttonIos : Color.button}
                            style={{
                                flex:1,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 8,
                                paddingBottom: 8,
                            
                            }}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1, padding:5}}> 
                            <Text style={{
                                fontSize:20, 
                                color:Color.text,     
                                paddingLeft:30,
                                textAlign:'center',
                                fontWeight:'bold'
                                }}>
                                    {'\n'}
                                    Observações.
                            </Text>
                            <Text style={{
                                fontSize:15, 
                                color:Color.text, 
                                
                                paddingLeft:30,
                                textAlign:'center'
                                }}>
                                
                                * Fique atento(a)! Ganhando ou perdendo a partida, será disponibilizada uma recompensa ao final da mesma. Então aproveite!
                                {'\n'}
                               
                                ** Observe a data de validade da sua recompensa, após a este prazo, a mesma não estará mais disponível para o resgate!
                                {'\n'}
                                *** A cada R$ 25,00 em compras por este aplicativo, você ganha uma moeda. O limite máximo acumulativo, é de 10 moedas, quando se atinge este limite, as mesmas não são mais somadas à sua conta e também não se acumula mais saldo de compras.
                                {'\n'}
                                
                            </Text>
                        </View>
                    
                    </View>
                <View style={{padding:30}}></View>
            </ScrollView>
            
        );
    }
}

let styles = StyleSheet.create({
    btnEscolha: {
      width: 90
    },
    painelAcoes:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginTop:20
    },
    palco:{
      alignItems:'center',
      marginTop: 20
    },
    txtResultado:{
      fontSize: 25,
      fontWeight:'bold',
      color:'red',
      height: 60
    },
    
  })


const mapStateToProps = state => ({
    categorias: state.AppReducer.categorias,
    carrinho: state.AppReducer.carrinho,
    total_carrinho: state.AppReducer.total_carrinho,
    qtd_carrinho: state.AppReducer.qtd_carrinho,
    forma_pagamento: state.AppReducer.forma_pagamento,
    tipos_pagamento: state.AppReducer.tipos_pagamento,
    troco_pedido: state.AppReducer.troco_pedido,
    obs_pedido: state.AppReducer.obs_pedido,
    show_loader: state.AppReducer.show_loader,
    status_envio_pedido: state.AppReducer.status_envio_pedido,
    show_loader_categoria: state.AppReducer.show_loader_categoria,
    categoria_carregada_falha: state.AppReducer.categoria_carregada_falha,
    dados_premio: state.AppReducer.dados_premio,
    iniciou_partida: state.AppReducer.iniciou_partida,
    usuario: state.AppReducer.usuario,
    saldo: state.AppReducer.saldo,
    is_valid_token: state.AppReducer.is_valid_token
});  
const mapDispatchToProps = dispatch => bindActionCreators({ categoriasFetch,showMyLoader,validaToken,categoriasFetchInterval, showMyLoaderCategory, entrarJokenpo, setStatusCadastroUsuario, modificaIniciouPartida, verificasaldo, modificaSaldo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MenuReward);