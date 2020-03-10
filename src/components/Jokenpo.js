import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Platform,
    AsyncStorage,
    ActivityIndicator,
    ScrollView
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';
import { categoriasFetch,categoriasFetchInterval, showMyLoaderCategory, jogarJokenpo, setStatusCadastroUsuario } from '../actions/AppActions';

import Color from "../../constants/Colors";
import  BtnEscolha  from './Escolha';
import  Icone  from './IconeJokenpo';

class Jokenpo extends Component {

    constructor(props) {
        super(props);
        let userData = this.getToken();
        userData.then(resp => {
            //console.log(resp);
            if(typeof resp.token != 'undefined'){   
                this.props.setStatusCadastroUsuario(resp);
                //this.props.validaToken(res.id,res.token);
                //this.props.navigation.navigate('Main');
            } 
        });
        
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Pedra, Papel e Tesoura",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: Color.headerBar
            },
            headerLeft: <HeaderBackButton onPress={() => navigation.navigate("MenuRewardStack")}  tintColor="#fff"  />,
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
    jokenpo = (escolhaUsuario) => {
        
        this.props.jogarJokenpo(this.props.usuario.id, this.props.usuario.token, escolhaUsuario);
        
    }
    gotoMyGifts(){
        
        this.props.navigation.navigate("MyGifts", { user_id: this.props.usuario.id });
    }
    render() {
        let test = false
        if (this.props.showImage) {
            test = true
        }
        let btnDisabled=false;
        if(this.props.resultado_final !=''){
            btnDisabled=true;
        }
        
        return (
            <ScrollView>
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
                <View style={{padding:10}}>
                    <Text style={{
                        fontSize:30,
                        textAlign:'center'
                    }}>
                    Jogo do pedra, papel ou tesoura
                    </Text>
                    <Text style={{
                        fontSize:20,
                        textAlign:'center'
                    }}>
                    Disputa melhor de três
                    </Text>
                </View>
                <View style={{padding:10}}>
                    {this.props.resultado_final==''? (
                        <Text style={{
                            fontSize:30,
                            textAlign:'center',
                            color:'#E1AD01',
                            fontWeight:'bold'
                        }}>
                        Placar Parcial
                        </Text>
                    ):(
                        <Text style={{
                            fontSize:30,
                            textAlign:'center',
                            color:this.props.txtColor,
                            fontWeight:'bold'
                        }}>
                        Placar Final - {this.props.resultado_final} 
                        </Text>
                    )}
                    
                    <Text style={{
                        fontSize:30,
                        textAlign:'center'
                    }}>
                    {this.props.n_vitorias} x {this.props.n_derrotas}
                    </Text>
                    
                </View>
                <Text style={{
                        fontSize:20,
                        textAlign:'center'
                    }}>
                        Escolha uma opção
                </Text>
                <View style={styles.painelAcoes}  >
                    <BtnEscolha styleBtn={styles.btnEscolha} title='Pedra' jokenpo={() => this.jokenpo('Pedra')} disabled={btnDisabled} />
                    <BtnEscolha styleBtn={styles.btnEscolha} title='Papel' jokenpo={() => this.jokenpo('Papel')}  disabled={btnDisabled} />
                    <BtnEscolha styleBtn={styles.btnEscolha} title='Tesoura' jokenpo={() => this.jokenpo('Tesoura')} disabled={btnDisabled} />
                </View>
                <View style={styles.palco} >
                    {
                    test== true ? ( 
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: this.props.txtColor, height: 60 }}>{this.props.resultado} </Text>
                        <Icone texto='Sua escolha:' imagemUsuario={this.props.imagemUsuario} styleImage={styles.palco} />
                        <Icone texto='Escolha do Jogo:' imagemUsuario={this.props.imagemComputador} />
                    </View>
                    
                        ):(
                            <View>
                                <Text>''</Text>
                            </View>
                            
                    )} 
                </View>
                {
                    this.props.resultado_final !='' ? (
                        <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <View style={{padding:10}}>
                                <Button
                                    onPress={e => this.gotoMyGifts() } 
                                    title="Ver Sua Recompensa"
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
                    ):(
                        <View></View>
                    )
                }
                <View style={{padding:30}}></View>

            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    btnEscolha: {
      width: 90,
      color: Platform.OS === 'ios' ? Color.buttonIos : Color.button
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
    resultado: state.AppReducer.resultado, 
    txtColor: state.AppReducer.txtColor, 
    escolhaDoComputador: state.AppReducer.escolhaDoComputador, 
    escolhaUsuario: state.AppReducer.escolhaUsuario, 
    showImage: state.AppReducer.showImage, 
    imagemComputador: state.AppReducer.imagemComputador, 
    imagemUsuario: state.AppReducer.imagemUsuario,
    usuario: state.AppReducer.usuario,
    n_vitorias: state.AppReducer.n_vitorias,
    n_derrotas: state.AppReducer.n_derrotas,
    resultado_final: state.AppReducer.resultado_final,
});  
const mapDispatchToProps = dispatch => bindActionCreators({ categoriasFetch,categoriasFetchInterval, showMyLoaderCategory, jogarJokenpo, setStatusCadastroUsuario }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Jokenpo);