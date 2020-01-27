import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pedidosFetch, showMyLoader } from '../actions/AppActions';
import { AppLoading } from 'expo';


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import ListOrder from "./ListOrder";
import CartButton from "./common/CartButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from "../../constants/Colors";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.props.showMyLoader(true);
    this.props.pedidosFetch(17,'k1wt0x33kg');
    
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
        color: '#fff',
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
            <Icon name="frown-o" size={200} color="#ef6136" />
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
              renderItem={({ item }) => (
                <ListOrder
                  item= {item}
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
              <Icon name="frown-o" size={200} color="#ef6136" />
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
  meus_pedidos_carregados_falha: state.AppReducer.meus_pedidos_carregados_falha
});
const mapDispatchToProps = dispatch => bindActionCreators({ pedidosFetch, showMyLoader }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Orders);