import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from './produto';

export default function ListaRegistros({propRegistro, onApagar}) {
  return (
    <FlatList 
      data={propRegistro}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.item}>
          <Text>Quantidade: {item.qtd}</Text>
          <Text>Produto: {item.produto}</Text>
          <Text>Valor: {item.valor}</Text>
          <Button 
            title="Apagar"
            onPress={() => onApagar(index)}
          />
        </View>
      )}
    />
  )

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: 25,
  },
  inputRow: {
      flexDirection: 'row',
      marginBottom: 10,
      width: '100%',
      justifyContent: 'flex-end',
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      width: '80%',
      marginBottom: -10,
      marginLeft: 5,
      borderRadius: 5,
      marginTop: 15,
  },
  label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20
  },
  botao: {
      marginTop: 20
  },
  cabecalho: {
      marginTop: '10',
      marginBottom: '40',
      fontSize: 20,
      fontStyle: 'italic',
  }
})