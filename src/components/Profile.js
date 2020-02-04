import React, { Component } from 'react';
import {
  View,

  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Picker,
  Alert,
  AsyncStorage
} from 'react-native';
import { Text, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  FILIAL,
  EMPRESA,
  SALT
} from '../Settings'
import {
  modificaEmail,
  modificaSenha,
  modificaNome,
  cadastraUsuario,
  modificaCep,
  modificaEndereco,
  modificaNumero,
  modificaComplemento,
  modificaPontoReferencia,
  modificaEstado,
  modificaCidade,
  modificaBairro,
  modificaTelefone,
  modificaConfirmaSenha,
  modificaUsername,
  estadosFetch,
  cidadesFetch,
  bairroFetch,
  limpaListaCidades,
  limpaListaBairros,
  limpaListaEstados,
  setStatusCadastroUsuario,
  limpaFormularioCadastro,
  modificaSenhaAntiga,
  modificaIdUsuario,
  cadastraUsuarioEdit,
  cadastraUsuarioEditComSenha,
  modificaUsuarioModificouCadastro,
  modificaCarregaEstadoFalha

} from '../actions/AppActions';




class Perfil extends Component {
  constructor(props) {
    super(props);
    this.props.limpaFormularioCadastro();
    let userData = this.getToken();
    console.log(userData);
    userData.then(
      res => {
        this.props.modificaCarregaEstadoFalha(false);
        this.props.modificaIdUsuario(res.id);
        this.props.modificaEmail(res.email);
        this.props.modificaSenha(res.password);
        this.props.modificaSenhaAntiga(res.password);
        this.props.modificaNome(res.nome);
        this.props.modificaEndereco(res.logradouro);
        this.props.modificaNumero(res.numero);
        this.props.modificaComplemento(res.complemento);
        this.props.modificaPontoReferencia(res.ponto_referencia);
        this.props.modificaEstado(res.uf);
        this.props.modificaCidade(res.cidade);
        this.props.modificaBairro(res.bairro);
        this.props.modificaTelefone(res.telefone);
        this.props.modificaConfirmaSenha(res.password);
        this.props.modificaUsername(res.username);
        this.props.estadosFetch();
        this.props.cidadesFetch(res.uf);
        this.props.bairroFetch(res.cidade);
      }
    ).catch(error => {

    });





  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    
    if (nextProps.usuario_atualizou_cadastro == true) {
      //console.log('this.props.usuario component will update');
      //console.log(this.props.usuario);
      if (this.props.usuario != "") {
        this.storeToken(this.props.usuario);
        this.props.modificaUsuarioModificouCadastro(false);
        //console.log(this.props.usuario);
        //this.props.estadosFetch();
      }
    }
  }



  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Perfil",
      headerTintColor: Color.headerBarTitle,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Color.headerBar,
        fontWeight: 'bold'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  }


  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      //console.log('setou o usuario na sessão');
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

  _cadastraUsuario() {
    const params = {
      nome: this.props.nome,
      email: this.props.email,
      senha: this.props.senha
    };

    this.props.cadastraUsuario(params);
  }
  _handleModificaEstado(estado) {
    if (estado != '') {
      this.props.cidadesFetch(estado);
      this.props.modificaEstado(estado);
    } else {
      this.props.modificaEstado(estado);
      this.props.limpaListaCidades();
      this.props.limpaListaBairros();
    }

  }

  _handleModificaCidade(cidade) {
    if (cidade != '') {
      this.props.bairroFetch(cidade);
      this.props.modificaCidade(cidade);
    } else {
      this.props.modificaCidade(cidade);
      this.props.limpaListaBairros();
    }
  }

  _handleCadastraUsuario() {

    if (this._isValidUser()) {


      if (this.props.senha_antiga != '' && this.props.senha_antiga != this.props.senha) {

        let usuario = {
          Cliente: {
            id: this.props.usuario_id,
            nome: this.props.nome,
            username: this.props.username,
            password: this.props.senha,
            passwordcconfirm: this.props.confirma_senha,
            logradouro: this.props.endereco,
            complemento: this.props.complemento,
            numero: this.props.numero,
            uf: this.props.estado,
            cidade: this.props.cidade,
            bairro: this.props.bairro,
            email: this.props.email,
            telefone: this.props.telefone,
            filial_id: FILIAL,
            salt: SALT,
            empresa_id: EMPRESA,
            ponto_referencia: this.props.ponto_referencia,
          }
        }
        this.props.cadastraUsuarioEditComSenha(usuario);
      } else {

        let usuario = {
          Cliente: {
            id: this.props.usuario_id,
            nome: this.props.nome,
            username: this.props.username,
            logradouro: this.props.endereco,
            complemento: this.props.complemento,
            numero: this.props.numero,
            uf: this.props.estado,
            cidade: this.props.cidade,
            bairro: this.props.bairro,
            email: this.props.email,
            telefone: this.props.telefone,
            filial_id: FILIAL,
            salt: SALT,
            empresa_id: EMPRESA,
            ponto_referencia: this.props.ponto_referencia,
          }

        }
        this.props.cadastraUsuarioEdit(usuario);
        
      }


    } else {
      console.log('is invalid user');
    }

  }
  _isValidUser() {
    if (this.props.username == '') {
      Alert.alert(
        'Mensagem',
        `O nome de usuário não pode ficar em branco.`,
        [
          {
            text: 'OK',
            //onPress: () => console.log('clicou'),
            style: 'WARNING',
          },
        ],
        { cancelable: true },
      );
      return false;
    }

    if (this.props.senha == '') {
      Alert.alert(
        'Mensagem',
        `A senha não pode ficar em branco.`,
        [
          {
            text: 'OK',
            //onPress: () => console.log('clicou'),
            style: 'WARNING',
          },
        ],
        { cancelable: true },
      );
      return false;
    }

    if (this.props.senha == '') {
      Alert.alert(
        'Mensagem',
        `O campo confirme sua senha não pode ficar em branco.`,
        [
          {
            text: 'OK',
            //onPress: () => console.log('clicou'),
            style: 'WARNING',
          },
        ],
        { cancelable: true },
      );
      return false;
    }

    if (this.props.endereco == '') {
      Alert.alert(
        'Mensagem',
        `O endereço não pode ficar em branco.`,
        [
          {
            text: 'OK',
            //onPress: () => console.log('clicou'),
            style: 'WARNING',
          },
        ],
        { cancelable: true },
      );
      return false;
    }
    if (this.props.estado == '') {
      Alert.alert(
        'Mensagem',
        `O estado não pode ficar em branco.`,
        [
          {
            text: 'OK',
            //onPress: () => console.log('clicou'),
            style: 'WARNING',
          },
        ],
        { cancelable: true },
      );
      return false;
    }
    if (this.props.cidade == '') {
      Alert.alert(
        'Mensagem',
        `A cidade não pode ficar em branco.`,
        [
          {
            text: 'OK',
            //onPress: () => console.log('clicou'),
            style: 'WARNING',
          },
        ],
        { cancelable: true },
      );
      return false;
    }
    if (this.props.bairro == '') {
      Alert.alert(
        'Mensagem',
        `O bairro não pode ficar em branco.`,
        [
          {
            text: 'OK',
            //onPress: () => console.log('clicou'),
            style: 'WARNING',
          },
        ],
        { cancelable: true },
      );
      return false;
    }
    return true;
  }
  render() {


    let estates = this.props.lista_estados.map((v, k) => {

      return (
        <Picker.Item label={v.Estado.estado} value={v.Estado.id} key={k} />
      );
    });

    let cities = this.props.lista_cidades.map((v, k) => {

      return (
        <Picker.Item label={v.Cidad.cidade} value={v.Cidad.id} key={k} />
      );
    });

    let neigborhood = this.props.lista_bairros.map((v, k) => {

      return (
        <Picker.Item label={v.Bairro.bairro} value={v.Bairro.id} key={k} />
      );
    });

    return (
      <ScrollView>
        <View style={styles.grid}>
          <View style={styles.contentBody}>

            {
              (this.props.carrega_estado_falha == true) ? (
                <View style={{
                  opacity: 1.0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: 50

                }} >
                  <Icon name="frown-o" size={200} color="#ef6136" />
                  <Text style={{ fontSize: 18 }}>Ops!</Text>
                  <Text style={{ fontSize: 15 }}>Houve uma falha ao carregar seu cadastro.</Text>
                  <Text style={{ fontSize: 15 }}>Tente novamente mais tarde!</Text>
                </View>
              ) : (

                  <View>
                    <Input
                      value={this.props.nome}

                      label="Nome"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaNome(texto)} />
                    <Input
                      value={this.props.nome}

                      label="Nome"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaNome(texto)} />
                    <Input
                      value={this.props.nome}

                      label="Nome"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaNome(texto)} />
                    <Input
                      value={this.props.telefone}

                      label="Telefone"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaTelefone(texto)} />
                    <Input
                      value={this.props.email}
                      label="E-mail"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaEmail(texto)} />

                    <Input
                      value={this.props.endereco}

                      label="Endereço"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaEndereco(texto)} />

                    <Input
                      value={this.props.numero}

                      label="Numero"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaNumero(texto)} />

                    <Input
                      value={this.props.complemento}

                      label="Complemento"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaComplemento(texto)} />

                    <Input
                      value={this.props.ponto_referencia}

                      label="Ponto de Referência"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaPontoReferencia(texto)} />

                    <View style={{ padding: 10, marginTop: 10 }}>
                      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Observação:</Text>
                      <Text style={{ textAlign: 'center', fontSize: 16 }}>Só aparecerão os bairros cobertos pela entrega.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>


                      <Text style={{
                        fontSize: 16, flex: 1,
                        color: "#7b7b7b"
                      }}>Estado</Text>

                      <Picker
                        selectedValue={this.props.estado}
                        style={{ height: 22, width: 200, flex: 1, justifyContent: "center", marginBottom: 16 }}
                        onValueChange={(itemValue, itemIndex) => this._handleModificaEstado(itemValue)}
                      >
                        <Picker.Item label="Selecione" value="" key="-1" />
                        {estates}

                      </Picker>
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                      <Text style={{
                        fontSize: 16, flex: 1,
                        color: "#7b7b7b"
                      }}>Cidade</Text>

                      <Picker
                        selectedValue={this.props.cidade}
                        style={{ height: 22, width: 200, flex: 1, justifyContent: "center", marginBottom: 16 }}
                        onValueChange={(itemValue, itemIndex) => this._handleModificaCidade(itemValue)}
                      >
                        <Picker.Item label="Selecione" value="" key="-1" />
                        {cities}

                      </Picker>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                      <Text style={{
                        fontSize: 16, flex: 1,
                        color: "#7b7b7b"
                      }}>Bairro</Text>

                      <Picker
                        selectedValue={this.props.bairro}
                        style={{ height: 22, width: 200, flex: 1, justifyContent: "center", marginBottom: 16 }}
                        onValueChange={(itemValue, itemIndex) => this.props.modificaBairro(itemValue)}
                      >
                        <Picker.Item label="Selecione" value="" key="-1" />
                        {neigborhood}

                      </Picker>
                    </View>

                    <Input
                      value={this.props.username}
                      //placeholder="Nome" 
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaUsername(texto)}
                      label='Nome de Usuário'
                    />

                    <Input
                      value={this.props.senha}
                      secureTextEntry
                      label="Senha"
                      //placeholderTextColor="#fff" 
                      containerStyle={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaSenha(texto)} />

                    <Input
                      value={this.props.confirma_senha}
                      secureTextEntry
                      label="Confirme a Senha"
                      //placeholderTextColor="#fff" 
                      stylcontainerStylee={styles._bodyInputText}
                      onChangeText={texto => this.props.modificaConfirmaSenha(texto)} />



                    <Text style={styles.txtMsgErro}>{this.props.msgErroCadastro}</Text>

                    <Button title="Cadastrar"
                      // color="#115e54" 
                      disabled={this.props.show_loader}
                      onPress={() => this._handleCadastraUsuario()} />
                  </View>

                )
            }


          </View>

        </View>
        {
          this.props.show_loader == true ? (
            <View
              style={{

                flexDirection: 'column',
                opacity: 1.0,
                width: '100%',

                //alignItems: 'center',
                //flex: 1,
                alignSelf: 'center',
                position: 'absolute',
                marginTop: '50%',
                marginLeft: '50%',
                width: '100%',
                //height:'100%',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size="large" color="#4099ff"

                animating={true}
                hidesWhenStopped={true}

              />
            </View>
          ) : (
              <View
                style={{

                  flexDirection: 'column',
                  opacity: 0.0,
                  width: '100%',
                  //height:'100%',
                  //alignItems: 'center',
                  //flex: 1,
                  alignSelf: 'center',
                  alignContent: 'center',
                  position: 'absolute',
                  marginTop: '50%',
                  marginLeft: '50%',
                  width: '100%',
                  alignItems: 'center',

                }}
              >
                <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size="large" color="#4099ff"

                  animating={true}
                  hidesWhenStopped={true}

                />
              </View>
            )
        }
      </ScrollView>

    );
  }

}

