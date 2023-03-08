import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

export const LoginScreen = ({ setIsScreen }) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    if (email !== '' && password !== '') {
      console.log(`email: ${email}`);
      console.log(`password: ${password}`);
      setEmail('');
      setPassword('');
      return;
    }
    console.log('Enter all data');
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsShowKeyboard(false);
    });

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toogleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleScreen = () => {
    setIsScreen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={require('../img/bg.jpg')} style={styles.bgImg}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            keyboardVerticalOffset={-250}
            contentContainerStyle={{ top: isShowKeyboard ? 250 : 0 }}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 150 : 150,
              }}
            >
              <View>
                <Text style={styles.formTitle}>Войти</Text>
              </View>
              <View style={styles.boxInput}>
                <TextInput
                  style={styles.input}
                  placeholder={'Адрес электронной почты'}
                  onChangeText={value => setEmail(value.trim())}
                  value={email}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.boxInput}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={isShowPassword}
                  placeholder={'Пароль'}
                  value={password}
                  onChangeText={value => setPassword(value.trim())}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <Text style={styles.passwordBtn} onPress={toogleShowPassword}>
                  Показать
                </Text>
              </View>
              <TouchableOpacity style={styles.formBtn} onPress={submitForm}>
                <Text style={styles.formBtnText}>Войти</Text>
              </TouchableOpacity>
              <View style={styles.boxRefReg}>
                <Text style={styles.refReg} onPress={toggleScreen}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    position: 'relative',
  },
  formTitle: {
    paddingVertical: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 90,
  },
  passwordBtn: {
    position: 'absolute',
    top: 15,
    right: 10,
    fontSize: 16,
  },
  formBtn: {
    marginTop: 27,
    backgroundColor: '#FF6C00',
    borderRadius: 50,
  },
  formBtnText: {
    paddingVertical: 16,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  refReg: {
    fontSize: 16,
    color: '#1B4371',
    textAlign: 'center',
    marginTop: 16,
  },
});
