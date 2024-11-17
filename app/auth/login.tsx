import React, { useState } from 'react';
import { View, TextInput, Text, Alert, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { setToken, storeTokenInAsyncStorage } from '../../store/slices/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      const token = '47108952-bc71d47210c5897e4b2251e5a';
      dispatch(setToken(token));
      dispatch(storeTokenInAsyncStorage(token));
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Gagal', 'Username atau password salah.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-4">
      <Text className="font-minimoBold text-3xl text-green-900 mb-6">Login</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#6b7280" // Tailwind gray-500
        className="font-minimo border border-gray-300 rounded-md p-4 my-2 w-full text-base text-gray-700 bg-white shadow-sm"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6b7280"
        secureTextEntry
        className="font-minimo  border border-gray-300 rounded-md p-4 my-2 w-full text-base text-gray-700 bg-white shadow-sm"
        onChangeText={setPassword}
        value={password}
      />
      <Pressable
        onPress={handleLogin}
        className="bg-green-800 rounded-lg py-3 px-6 mt-4 w-full"
      >
        <Text className="text-white text-center font-medium text-lg font-minimoBold ">Login</Text>
      </Pressable>
    </View>
  );
};

export default Login;