const mapStateToProps = state => ({
  nome: state.AppReducer.nome,
  email: state.AppReducer.email,
  senha: state.AppReducer.senha,
  cep: state.AppReducer.cep,
  endereco: state.AppReducer.endereco,
  numero: state.AppReducer.numero,
  complemento: state.AppReducer.complemento,
  ponto_referencia: state.AppReducer.ponto_referencia,
  estado: state.AppReducer.estado,
  cidade: state.AppReducer.cidade,
  bairro: state.AppReducer.bairro,
  telefone: state.AppReducer.telefone,
  cadastro_usuario: state.AppReducer.cadastro_usuario,
  confirma_senha: state.AppReducer.confirma_senha,
  usuario: state.AppReducer.usuario,
  msgErroCadastro: state.AppReducer.msgErroCadastro,
  loadingCadastro: state.AppReducer.loadingCadastro,
  lista_bairros: state.AppReducer.lista_bairros,
  lista_cidades: state.AppReducer.lista_cidades,
  lista_estados: state.AppReducer.lista_estados,
  carrega_cidade_falha: state.AppReducer.carrega_cidade_falha,
  carrega_estado_falha: state.AppReducer.carrega_estado_falha,
  carrega_bairro_falha: state.AppReducer.carrega_bairro_falha,
  show_loader: state.AppReducer.show_loader,
  cadastro_usuario_sucesso: state.AppReducer.cadastro_usuario_sucesso,
  usuario: state.AppReducer.usuario,
  username: state.AppReducer.username,
  usuario_id: state.AppReducer.usuario_id,
  senha_antiga: state.AppReducer.senha_antiga,
  usuario_atualizou_cadastro: state.AppReducer.usuario_atualizou_cadastro,
});

