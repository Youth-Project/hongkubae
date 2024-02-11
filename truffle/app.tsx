import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './android/app/navigations/TabNavigation';
import LoginStackNavigator from './android/app/navigations/LoginStackNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Alert } from 'react-native';

//import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


//firebase.auth().currentUser.uid

//로그인 구현
const onSignIn = async () => {
  try{
    const {user} = await signIn({email, password});
    Alert.alert('로그인 성공')
  } catch (e) {
    Alert.alert('로그인 실패');
  }
};



//데이터 삭제
const onDelete = async () => {};

const Stack = createNativeStackNavigator();

export default function App () {
  //--로그인 여부 판단해서 로그인||메인 네비게이터 분리--\\
  const [isLogin, setIsLogin] = useState(true);

  return (
    <NavigationContainer independent = {false}>
      <Stack.Navigator
        screenOptions={({ route }) => ({ headerShown: false })}
        initialRouteName={isLogin ? 'TabNavigator' : 'LoginStackNavigator'}
      >
        {
          isLogin ? (
            <Stack.Screen name='TabNavigator' component={TabNavigator} />
          ) : (
            <Stack.Screen
              name='LoginStackNavigator'
              options={{ animationEnabled: false }} // 초기 로그인 시 네비게이션 애니메이션 제거
            >
              {(props) => (
                <LoginStackNavigator {...props} setIsLoggedIn={setIsLogin} />
              )}
            </Stack.Screen>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//export default App;
