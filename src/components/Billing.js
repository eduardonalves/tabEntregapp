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
    Alert
} from "react-native";
import { Input } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atualizaFormaDePagamento, atualizaTroco, tiposPagamentoFetch, enviaPedido,setStatusEnvioPedido, limpaCarrinho, showMyLoader } from '../actions/AppActions';
import CartButton from "./common/CartButton";
import Color from "../../constants/Colors";


class Billing extends Component {
    constructor(props) {
        super(props);
        this.props.tiposPagamentoFetch();
       
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Pagamento",
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
    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if(nextProps.status_envio_pedido ==true) {
            this.props.setStatusEnvioPedido(false);
            
            this.props.navigation.navigate("ViewOrder", { Atendimento_id: nextProps.pedido.atendimento_id });
        }
    }
    UNSAFE_componentWillUnmount(){
        this.props.limpaCarrinho();
    }
    handleAtualizatroco(event){
        this.props.atualizaTroco(event);
    }
    handleSendOrder(){
        
        if(this.props.forma_pagamento== 1 && this.props.troco_pedido==''){
            
            Alert.alert(
                'Mensagem',
                `Por favor, informe se é necessário enviar troco!`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'OK',
                  },
                ],
                { cancelable: true },
              );
        }else{
           
            this.props.showMyLoader(true);
            
           this.props.enviaPedido(
                {
                    carrinho: this.props.carrinho,
                    total_carrinho: this.props.total_carrinho,
                    trocoresposta: this.props.troco_pedido,
                    cliente_id: this.props.usuario.id,
                    token: this.props.usuario.token,
                    obs: this.props.obs_pedido,
                    pagamento_id:this.props.forma_pagamento,
                    entrega_valor: this.props.usuario.frete_cadastro,
                    logradouro: this.props.usuario.logradouro,
                    numero:this.props.usuario.numero,
                    ponto_referencia: this.props.usuario.ponto_referencia,
                    complemento: this.props.usuario.complemento,
                    bairro_id: this.props.usuario.bairro,
                    cidad_id: this.props.usuario.cidade,
                    estado_id: this.props.usuario.uf,
                    telefone: this.props.usuario.telefone,
                    email: this.props.usuario.email,
                    bairro_nome: this.props.usuario.bairro_nome,
                    cidade_nome: this.props.usuario.cidade_nome,
                    estado_nome: this.props.usuario.estado_nome,
                    ponto_referencia: this.props.usuario.ponto_referencia,
                }
            );/**/
        }
        
    }
    render() {
        let payments = this.props.tipos_pagamento.map((v, k) => {
            
            return (
                <Picker.Item label={v.Pagamento.tipo} value={v.Pagamento.id} key={k} />
            );
        });
        let total_carrinho = this.props.total_carrinho.toString();
        total_carrinho =total_carrinho.replace(".",",");
        return (
            <View >
                <View style={styles.container} >
                    <View >
                        <Text style={{
                            fontSize: 26,
                            fontWeight:'bold' 
                        }}>
                            Total&nbsp;
                        </Text>
                        
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 26,
                            fontWeight:'bold' 
                        }}>
                        
                        <NumberFormat 
                            value={total_carrinho} 
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
                
                <View style={styles.container} >
                    
                    <View>
                        <Text style={{
                            textAlign: "center", fontSize: 18, textAlign: "center", flex: 1,
                            color: "#333"
                        }}>Forma de Pagamento</Text>
                        <Picker
                            selectedValue={this.props.forma_pagamento}
                            style={{ height: 22, width: 150, flex: 1, justifyContent: "center" }}
                            onValueChange={(itemValue, itemIndex) => this.props.atualizaFormaDePagamento(itemValue)}
                        >
                            {payments}

                        </Picker>
                    </View>
                    {
                        this.props.forma_pagamento== 1 ? (
                            <View style={{
                                flex: 1,
                                flexDirection: "row"
                            }}>
                                <Input
                                    placeholder="Troco p/ quanto?"
                                    label="Levar Troco?"
                                    onChangeText ={(event) => this.handleAtualizatroco(event)}
                                />
                            </View>
                        ) : (
                            <View style={{
                                flex: 1,
                                flexDirection: "row"
                            }}>
                                <Input
                                    
                                    placeholder="Troco p/ quanto?"
                                    label="Levar Troco?"
                                    onChangeText ={(event) => this.handleAtualizatroco(event)}
                                    editable={false}
                                    name="troco_pedido"
                                />
                            </View>
                        )
                    }
                    


                </View>
                <View style={styles.container} >
                    <View >
                        <Text style={{
                            fontSize: 15,
                            fontWeight:'bold',
                            textAlign:'center',
                            marginBottom:5, 
                        }}>
                            Endereço de Entrega
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            //fontWeight:'bold',
                            textAlign:'center'  
                        }}>
                            {this.props.usuario.logradouro}
                            {this.props.usuario.numero != '' ? ', '+ this.props.usuario.numero :'' }
                            {this.props.usuario.complemento != '' ? ', ' + this.props.usuario.complemento :'' }
                            {'\n'}
                            {this.props.usuario.bairro_nome != '' ? '' + this.props.usuario.bairro_nome :''}
                            {this.props.usuario.cidade_nome != '' ? ' - ' + this.props.usuario.cidade_nome :''}
                            {this.props.usuario.estado_nome != '' ? ' - ' + this.props.usuario.estado_nome :''}
                            {'\n'}
                            {this.props.usuario.ponto_referencia != '' ? '' + this.props.usuario.ponto_referencia :''}
                        </Text>
                    </View>
                    
                </View>
                <View style={{padding:20}} >
                    <View style={{width:"100%"}} >
                        <Button
                            color={Color.button}
                            title="Enviar Pedido" 
                            //disabled={this.props.show_loader} 
                            style={styles.button} 
                            onPress={() => this.handleSendOrder()}
                            
                        />
                    </View>
                    {this.props.show_loader == true ? (
                        <View
                        style={{
        
        
                          opacity: 1.0,
                          width: '100%',
                          height:'100%',
        
                          alignItems: 'center',
                         
                          position: 'absolute',
                          top: '50%',
                          left:'50%',
                        }}
                      >
                        <ActivityIndicator size="large" color="#4099ff"
        
                          animating={true}
                          hidesWhenStopped={true}
        
                        />
                      </View>
                    ):(
                        <View
                            style={{


                            opacity: 1.0,
                            width: '100%',
                            height:'100%',

                            alignItems: 'center',
                           
                            position: 'absolute',
                            top: '50%',
                            left:'50%',
                            }}
                        >
                            <ActivityIndicator size="large" color="#4099ff"

                            animating={true}
                            hidesWhenStopped={true}

                            />
                        </View>
                    )}
                    
                    
                </View>
               
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        marginTop: 8,
        marginBottom: 8,
        justifyContent: "center",
        padding: 16,
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
        justifyContent:"center",
      },
});
const mapStateToProps = state => ({
    carrinho: state.AppReducer.carrinho,
    total_carrinho: state.AppReducer.total_carrinho,
    qtd_carrinho: state.AppReducer.qtd_carrinho,
    show_loader: state.AppReducer.show_loader,
    forma_pagamento: state.AppReducer.forma_pagamento,
    tipos_pagamento: state.AppReducer.tipos_pagamento,
    troco_pedido: state.AppReducer.troco_pedido,
    obs_pedido: state.AppReducer.obs_pedido,
    status_envio_pedido: state.AppReducer.status_envio_pedido,
    usuario: state.AppReducer.usuario,
    pedido: state.AppReducer.pedido
});

const mapDispatchToProps = dispatch => bindActionCreators({ atualizaFormaDePagamento, atualizaTroco, tiposPagamentoFetch, enviaPedido, setStatusEnvioPedido, limpaCarrinho, showMyLoader }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Billing);