export default connect(mapStateToProps, {
  modificaEmail,
  modificaSenha,
  modificaNome,
  cadastraUsuario,
  modificaCep,
  modificaEndereco,
  modificaNumero,
  modificaComplemento,
  modificaPontoReferencia,
  modificaEstado,
  modificaCidade,
  modificaBairro,
  modificaTelefone,
  modificaConfirmaSenha,
  estadosFetch,
  cidadesFetch,
  bairroFetch,
  limpaListaCidades,
  limpaListaBairros,
  limpaListaEstados,
  cadastraUsuario,
  setStatusCadastroUsuario,
  limpaFormularioCadastro,
  modificaUsername,
  modificaSenhaAntiga,
  modificaIdUsuario,
  cadastraUsuarioEdit,
  cadastraUsuarioEditComSenha,
  modificaUsuarioModificouCadastro,
  modificaCarregaEstadoFalha
})(Perfil);

const styles = StyleSheet.create({
  grid: {
    //flex: 1,
    padding: 20,
    marginTop: 8,
    marginBottom: 400,
  },
  contentBody: {
    //flex: 4,
    justifyContent: 'center',

  },
  _bodyInputText: {
    flex: 1,
    //marginBottom:5,
    //marginTop:10,
    //fontSize: 20,
    //height: 45,
    //color: '#fafafa'
  },
  contentFooter: {
    //flex: 1
  },
  txtMsgErro: {
    fontSize: 18,
    //color: '#ff0000'
  }
});