import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    AsyncStorage,
    ScrollView,
    Platform,
     
} from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";

import { 
    modificaEmail, 
    modificaSenha,
    autenticarUsuario,
    setStatusCadastroUsuario,
    limpaFormularioCadastro,
    modificaUsername,
    validaToken
} from '../actions/AppActions';
import { FILIAL, EMPRESA, SALT } from '../Settings';



class formLogin extends Component {    

    constructor(props) {
        super(props);
       
        let storeData = this.getToken();
      
        storeData.then(resp => {
            
            if(resp != null && resp != ''){
                console.log('resp');
            console.log(resp);
                if(typeof resp.token != 'undefined'){
                    this.props.validaToken(resp.id,resp.token);
                    
                    if(this.props.is_valid_token == 'OK'){
                        this.props.setStatusCadastroUsuario(resp);
                        this.props.navigation.navigate('Main');
                    }
                    
                }
            }
            
            
        }).catch(error=>{
            //console.log(error);
        });
        //console.log(this.props);
        if(typeof  this.props.usuario != 'undefined') {
            if(this.props.usuario != ''){
                if(this.props.usuario){
                    this.props.validaToken(this.props.usuario.id, this.props.usuario.token);
                    if(this.props.is_valid_token == 'OK'){
                        this.storeToken(this.props.usuario);
                        this.props.setStatusCadastroUsuario(this.props.usuario);
                        this.props.navigation.navigate('Main');
                    }
                    
                }
            }
            
            
        }
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        

        //console.log('nextProps');
        //console.log(nextProps);
        if(typeof  nextProps.usuario != 'undefined') {
            if(nextProps.usuario != ''){
                if(nextProps.usuario){
                    this.props.validaToken(nextProps.usuario.id, nextProps.usuario.token);
                    if(this.props.is_valid_token == 'OK'){
                        this.storeToken(nextProps.usuario);
                        this.props.setStatusCadastroUsuario(nextProps.usuario);
                        this.props.navigation.navigate('Main');
                    }
                    
                }
            }
            
            
        }
    }
    UNSAFE_componentWillMount(){
        //console.log('this.props.usuario');
        //console.log(this.props.usuario);
        if(this.props.usuario=='' || this.props.usuario==false ){
            
            let storeData = this.getToken();
            storeData.then(resp => {
                if(typeof resp.token != 'undefined'){
                    this.props.validaToken(nextProps.usuario.id, nextProps.usuario.token);
                    
                    if(this.props.is_valid_token == 'OK'){
                        this.props.setStatusCadastroUsuario(resp);
                        this.props.navigation.navigate('Main');
                    }
                }
                
            });
        }
        
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Entrar",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: Color.headerBar
            },
            headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Main")}  tintColor="#fff"  />,
        };
    }

    _autenticarUsuario() {
        let dadosUsuario = {
            username:this.props.username,
            password:this.props.senha,
            salt:SALT,
            empresa: EMPRESA,
            filial: FILIAL
        }; 

        this.props.autenticarUsuario(dadosUsuario);
    }

    renderBtnEntrar() {
        
        if(this.props.loadingLogin) {
            return ( <ActivityIndicator size="large" /> );
        }
        return(
            <Button title="Entrar" 
                onPress={() => this._autenticarUsuario()}
                color={ Platform.OS === 'ios' ? Color.buttonIos : Color.button }
                disabled={this.props.show_loader}
            />
        )
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

    render() {
        
        return (
        <KeyboardAwareScrollView  
            enableAutomaticScroll
            extraScrollHeight={10}
            enableOnAndroid={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            extraHeight={Platform.select({ android: 200 })}
            contentContainerStyle={styles.grid}
                   >
            <ScrollView>
                <View style={styles.grid} >
                    <View style={styles.contentHeader}>
                        <Image source={require("../../assets/images/logo_mini.jpg")} />
                    </View>
                    <View style={styles.contentBody}>
                    {
                            this.props.show_loader == true ? (
                                <View
                                style={{
                                    alignSelf:'center',
                                    opacity: 1.0,
                                    alignItems: 'center',
                                    position: 'absolute',
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
                                    alignSelf:'center',
                                    opacity: 0.0,
                                    alignItems: 'center',
                                    position: 'absolute',
                                }}
                            >
                                <ActivityIndicator size="large" color="#4099ff"

                                animating={true}
                                hidesWhenStopped={true}
                                

                                />
                            </View>
                            )
                        }
                        <Input 
                            value={this.props.username} 
                            containerStyle={styles._bodyInputText} 
                            label="Nome de Usuário" 
                        
                            onChangeText={texto => this.props.modificaUsername(texto)} />
                        <Input 
                            value={this.props.senha} 
                            secureTextEntry 
                            containerStyle={styles._bodyInputText} 
                            label="Senha" 
                            
                            onChangeText={texto => this.props.modificaSenha(texto)} />
                        
                        <Text style={styles._txtMsgErroLogin}>{this.props.msgErroLogin}</Text>

                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={styles._bodyText}>Ainda não tem cadastro?</Text>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate("FormCadastro")}
                            >
                            <Text style={styles._LinkText}> Cadastre-se</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={styles._bodyText}>Não lembra a senha?</Text>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate("FormRecover")}
                            >
                            <Text style={styles._LinkText}> Recuperar senha.</Text>
                            </TouchableHighlight>
                        </View>
                        

                        </View>
                        
                        <View style={styles.contentFooter}>
                            {this.renderBtnEntrar()}
                        </View>
                    

                        
                    </View>
                    
            </ScrollView>
            
        </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = state => ({
        email: state.AppReducer.email,
        senha: state.AppReducer.senha,
        msgErroLogin: state.AppReducer.msgErroLogin,
        loadingLogin: state.AppReducer.loadingLogin,
        usuario: state.AppReducer.usuario,
        username: state.AppReducer.username,
        show_loader: state.AppReducer.show_loader,
        is_valid_token: state.AppReducer.is_valid_token,
});
export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    autenticarUsuario,
    setStatusCadastroUsuario,
    limpaFormularioCadastro,
    modificaUsername,
    setStatusCadastroUsuario,
    validaToken 
})(formLogin);

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    grid: {
        flex: 1,
        padding: 10
    },
    contentHeader: {
        flex: 4,
        alignSelf:"center",
        //justifyContent: 'center',
        //alignItems: 'center',
        //padding:60
    },
    _headerTitle: {
        fontSize: 25,
        //color: '#fff'
    },
    contentBody: {
        flex: 2,
        marginBottom:30,
    },
    contentFooter: {
        flex: 2,
        //marginTop:30
    },
    _bodyInputText: {
        //fontSize: 20,
        //height: 45,
        //color: '#fafafa'
        marginTop:10,
    },
    _bodyText: {
        fontSize: 15,
        color: Color.text
    },
    _LinkText:{
        fontSize: 15,
        color: Color.links
    },
    
    _txtMsgErroLogin: {
        fontSize: 15,
        //color: '#ff0000'
    }
});