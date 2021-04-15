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
  Platform,
  CheckBox,
  ActivityIndicator
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { atualizaObs, freteFetch, modificaRetiradaLoja,modificaValorFrete,atualizaTotalPedidoFrete,modificaValorFreteAux,showMyLoader } from '../actions/AppActions';
import Constants from "../utils/constants";
import foodData from "../food-data.json";
import ListCart from "./ListCart";
import CartButton from "./common/CartButton";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Billing from "../components/Billing";
import Color from "../../constants/Colors";

class FooterCheckout extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    

    if(this.props.retirada_loja==false){
      this.props.freteFetch(this.props.usuario.id);
    }else{
      this.props.freteFetch(0);
    }
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Pedido",
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
      )
    };
  }

  handleNaviagation = () => {
    this.props.navigation.navigate("Billing");
  };
  totalCalculator = (carrinho, frete) => {
    let total = frete;
    total = parseFloat(total);

    carrinho.map((item) => {
        total += item.preco_venda * item.qtd;

    });
    return total;
  }
  handleModificaRetirada = (value) =>{
    //this.props.showMyLoader(true);
    this.props.modificaRetiradaLoja(value);
    
    if(value==true){
      
      //let total = this.totalCalculator(this.props.carrinho,0);
      //this.props.atualizaTotalPedidoFrete(total);
      this.props.modificaValorFreteAux(this.props.valor_frete);
      this.props.modificaValorFrete(0);
      let total = this.totalCalculator(this.props.carrinho,0);
      this.props.atualizaTotalPedidoFrete(total);
      
    }else{
      
      //let total = this.totalCalculator(this.props.carrinho,this.props.valor_frete_aux);
      //this.props.atualizaTotalPedidoFrete(total);
      this.props.modificaValorFrete(this.props.valor_frete_aux);
      this.props.freteFetch(this.props.usuario.id);
      let total = this.totalCalculator(this.props.carrinho,this.props.valor_frete_aux);
      this.props.atualizaTotalPedidoFrete(total);
      
    }
    
    

    //alert(this.props.total_carrinho);
  }
  render() {
    //console.log('this.props.navigation');
    //console.log(this.props.navigation);
    
    

    //let total = this.totalCalculator(this.props.carrinho,this.props.valor_frete);
    //this.props.atualizaTotalPedidoFrete(total);

    let valorFrete = parseFloat(this.props.valor_frete);
    valorFrete = valorFrete.toFixed(2);
    valorFrete = valorFrete.toString();
    return (
      <View style={{
        //padding:10
      }}>
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
        <View  style={{padding:10}} >
          <View style={styles.container}>
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                //color: "#a92319",
              }}>
                Tx. Entrega
            </Text>
            </View>
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
              //flexDirection: "row-reverse"
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                //color: "#ef6136",
              }}>

                <NumberFormat
                  value={valorFrete.replace(".", ",")}
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
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}>
              <Text style={{
                fontSize: 17,
                fontWeight: "bold",
                //color: "#a92319",
              }}>
                Total Geral
            </Text>
            </View>
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
              flexDirection: "row-reverse"
            }}>
              <Text style={{
                fontSize: 17,
                fontWeight: "bold",
                //color: "#ef6136",
              }}>

                <NumberFormat
                  value={this.props.total_carrinho.replace(".", ",")}
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

          <View style={{
            flexDirection: "column",
            width: "100%",
            //marginTop: 8,
            //marginBottom: 8,
            //flexDirection: "row",
            padding: 17,
          }}>
            <Input
              label="Observações"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={{ width: "100%", borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(value) => this.props.atualizaObs(value)}

            />
          </View>
        </View>
        <View style={{
          //flexDirection: "column",
          width: "100%",
          //marginTop: 8,
          //marginBottom: 8,
          //flexDirection: "row",
          padding: 20,
        }}>
          
        <CheckBox
          value={this.props.retirada_loja}
          onValueChange={(value)=>this.handleModificaRetirada(value)}
          
        />
        <Text style={styles.label}>Retirar pedido na loja?</Text>
        </View>
        <View style={{
          //flexDirection: "column",
          width: "100%",
          //marginTop: 8,
          //marginBottom: 8,
          //flexDirection: "row",
          padding: 20,
        }}>
          <Button
            style={styles.button}
            title="Pagamento"
            color={ Platform.OS === 'ios' ? Color.buttonIos : Color.button }
            onPress={this.props.handleNaviagation} 
            disabled={this.props.show_loader}
            />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    padding: 16,
  },
  button: {
    backgroundColor: "#4099ff",
    color: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    height: 50,
    flex: 1,
    justifyContent: "center"
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
  usuario: state.AppReducer.usuario,
  valor_frete: state.AppReducer.valor_frete,
  valor_frete_aux: state.AppReducer.valor_frete_aux,
  retirada_loja: state.AppReducer.retirada_loja
});

const mapDispatchToProps = dispatch => bindActionCreators({ atualizaObs, freteFetch ,modificaRetiradaLoja,modificaValorFrete,atualizaTotalPedidoFrete,modificaValorFreteAux,showMyLoader}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FooterCheckout);