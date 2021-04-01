import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Picker,
  TouchableHighlight,
  Platform,
  AsyncStorage
} from "react-native";
import { Overlay } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CustomModal from './common/CustomModal';
import Color from '../../constants/Colors';
import NumberFormat from 'react-number-format';

import { addToCart, updateItemId, updateCart, setModalVisible, showMyLoader, setStatusCadastroUsuario } from '../actions/AppActions';

class ListItemIos extends Component {
  constructor(props) {
    super(props);
    let storeData = this.getToken();
    
    //console.log('storeData');
    //console.log(storeData);
    storeData.then(resp => {
        //console.log(resp);
        if(resp != null && resp != ''  ){
          if(typeof resp.token != 'undefined'){
              
              this.props.setStatusCadastroUsuario(resp);
              
          }
        }
        
      });
    this.state = {
      isClicked: false,
      qtd: 1,
      modalVisible: false,
    };
    //console.log(this.props);
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

  handleAddToCart = () => {
    this.props.showMyLoader(true);
    let produto = {
      id: this.props.id,
      nome: this.props.name,
      foto: this.props.image,
      preco_venda: this.props.price,
      descricao: this.props.description,
      parte_compre_ganhe: '',
      qtd: this.state.qtd,
      item_id: this.props.item_id,
      partida_id: this.props.partida_id,
    }
    this.setState({
      isClicked: !this.state.isClicked
    });
    this.props.addToCart(produto, this.props.carrinho, this.props.usuario.frete_cadastro);
    this.props.updateItemId(this.props.item_id);
    //this.props.updateCart(this.props.carrinho);
    this.props.showMyLoader(false);
    if(this.props.tem_adicional==true){
      this.props.handleGoToDishesAdc();
    }
  }
  handleClick = () => {
    //console.log('this.props.usuario');
    //console.log(this.props.usuario);
    if(this.props.usuario ==''){
      this.props.handleGoToLogin();
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
      
      this.props.handleNaviagation();
      Alert.alert(
        'Adicionar Produto',
        `Deseja mesmo adicionar o produto ${this.props.name} à sua sacola de pedidos?`,
        [
          {
            text: 'Sim',
            onPress: () => this.handleAddToCart(),
          },
          {
            text: 'Não',
            onPress: () => this.props.showMyLoader(false),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
    
  };
  render() {
    
    let preco = this.props.price.toString();
    preco = preco.replace(".", ",");
    return (
      <View>
        <View >
          <View
            elevation={4}
            style={{
              //flex: 1,
              flexDirection: "row",
              padding: 10,
              backgroundColor: Color.checkoutContainerBackground,
              marginHorizontal: 10,
              marginVertical: 5,
              borderRadius: 4,
              shadowOpacity: 0.1,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                width: 1
              }
            }}
          >
            <View style={{
              flexDirection: "row",
              flex: 3
            }}>
              <Image
                style={{
                  width: 108,
                  height: 108,
                  //borderRadius: 110/ 2,
                  //borderTopLeftRadius: 4,
                  //borderTopRightRadius: 0,
                  //borderBottomRightRadius: 0,
                  //borderBottomLeftRadius: 4,
                  flexDirection: "column",
                  alignSelf: "center"
                }}
                //source={{ uri: this.props.image }
                source={{ uri: this.props.image.replace('http://localhost/', 'http://10.0.2.2/') }
                }
              />
              <View
                style={{
                  padding: 16,
                  flex: 3
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.textFormaPagamento,
                    width: "100%"
                  }}
                >
                  {this.props.name}
                </Text>


                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    //justifyContent: "center",
                    // width: "100%",
                  }}
                >
                   {
                    this.props.partida_id =='' || this.props.partida_id == null ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: Color.tintColor
                        }}
                      >
                        {this.props.disponivel == 1? (
                        <NumberFormat 
                            value={preco } 
                            displayType={'text'} 
                            renderText={value => <Text>{value}</Text>}
                            thousandSeparator={'.'}
                            decimalScale={2} 
                            fixedDecimalScale={true}
                            prefix={'R$ '}
                            decimalSeparator={','}
                        
                        />
                      ):(
                        'N/D'
                      )}

                      </Text>
                    ):(
                      <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: Color.tintColor,
                        marginBottom:5,
                        textAlign:'center'
                      }}
                    >
                      Validade  {this.props.data_validade}
                        
                        
                      </Text>
                    )}
                  

                    
                </View>
                  
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop:this.props.partida_id =='' || this.props.partida_id ==null ? 15: 0,
                    //justifyContent: "center",
                    // width: "100%",
                  }}
                >
                  <Button
                  onPress={e => this.props.setModalVisible(true, this.props.description)}
                  color={ Platform.OS === 'ios' ? Color.buttonIos : Color.button }
                  title="Detalhes"
                  style={{
                    backgroundColor: Color.button,
                    flex:1,
                    //paddingLeft: 16,
                    //paddingRight: 16,
                    //paddingTop: 8,
                    //paddingBottom: 8,
                    // flexDirection: "row",
                  }}
                />
                <Button
                  onPress={e => this.handleClick() }
                  color={ Platform.OS === 'ios' ? Color.buttonIos : Color.button }
                  title="Adicionar"
                  disabled={!this.props.disponivel || this.props.show_loader || (this.state.isClicked==true && this.props.partida_id != '')  }
                  style={{
                    backgroundColor: Color.button,
                    flex:1,
                    //paddingLeft: 16,
                    //paddingRight: 16,
                    //paddingTop: 8,
                    //paddingBottom: 8,
                    // flexDirection: "row",
                  }}
                />
                </View>
              </View>
              <View style={{
              flex: 1,
              flexDirection:"row",
              justifyContent:"flex-start",
              alignSelf:"flex-start",
              marginTop: 5,
              padding: 10
              
            }}  >
              {
                this.props.partida_id =='' || this.props.partida_id ==null ? (
                  <Picker
                    selectedValue={this.state.qtd}
                    style={{
                      height: 65, width: 30,
                      alignSelf:"flex-start",
                      marginTop: -95
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ qtd: itemValue })
                    }
                                //onPress={e => alert("Hey")}
                            /**/>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                  </Picker>
                ):(<View></View>)
              }
              
              <Text
                  style={{
                      fontSize: 18,
                      color: Color.textFormaPagamento,
                      height: 120, width: 100
                  }}
              >
                  {this.props.partida_id =='' || this.props.partida_id ==null ? 'Un':''}
              </Text>
              
            </View>
            </View>

            
          </View>

        </View>

      </View>
    );
  }
}
const mapStateToProps = state => ({
  carrinho: state.AppReducer.carrinho,
  item_id: state.AppReducer.item_id,

  total_carrinho: state.AppReducer.total_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader,
  usuario: state.AppReducer.usuario,
});


const mapDispatchToProps = dispatch => bindActionCreators({ addToCart, updateItemId, updateCart, setModalVisible, showMyLoader, setStatusCadastroUsuario }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ListItemIos);