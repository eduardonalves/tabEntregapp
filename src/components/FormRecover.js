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
    ScrollView,
    Platform
} from 'react-native';
import AsyncStorage from '@callstack/async-storage';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    modificaEmail,
    modificaSenha,
    recuperarSenha,
    setStatusCadastroUsuario,
    limpaFormularioCadastro,
    modificaUsername
} from '../actions/AppActions';
import { FILIAL, EMPRESA, SALT } from '../Settings';



class FormRecover extends Component {

    constructor(props) {
        super(props);
        this.props.limpaFormularioCadastro();
    }



    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Recuperar Senha",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: Color.headerBar
            }
        };
    }

    _recuperarSenha() {

        this.props.recuperarSenha({
            clt: this.props.username
        });
    }

    renderBtnEntrar() {

        if (this.props.loadingLogin) {
            return (<ActivityIndicator size="large" />);
        }
        return (
            <Button
                title="Recuperar Senha"
                onPress={() => this._recuperarSenha()}
                color={Platform.OS === 'ios' ? Color.buttonIos : Color.button}
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
                    <View  >

                        <View style={styles.contentHeader}>
                            <Image source={require("../../assets/images/logo_mini.jpg")} />
                        </View>
                        <View style={styles.contentBody}>
                            {
                                this.props.show_loader == true ? (
                                    <View
                                        style={{
                                            alignSelf: 'center',
                                            opacity: 1.0,
                                            alignItems: 'center',
                                            position: 'absolute',
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
                                                alignSelf: 'center',
                                                opacity: 0.0,
                                                alignItems: 'center',
                                                position: 'absolute',
                                            }}
                                        >
                                            <ActivityIndicator size="large" color={Color.ActivityIndicator}

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


                            <Text style={styles._txtMsgErroLogin}>{this.props.msgErroLogin}</Text>
                            <View style={styles.contentFooter}>
                                {this.renderBtnEntrar()}
                            </View>


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
    show_loader: state.AppReducer.show_loader,
    username: state.AppReducer.username
});
export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    recuperarSenha,
    setStatusCadastroUsuario,
    limpaFormularioCadastro,
    modificaUsername
})(FormRecover);

const styles = StyleSheet.create({
    background: {
        flex: 2
    },
    grid: {
        flex: 1,
        padding: 20
    },
    contentHeader: {
        flex: 1,
        padding: 10,
        //justifyContent: 'center',
        alignItems: 'center'
    },
    contentBody: {
        flex: 2
    },
    contentFooter: {
        flex: 2,
        marginTop: 10
    },
    _headerTitle: {
        fontSize: 25,
        //color: '#fff'
    },

    _bodyInputText: {
        //fontSize: 20,
        //height: 45,
        //color: '#fafafa'
        marginTop: 10,
    },
    _bodyText: {
        fontSize: 20,
        //color: '#32A852'
    },
    _LinkText: {
        fontSize: 20,
        color: '#32A852'
    },

    _txtMsgErroLogin: {
        fontSize: 18,
        //color: '#ff0000'
    }
});