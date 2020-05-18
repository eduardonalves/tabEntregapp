import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";
//import CustomText from "../components/common/CustomText";
//import Constants from "../utils/constants";
import { categoriasFetch } from '../actions/AppActions';

 class RestaurantItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    
  }
  handleClick = () => {

    this.setState({
      isClicked: !this.state.isClicked
    });
    this.props.handleNaviagation();
  };
  render() {
  
    
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View
          style={{
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 6,
            height: 160
          }}
        >
          <Image
            style={{
              backgroundColor: Color.tabIconDefault,
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              borderRadius: 6
            }}
            source={{ uri: this.props.image.replace('http://localhost/', 'http://10.0.2.2/') }}
            //Local teste
            //source={require('../../assets/download/adayar-anandha-bhavan.jpg')}
            //Internet teste
            //source={{ uri: this.props.image }}
          />
          <View
            style={{
              padding: 16,
              position: "absolute",
              width: "100%",
              height: "100%",
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              borderRadius: 6
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: Color.checkoutContainerBackground
              }}
            >
              {this.props.name}
            </Text>
           
            <Text
              style={{
                fontSize: 14,
                color: Color.checkoutContainerBackground
              }}
            >
              Categoria
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});



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
});
const mapDispatchToProps = dispatch => bindActionCreators({categoriasFetch}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantItem);