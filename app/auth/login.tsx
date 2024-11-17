import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      const token = 'xxxxxxxxxx'; 
      dispatch(setToken(token));
      router.replace('/(tabs)'); 
    } else {
      Alert.alert('Login Gagal', 'Masukkan username atau password.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Login</Text>
      <TextInput
        placeholder="Username"
        className="border p-2 my-2 w-3/4"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border p-2 my-2 w-3/4"
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
