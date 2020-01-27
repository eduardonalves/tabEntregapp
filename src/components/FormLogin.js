import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableHighlight,
    Image,
    ActivityIndicator
} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";
import { 
    modificaEmail, 
    modificaSenha,
    autenticarUsuario 
} from '../actions/AppActions';



class formLogin extends Component {    

     constructor(props) {
        super(props);
        //console.log(this.props.navigation);
        
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Entrar",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: Color.headerBar
            }
        };
    }

    _autenticarUsuario() {
        const params = { 
            email: this.props.email, 
            senha: this.props.senha
        }; 

        this.props.autenticarUsuario(params);
    }

    renderBtnEntrar() {
        
        if(this.props.loadingLogin) {
            return ( <ActivityIndicator size="large" /> );
        }
        return(
            <Button title="Entrar" onPress={() => this._autenticarUsuario()} />
        )
    }

    render() {
        return (
            
            <View style={styles.grid} >
                <View style={styles.contentHeader}>
                    <Image source={require("../../assets/images/logo.png")} />
                </View>
                <View style={styles.contentBody}>
                    <Input 
                        value={this.props.email} 
                        containerStyle={styles._bodyInputText} 
                        label="Email" 
                       
                        onChangeText={texto => this.props.modificaEmail(texto)} />
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
                    
                        
                    </View>
                    <View style={styles.contentFooter}>
                        {this.renderBtnEntrar()}
                    </View>
                </View>
            
        );
    }
}

const mapStateToProps = state => ({
        email: state.AppReducer.email,
        senha: state.AppReducer.senha,
        msgErroLogin: state.AppReducer.msgErroLogin,
        loadingLogin: state.AppReducer.loadingLogin
});
export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    autenticarUsuario
})(formLogin);

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    grid: {
        flex: 1,
        padding: 20
    },
    contentHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    _headerTitle: {
        fontSize: 25,
        //color: '#fff'
    },
    contentBody: {
        flex: 2
    },
    _bodyInputText: {
        //fontSize: 20,
        //height: 45,
        //color: '#fafafa'
        marginTop:10,
    },
    _bodyText: {
        fontSize: 20,
        //color: '#32A852'
    },
    _LinkText:{
        fontSize: 20,
        color: '#32A852'
    },
    contentFooter: {
        flex: 2
    },
    _txtMsgErroLogin: {
        fontSize: 18,
        //color: '#ff0000'
    }
});