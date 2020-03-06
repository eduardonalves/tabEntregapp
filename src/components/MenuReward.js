import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Button
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { categoriasFetch,categoriasFetchInterval, showMyLoaderCategory } from '../actions/AppActions';
import CartButton from "./common/CartButton";
import Color from "../../constants/Colors";
import  BtnEscolha  from './Escolha';
import  Icone  from './IconeJokenpo';

class MenuReward extends Component {

    constructor(props) {
        super(props);
        
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
    gotoJokenpo(){
        this.props.navigation.navigate("Jokenpo");
    }
    gotoMyGifts(){
        
        this.props.navigation.navigate("MyGifts", { user_id: 1 });
    }
    render() {
        

        return (
            <View >
                <View style={{flexDirection:'row'}}> 
                    <Image source={require('../../assets/images/jokenpo.png')} style={{flex:1}}/>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex:1, padding:5}}> 
                        <Text style={{fontSize:50, color:Color.text, textAlign:'center'}}>
                            Suas Moedas
                        </Text>
                    </View>
                   
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1, padding:5,alignItems:'flex-end'}}> 
                            <Text style={{fontSize:100, color:Color.text}}>
                                10
                            </Text>
                        </View>
                        <View style={{flex:1, padding:5, alignItems:'flex-start'}}> 
                            <Image style={{marginLeft:5}} source={require('../../assets/images/coin.gif')} />
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
    categoria_carregada_falha: state.AppReducer.categoria_carregada_falha
});  
const mapDispatchToProps = dispatch => bindActionCreators({ categoriasFetch,categoriasFetchInterval, showMyLoaderCategory }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MenuReward);