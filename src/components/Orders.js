import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  pedidosFetch, 
  showMyLoader, 
  modificaUsuario, 
  pedidosFetchInverval, 
  validaToken, setStatusCadastroUsuario } from '../actions/AppActions';
import { AppLoading } from 'expo';


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Platform,
  Alert
} from "react-native";

import ListOrder from "./ListOrder";
import CartButton from "./common/CartButton";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import Color from "../../constants/Colors";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.props.showMyLoader(true);
    
    
   // this.storeToken('');
   // this.props.setStatusCadastroUsuario('');
    let userData = this.getToken();
    
    userData.then(
      res => {
        //console.log('res');
        //console.log(res);
        if(res == null || res == ''){
                
          this.props.showMyLoader(false);
          this.props.navigation.navigate('RoutesLogin');
          Alert.alert(
            'Mensagem',
            `Ops, você ainda não está autenticado no aplicativo, por favor, entre com seu usuário para ter acesso a esta funcionalidade .`,
            [
              {
                text: 'OK',
                //onPress: () => console.log('clicou'),
                style: 'WARNING',
              },
            ],
            { cancelable: true },
          );
          
        }else{
          this.props.showMyLoader(true);
          this.props.pedidosFetch(res.id,res.token);

          this.interval = setInterval(() => this.props.pedidosFetchInverval(res.id,res.token), 60000);
          this.props.validaToken(res.id,res.token);
      
        }
        
      }
    ).catch(error => {
    //console.log(error);    
     
    });
    //console.log(this.props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
        
    //console.log('nextProps.is_valid_token');
    //console.log(nextProps.is_valid_token);
        
    if(typeof  nextProps.is_valid_token != 'undefined') {
      if(typeof  nextProps.usuario != 'undefined') {
          if(nextProps.usuario != ''){
              if(nextProps.usuario){
                  this.props.validaToken(nextProps.usuario.id,nextProps.usuario.token);
                  if(nextProps.is_valid_token == 'NOK' ){
                    this.storeToken('');
                    this.props.setStatusCadastroUsuario('');
                      this.props.navigation.navigate('RoutesLogin');
                      Alert.alert(
                        'Mensagem',
                        `Ops, você não está autenticado no aplicativo, por favor, entre com seu usuário para ter acesso a esta funcionalidade.`,
                        [
                          {
                            text: 'OK',
                            //onPress: () => console.log('clicou'),
                            style: 'WARNING',
                          },
                        ],
                        { cancelable: true },
                      );
                  }
                  //this.props.setStatusCadastroUsuario(nextProps.usuario);
                  //this.props.navigation.navigate('Main');
              }
          }
      }
      
      
        
        
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Meus Pedidos",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Color.headerBar,
        
      },
      headerTitleStyle: {
        color: Color.headerBarTitle,
        fontWeight:'bold'
      },
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      )
    };
  };
  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      //console.log('setou o usuario na sessão');
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
  handleNaviagation = (Atendimento_id) => {

    this.props.navigation.navigate("ViewOrder", { Atendimento_id: Atendimento_id });
  };
  
  render() {
    
    return (
      <View style={styles.container}>
        {
          this.props.meus_pedidos.length == 0 && this.props.show_loader == false ? (<View style={{
            opacity: 1.0,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            padding:50
            
          }} >
            <Ionicons name={Platform.OS === 'ios' ? 'ios-sad': 'md-sad'} size={200} color={Color.tintColor} />
            <Text style={{fontSize:18 , textAlign:'center'}}>Ops!</Text>
            <Text style={{fontSize:15, textAlign:'center'}}>Não encontramos pedidos cadastrados.</Text>
            
          </View>):(
            <View></View>
          )
        }
        {
          this.props.meus_pedidos_carregados_falha == false ? (
            <FlatList
              data={this.props.meus_pedidos}
              keyExtractor={item => item.Atendimento.id}
              renderItem={({ item, index }) => (
                <ListOrder
                  item= {item}
                  linha={index}
                  handleNaviagation={() => this.handleNaviagation(item.Atendimento.id)}
                  
                />
              )}
            />
          ):(
            <View style={{
              opacity: 1.0,
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'column',
              padding:50
              
            }} >
              <Ionicons name={Platform.OS === 'ios' ? 'ios-sad': 'md-sad'} size={200} color={Color.tintColor} />
              <Text style={{fontSize:18}}>Ops!</Text>
              <Text style={{fontSize:15}}>Houve uma falha ao carregar os pedidos.</Text>
              <Text style={{fontSize:15}}>Tente novamente mais tarde!</Text>
            </View> 
          )
        }
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



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,

  }
});


const mapStateToProps = state => ({
  meus_pedidos: state.AppReducer.meus_pedidos,
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  qtd_carrinho: state.AppReducer.qtd_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader,
  status_envio_pedido: state.AppReducer.status_envio_pedido,
  meus_pedidos_carregados_falha: state.AppReducer.meus_pedidos_carregados_falha,
  is_valid_token: state.AppReducer.is_valid_token,
  usuario: state.AppReducer.usuario
});
const mapDispatchToProps = dispatch => bindActionCreators({ pedidosFetch, showMyLoader, modificaUsuario,pedidosFetchInverval,validaToken, setStatusCadastroUsuario }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Orders);