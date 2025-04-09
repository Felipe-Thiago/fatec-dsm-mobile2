import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import config from '../config/config.json';
import {css} from '../assets/css';

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

useEffect(() => {
    fetchUsers();
}, []);