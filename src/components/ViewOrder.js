import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Picker,
  Button,
  ActivityIndicator,
  AsyncStorage,
  ScrollView
} from "react-native";
import { HeaderBackButton } from 'react-navigation-stack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { atualizaObs, pedidosViewFetch, modificaUsuario, pedidosViewFetchInterval } from '../actions/AppActions';
import Constants from "../utils/constants";
import foodData from "../food-data.json";
import ListCart from "./ListCart";
import ItemOrder from './ItemOrder';
import CartButton from "./common/CartButton";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, CheckBox } from 'react-native-elements';
import Billing from "../components/Billing";
import Color from "../../constants/Colors";

class ViewOrder extends Component {
  
  constructor(props) {
    super(props);
    //console.log(props.pedido);
    
    let userData = this.getToken();
    //console.log(userData);
    userData.then(
      res => {

        this.props.pedidosViewFetch(res.id,res.token,this.props.navigation.getParam('Atendimento_id'))
        this.interval = setInterval(() => this.props.pedidosViewFetchInterval(res.id,res.token,this.props.navigation.getParam('Atendimento_id')), 60000);
      }
    ).catch(error => {

    });

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Pedido",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Color.headerBar
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate("LinksStack")}  tintColor="#fff"  />,
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      )
    };
  }
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
  /*handleNaviagation = () => {
    this.props.navigation.navigate("Billing");
  };*/

  render() {
    console.log(this.props.pedido);
    
    if(typeof this.props.pedido.Atendimento != 'undefined'){
      //console.log(this.props.pedido.Itensdepedido);
      return (
        
            this.props.show_loader == false ? (
              <ScrollView>
                <View style={styles.container}>
                  
                  <View style={{
                    flex: 1,
                    //borderTopLeftRadius: 4,
                    //borderTopRightRadius: 0,
                    //borderBottomRightRadius: 0,
                    //borderBottomLeftRadius: 4,
                    textAlign:'center'
                  }}> 
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        //color: "#a92319",
                        textAlign:'center'
                      }}>
                        Código
                      </Text>
                      <Text style={{
                        fontSize: 16,
                        //fontWeight: "bold",
                        //color: "#a92319",
                        textAlign:'center'
                      }}>
                      {this.props.pedido.Pedido[0].id}
                      </Text>
                  </View>
                  <View style={{
                    flex: 1,
                    //borderTopLeftRadius: 4,
                    //borderTopRightRadius: 0,
                    //borderBottomRightRadius: 0,
                    //borderBottomLeftRadius: 4
                  }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        //color: "#a92319",
                        textAlign:'center'
                      }}>
                        Data 
                      </Text>
                      <Text style={{
                        fontSize: 16,
                        //fontWeight: "bold",
                        //color: "#a92319",
                        textAlign:'center'
                      }}>
                        {this.props.pedido.Atendimento.data}
                        </Text>
                  </View>
                  <View style={{
                    flex: 1,
                    //borderTopLeftRadius: 4,
                    //borderTopRightRadius: 0,
                    //borderBottomRightRadius: 0,
                    //borderBottomLeftRadius: 4,
                    textAlign:'center'
                  }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      //color: "#ef6136",
                      textAlign:'center'
                    }}>
                      Hora 
                    
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        //fontWeight: "bold",
                        //color: "#a92319",
                        textAlign:'center'
                      }}>
                        {this.props.pedido.Atendimento.hora}
                      </Text> 
                  </View>
                    
                    
                </View>
                <View style={styles.container1}>
                  
                    <View style={{
                      flex: 1,
                     
                      //borderTopLeftRadius: 4,
                      //borderTopRightRadius: 0,
                      //borderBottomRightRadius: 0,
                      //borderBottomLeftRadius: 4,
                      textAlign:'center'
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                      Pagamento 
                      
                      </Text>
                      <Text style={{
                        fontSize: 16,
                        //fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                        {this.props.pedido.Atendimento.formadepagamento}
                      </Text>
                    </View>
                    <View style={{
                      flex: 1,
                      //borderTopLeftRadius: 4,
                      //borderTopRightRadius: 0,
                      //borderBottomRightRadius: 0,
                      //borderBottomLeftRadius: 4,
                      textAlign:'center'
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                        Situação 
                      
                      </Text>
                      <Text style={{
                        fontSize: 16,
                        //fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                        {this.props.pedido.Pedido[0].status}
                      </Text>
                    </View>
                    <View style={{
                      flex: 1,
                      //borderTopLeftRadius: 4,
                      //borderTopRightRadius: 0,
                      //borderBottomRightRadius: 0,
                      //borderBottomLeftRadius: 4,
                      textAlign:'center'
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                        Entrega 
                      
                      </Text>
                      
                        
                        {
                          this.props.pedido.Pedido[0].entrega_valor == '0' || this.props.pedido.Pedido[0].entrega_valor == '' || this.props.pedido.Pedido[0].entrega_valor== null ? (
                            <Text style={{
                              fontSize: 16,
                              //fontWeight: "bold",
                              //color: "#ef6136",
                              textAlign:'center'
                            }}>
                              Grátis
                            </Text>
                          )
                          :(
                            <Text style={{
                              fontSize: 16,
                              //fontWeight: "bold",
                              //color: "#ef6136",
                              textAlign:'center'
                            }}>
                              <NumberFormat 
                                value={ this.props.pedido.Pedido[0].entrega_valor == '' || this.props.pedido.Pedido[0].entrega_valor== null ? 0 :this.props.pedido.Pedido[0].entrega_valor.replace(".",",")} 
                                displayType={'text'} 
                                renderText={value => <Text>{value}</Text>}
                                thousandSeparator={'.'}
                                decimalScale={2} 
                                fixedDecimalScale={true}
                                prefix={'R$ '}
                                decimalSeparator={','}
                              
                              />
                            </Text>
                          
                          
                          ) }
                      
                    </View>
                    
                </View>
                
                <View
                  elevation={2}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#ffffff",
                    padding:10,
                    marginTop:10,
                    /*marginHorizontal: 24,
                    marginVertical: 8,
                    borderRadius: 4,
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    shadowOffset: {
                      height: 1,
                      width: 1
                    }*/
                  }}
                >
                  <View style={{ 
                    flex: 4, 
                    //borderTopLeftRadius: 4,
                    //borderTopRightRadius: 0,
                    //borderBottomRightRadius: 0,
                    //borderBottomLeftRadius: 4 
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                    >
                    Item
                  
                    </Text>

                  </View>
                  <View style={{ flex: 2 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                    >
                      Unt
                    

                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                    >
                    Qtd
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                    >
                    Total
                  
                    </Text>
                  </View>


                </View>
                <View style={styles.container2}>
                  <View style={{
                      flex: 1,
                      //borderTopLeftRadius: 4,
                      //borderTopRightRadius: 0,
                      //borderBottomRightRadius: 0,
                      //borderBottomLeftRadius: 4,
                      textAlign:'center'
                    }}>
                      <FlatList
                          data={this.props.pedido.Itensdepedido}
                          keyExtractor={item => item.Itensdepedido.id}
                          renderItem={({ item, index }) => (
                            <ItemOrder
                              produtonome={item.Produto.nome}
                              valor_unit={item.Itensdepedido.valor_unit}
                              qtde={item.Itensdepedido.qtde}
                              valor_total={item.Itensdepedido.valor_total}
                              linha={index}
                            />
                          )}
                        />
                    </View>
                </View>

                <View style={styles.container2}>
                  <View style={{
                    flex: 1,
                    //borderTopLeftRadius: 4,
                    //borderTopRightRadius: 0,
                    //borderBottomRightRadius: 0,
                    //borderBottomLeftRadius: 4,
                    //textAlign:'center',
                    alignItems:'center',
                  }}>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      //color: "#ef6136",
                      textAlign:'right',
                      padding:16,
                      marginTop:10,
                      //marginLeft:10,
                    }}>
                      Total
                    
                    </Text> 
                  </View>
                  <View style={{
                    flex: 1,
                    //borderTopLeftRadius: 4,
                    //borderTopRightRadius: 0,
                    //borderBottomRightRadius: 0,
                    //borderBottomLeftRadius: 4,
                    //textAlign:'center'
                  }}>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      //color: "#ef6136",
                      textAlign:'center',
                      padding:16,
                      marginTop:10,
                      //marginLeft:10,
                    }}>
                      
                      <NumberFormat 
                                value={ this.props.pedido.Pedido[0].valor == '' || this.props.pedido.Pedido[0].valor== null ? 0 :this.props.pedido.Pedido[0].valor.replace(".",",")} 
                                displayType={'text'} 
                                renderText={value => <Text>{value}</Text>}
                                thousandSeparator={'.'}
                                decimalScale={2} 
                                fixedDecimalScale={true}
                                prefix={'R$ '}
                                decimalSeparator={','}
                              
                              />
                    </Text>
                  </View>
                  
                </View>
                <View style={styles.container3} >
                    <View >
                        <Text style={{
                            fontSize: 16,
                            fontWeight:'bold',
                            textAlign:'center',
                            marginBottom:5, 
                        }}>
                          Levar troco?  {this.props.pedido.Pedido[0].trocoresposta}
                        </Text>
                        {this.props.pedido.Pedido[0].obs != '' ? (
                          <Text style={{
                              fontSize: 16,
                              padding: 10,
                              //fontWeight:'bold',
                              textAlign:'center',
                             // marginBottom:5, 
                          }}>
                          {this.props.pedido.Pedido[0].obs}
                        </Text>
                        ):(<View></View>)}

                        {this.props.pedido.Pedido[0].motivocancela != '' ? (
                          <Text style={{
                              fontSize: 16,
                              padding: 10,
                              //fontWeight:'bold',
                              textAlign:'center',
                              marginTop: 0,
                             // marginBottom:5, 
                          }}>
                          {this.props.pedido.Pedido[0].motivocancela}
                        </Text>
                        ):(<View></View>)}
                          
                        <Text style={{
                            fontSize: 16,
                            fontWeight:'bold',
                            textAlign:'center',
                            marginBottom:5, 
                        }}>
                            Endereço de entrega
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            //fontWeight:'bold',
                            textAlign:'center',
                            marginBottom:5,   
                        }}>
                            {this.props.pedido.Pedido[0].logradouro}
                            {this.props.pedido.Pedido[0].numero != '' && this.props.pedido.Pedido[0].numero != null  ? ', '+ this.props.pedido.Pedido[0].numero :'' }
                            {this.props.pedido.Pedido[0].complemento != '' && this.props.pedido.Pedido[0].complemento != null ? ', ' + this.props.pedido.Pedido[0].complemento :'' }
                            
                       
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            //fontWeight:'bold',
                            textAlign:'center',
                            marginBottom:5,   
                        }}>
                            {this.props.pedido.Pedido[0].bairro_nome != '' && this.props.pedido.Pedido[0].bairro_nome != null ? '' + this.props.pedido.Pedido[0].bairro_nome :''}
                            {this.props.pedido.Pedido[0].cidade_nome != '' && this.props.pedido.Pedido[0].cidade_nome != null ? ' - ' + this.props.pedido.Pedido[0].cidade_nome :''}
                            {this.props.pedido.Pedido[0].estado_nome != '' && this.props.pedido.Pedido[0].estado_nome != null ? ' - ' + this.props.pedido.Pedido[0].estado_nome :''}
                            
                           
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            //fontWeight:'bold',
                            textAlign:'center',
                            marginBottom:5,   
                        }}>
                           {this.props.pedido.Pedido[0].ponto_referencia != '' && this.props.pedido.Pedido[0].ponto_referencia != null  ? '' + this.props.pedido.Pedido[0].ponto_referencia :''}
                        </Text>
                    </View>
                    
                </View>

              
              </ScrollView>
            ):( <View style={{
                  opacity: 0.0,
                  width: '100%',

                  alignItems: 'center',
                  flex: 1,
                  position: 'absolute',
                  marginTop: '50%',
                }}
              >
                <ActivityIndicator size="large" color="#4099ff"

                  animating={true}
                  hidesWhenStopped={true}

                />
              </View>
            )
        
      
    );
    }else {
      return(<View
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
              </View>);
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    //marginBottom: 20,
    flexDirection: "row",
    padding: 10,
  },
  container1: {
    width: "100%",
    //marginTop: 8,
    //marginBottom: 8,
    flexDirection: "row",
    //padding: 16,
  },
  container2: {
    //width: "100%",
    //marginTop: 8,
    //marginBottom: 8,
    flexDirection: "row",
    //padding: 16,
  },
  container3: {
    width: "100%",
    //marginTop: 8,
    //marginBottom: 8,
//flexDirection: "row",
    //padding: 16,
    alignSelf:"center",
    alignItems:"center"
  },
  button: {
    backgroundColor: "#4099ff",
    color: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    height:50,
    flex:1,
    justifyContent:"center"
  },
 
});

const mapStateToProps = state => ({
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader,
  pedido:state.AppReducer.pedido,
  usuario: state.AppReducer.usuario
});

const mapDispatchToProps = dispatch => bindActionCreators({ atualizaObs, pedidosViewFetch, modificaUsuario,pedidosViewFetchInterval }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);