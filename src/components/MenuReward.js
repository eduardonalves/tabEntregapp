import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Button,
    AsyncStorage,
    Alert,
    ActivityIndicator
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { categoriasFetch,categoriasFetchInterval, showMyLoaderCategory, entrarJokenpo, setStatusCadastroUsuario, modificaIniciouPartida, verificasaldo } from '../actions/AppActions';
import CartButton from "./common/CartButton";
import Color from "../../constants/Colors";
import  BtnEscolha  from './Escolha';
import  Icone  from './IconeJokenpo';

class MenuReward extends Component {

    constructor(props) {
        super(props);
        let userData = this.getToken();
        userData.then(resp => {
            //console.log(resp);
            if(typeof resp.token != 'undefined'){   
                this.props.setStatusCadastroUsuario(resp);
                this.props.verificasaldo(this.props.usuario.id, this.props.usuario.token );
                //this.props.validaToken(res.id,res.token);
                //this.props.navigation.navigate('Main');
            }else{

            } 
        });
        //console.log(this.props);
        
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
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
                color: '#fff',
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
        Alert.alert(
            'Jogar',
            `Deseja mesmo jogar uma partida de pedra, papel e tesoura? Isto poderá te custar 10 moedas.`,
            [
              {
                text: 'Sim',
                onPress: () => this.handleGotoJokenpo(),
              },
              {
                text: 'Não',
                //onPress: () => this.props.showMyLoader(false),
                style: 'cancel',
              },
            ],
            { cancelable: false },
          );
          
        
    }
    gotoMyGifts(){
        
        this.props.navigation.navigate("MyGifts", { user_id: this.props.usuario.id });
    }

    render() {
        

        return (
            <View >
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
                    <ActivityIndicator size="large" color="#4099ff"

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
                        <ActivityIndicator size="large" color="#4099ff"

                        animating={true}
                        hidesWhenStopped={true}

                        />
                    </View>



                    )
                }
                
                <View style={{flexDirection:'row'}}> 
                    <Image source={require('../../assets/images/jokenpo.png')} style={{flex:1}}/>
                </View>
                <View style={{alignContent:'center', padding:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1, padding:5}}> 
                            <Text style={{
                                fontSize:50, 
                                color:Color.text, 
                                
                                paddingLeft:30
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
            </View>
            
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
    saldo: state.AppReducer.saldo
});  
const mapDispatchToProps = dispatch => bindActionCreators({ categoriasFetch,categoriasFetchInterval, showMyLoaderCategory, entrarJokenpo, setStatusCadastroUsuario, modificaIniciouPartida, verificasaldo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MenuReward);