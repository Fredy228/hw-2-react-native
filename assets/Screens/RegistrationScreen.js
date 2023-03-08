import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

export const RegistrationScreen = ({ setIsScreen }) => {
  const [avatar, setAvatar] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    if (email !== '' && password !== '' && login !== '') {
      console.log(`login: ${login}`);
      console.log(`email: ${email}`);
      console.log(`password: ${password}`);
      setLogin('');
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

  const toogleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleScreen = () => {
    setIsScreen(true);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
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
              <View style={styles.boxAvatar}>
                <TouchableOpacity
                  style={{
                    ...styles.avatarBtn,
                    overflow: avatar ? 'hidden' : 'visible',
                  }}
                  onPress={pickImage}
                >
                  {avatar ? (
                    <Image
                      source={{ uri: avatar }}
                      style={{ width: 120, height: 120 }}
                    />
                  ) : (
                    <Image
                      style={styles.avatarBtnIco}
                      source={require('../img/add.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.formTitle}>Регистрация</Text>
              </View>
              <View style={styles.boxInput}>
                <TextInput
                  style={styles.input}
                  placeholder={'Логин'}
                  value={login}
                  onChangeText={value => setLogin(value.trim())}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.boxInput}>
                <TextInput
                  style={styles.input}
                  placeholder={'Адрес электронной почты'}
                  value={email}
                  onChangeText={value => setEmail(value.trim())}
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
                  Уже есть аккаунт? Войти
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
  boxAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBtn: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    transform: [{ translateY: -60 }],
    position: 'relative',
  },
  avatarBtnIco: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
  },
  formTitle: {
    marginTop: -30,
    paddingBottom: 30,
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
