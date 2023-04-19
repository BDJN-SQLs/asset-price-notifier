import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AppTextInput from '../components/AppTextInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    try {
      const data = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.log(`Error in useEffect login ${error}`);
      return `Error in useEffect login ${error}`;
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        ></View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="Email" />
          <AppTextInput placeholder="Password" secureTextEntry={true} />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font['poppins-bold'],
              color: Colors.onPrimary,
              textAlign: 'center',
              fontSize: FontSize.large,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Register')}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              color: Colors.text,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}
          >
            Register Here
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
