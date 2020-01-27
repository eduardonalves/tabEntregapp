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
  ActivityIndicator
} from "react-native";
import { HeaderBackButton } from 'react-navigation-stack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atualizaObs, pedidosViewFetch } from '../actions/AppActions';
import Constants from "../utils/constants";
import foodData from "../food-data.json";
import ListCart from "./ListCart";
import ItemOrder from './ItemOrder';
import CartButton from "./common/CartButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, CheckBox } from 'react-native-elements';
import Billing from "../components/Billing";
import Color from "../../constants/Colors";

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.props.pedidosViewFetch(17, 'k1wt0x33kg',this.props.navigation.getParam('Atendimento_id'));

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

  /*handleNaviagation = () => {
    this.props.navigation.navigate("Billing");
  };*/

  render() {
    console.log('this.props.pedido.Itensdepedido');
    
    if(typeof this.props.pedido.Atendimento != 'undefined'){
      console.log(this.props.pedido.Itensdepedido);
      return (
        
            this.props.show_loader == false ? (
              <View>
                <View style={styles.container}>
                  
                  <View style={{
                    flex: 1,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 4,
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
                      {this.props.pedido.Atendimento.id}
                      </Text>
                  </View>
                  <View style={{
                    flex: 1,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 4
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
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 4,
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
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 4,
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
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 4,
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
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 4,
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
                      <Text style={{
                        fontSize: 16,
                        //fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                        {this.props.pedido.Pedido[0].entrega_valor == '0' ? 'Grátis':'R$ ' + this.props.pedido.Pedido[0].entrega_valor }
                      </Text>
                    </View>
                    <View style={{
                      flex: 1,
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 4,
                      textAlign:'center'
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                        Valor
                      
                      </Text>
                      <Text style={{
                        fontSize: 16,
                        //fontWeight: "bold",
                        //color: "#ef6136",
                        textAlign:'center'
                      }}>
                        R$ {this.props.pedido.Pedido[0].valor}
                      </Text>
                    </View>
                </View>
                
                <View
                  elevation={2}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#ffffff",
                    marginHorizontal: 24,
                    marginVertical: 8,
                    borderRadius: 4,
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    shadowOffset: {
                      height: 1,
                      width: 1
                    }
                  }}
                >
                  <View style={{ flex: 2, 
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 4 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                    >
                    Item
                  
                    </Text>

                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
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
                        fontSize: 15,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                    >
                    Qtd
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
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
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 4,
                      textAlign:'center'
                    }}>
                      <FlatList
                          data={this.props.pedido.Itensdepedido}
                          keyExtractor={item => item.Itensdepedido.id}
                          renderItem={({ item }) => (
                            <ItemOrder
                              produtonome={item.Produto.nome}
                              valor_unit={item.Itensdepedido.valor_unit}
                              qtde={item.Itensdepedido.qtde}
                              valor_total={item.Itensdepedido.valor_total}
                            />
                          )}
                        />
                    </View>
                </View>
              
              </View>
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
    //marginTop: 8,
    //marginBottom: 8,
    flexDirection: "row",
    padding: 16,
  },
  container1: {
    width: "100%",
    //marginTop: 8,
    //marginBottom: 8,
    flexDirection: "row",
    padding: 16,
  },
  container2: {
    //width: "100%",
    //marginTop: 8,
    //marginBottom: 8,
    flexDirection: "row",
    //padding: 16,
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
  pedido:state.AppReducer.pedido
});

const mapDispatchToProps = dispatch => bindActionCreators({ atualizaObs, pedidosViewFetch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);