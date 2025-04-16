import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Button } from 'react-native';
import config from '../config/config.json';
import {css} from '../assets/css';
import { FlatList } from 'react-native-web';

export default function ConsultaUsuarios({ navigation }){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    //Função para buscar os usuários cadastrados
    async function fetchUsers() {
        try{
            let response = await fetch(config.urlRootNode + 'users');
            let data = await response.json();
            setUsers(data);
        } catch(error) {
            console.error('Erro ao buscar usuários: ', error);
        } finally {
            setLoading(false);
        }
    }
}

//Função para deletar o usuário
const deleteUser = async(id) => {
    try{
        //Confirmação do usuário antes de deletar
        Alert.alert(
            "Confirmar Deleção",
            "Você tem certeza de que quer deletar este usuário?",
            [
                { text: "Cancelar", style: "cancel"},
                {
                    text: "Deletar",
                    onPress: async() => {
                        //Envia requisição DELETE para a API usando fetch
                        const response = await fetch(`${config.urlRootNode}delete/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        if (response.ok){
                            const result = await response.json();
                            Alert.alert("Sucesso", result.message);
                            fetchUsers(); // Atualiza a lista de usuários após a deleção
                        } else {
                            Alert.alert("Erro", "Erro ao tentar deletar o usuário");
                        }
                    }
                }
            ]
        );
    } catch (error) {
        console.error("Erro ao deletar usuário: ", error);
        Alert.alert("Erro", "Erro ao tentar deletar o usuário");
    }
};

useEffect(() => {
    fetchUsers();
}, []);

return (
    <View style={css.container}>
        <Text style={css.title}>Lista de Usuários</Text>
    
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <FlatList 
                data={users} //A lista de usuários
                keyExtractor={(item) => item.id.toString()} // Chave única para cada item
                renderItem={({ item }) => (
                    
                        <><View style={css.item}>
                        <Text style={{ fontWeight: 'bold' }}>Nome: {item.name}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Data de Cadastro: {new Date(item.createdAt).toLocaleDateString()}</Text>
                    </View><View>
                            <Button
                                title="Apagar"
                                onPress={() => deleteUser(item.id)} />
                        </View></>
                    
                )}
                ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20 }}>
                    Nenhum usuário cadastrado
                </Text>}
                style={{marginTop: 20}}
            />
            // <ScrollView style={{ marginTop: 20}}>
            //     {users.length > 0 ? (
            //         users.map((user, index) => (
            //             <View key={index} style={css.card}>
            //                 <Text style={{ fontWeight: 'bold' }}>Nome: {user.name}</Text>
            //                 <Text>Email: {user.email}</Text>
            //                 <Text>Data de Cadastro:
            //                     {new Date(user.createdAt).toLocaleDateString()}
            //                 </Text>
            //             </View>
            //         ))
            //     ) : (
            //         <Text style={{ textAlign: 'center', marginTop: 20}}>
            //             Nenhum usuário cadastrado.
            //         </Text>
            //     )}
            // </ScrollView>
        )}

        {/* Botão para voltar à tela anterior*/}
        <TouchableOpacity style={css.button} onPress={() => navigation.goBack()}>
            <Text style={css.button__text}>Voltar</Text>
        </TouchableOpacity>
    </View>
)