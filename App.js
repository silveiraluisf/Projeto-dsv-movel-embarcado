import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import axios from 'axios';
import { Component } from 'react';

export default class App extends Component {

  baseUrl = 'http://192.168.0.15:3000';
  state = {
    sensor: {},
    config: {},
    newConfig: ""
  }

constructor (props) {
  super(props)
  this.getConfig()
  //this.getSensores()
  setInterval(() => {
    this.getSensores()
  }, 5000);
}


getSensores = () => {
  axios({
    method: 'get',
    url: this.baseUrl + '/sensor',
  }).then((response) => {
    var posicaoUltimoValor = response.data.length;
    this.setState({
      sensor: response.data[posicaoUltimoValor -1]
    });
    console.log(this.state);
  }).catch(error => console.log(error));
};

getConfig = () => {
  axios({
    method: 'get',
    url: this.baseUrl + '/config',
  }).then((response) => {
    var posicaoUltimoValor = response.data.length;
    this.setState({
      config: response.data[posicaoUltimoValor -1]
    });
  }).catch(error => console.log(error));
};

patchConfig = () => {
  axios({
    method: 'patch',
    url: this.baseUrl + '/config/' + this.state.config.id,
    data : { valor: this.state.newConfig }
  }).then((response) => {
    console.log(response.data)
    this.setState({
      config: response.data
    });
  }).catch(error => console.log(error));
}

onChangeNumber = (text) => {
  this.setState({ newConfig: text })
}

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Text>Projeto final de desenvolvimento móvel embarcado!</Text>
        </View>
        <View style={styles.body}>
            <Text> Valor medido pelo sensor: <Text style={styles.innerText}> {this.state.sensor?.valor}</Text></Text> 
        </View>

        <View style={styles.configurarSensor}>
          <Text>Configurar Sensor</Text>
          <Text>Valor atual:  <Text style={styles.innerText}> {this.state.config?.valor}</Text></Text>
          <TextInput value={this.state.newConfig} style={inputStyles.input} placeholder="Novo valor" keyboardType="numeric" onChangeText={this.onChangeNumber}></TextInput> 
          <Button title="alterar" onPress={() => this.patchConfig()} color="#53c16f" />
        </View>
        <StatusBar style="auto" />
      </View>
    );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerText: {
    fontWeight: 'bold'
  },
  configurarSensor: {
    marginTop: 20
  }

});

const inputStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

