import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from './produto';

export default function ListaRegistros() {
  const [registros, setRegistros] = useState([]);
  const [telaAtual, setTelaAtual] = useState('form');

  // Função para buscar registros do AsyncStorage
  const buscarRegistros = async () => {
    try {
      const registrosExistentes = await AsyncStorage.getItem('registros');
      const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];
      setRegistros(registros);
    } catch (error) {
      console.error('Erro ao buscar registros: ', error);
    }
  };

  useEffect(() => {
    buscarRegistros();
  }, []);

  if (telaAtual === 'produto') {
          return (
              <Produto />
          )
    }

    const renderItem = ({ item }) => (
        <View style={styles.registro}>
          <Text>Quantidade: {item.qtd}</Text>
          <Text>Produto: {item.produto}</Text>
          <Text>Valor: {item.valor}</Text>
        </View>
      )

  return (
    <View style={styles.container}>
        <Text style={styles.cabecalho}>Registros Salvos:</Text>
        <Button 
        title="Voltar para Cadastro"
        onPress = {() => setTelaAtual('produto')}
        />
        <FlatList
            data={registros}
            keyExtractor={(item, index) => index.toString()}
            renderItem = {renderItem}
        />
        
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  cabecalho: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  registro: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
});
