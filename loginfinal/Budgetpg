import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet, 
} from 'react-native';
import firestore from "@react-native-firebase/firestore";



function Budgetpg({navigation}) {
  const [text, onChangeText] = React.useState('');
  const updateUserBudget = async () => {
    try {
      const userId = 'xxvkRzKqFcWLVx4hWCM8GgQf1hE3';
      await firestore().collection('users').doc(userId).update({
        user_budget: text,
      });
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error updating user budget:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() =>  navigation.goBack()}>
        <Text style={styles.backBTN}> ⟨ </Text>
      </TouchableOpacity>

      <Text style={styles.introBudget}>이번 달 식비 예산을 설정해주세요.</Text>
      <Text style={styles.subTitle}>
        매달 1회 변경 가능하니 신중하게 해주세요 !
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="300,000원"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => updateUserBudget()}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // 배경색상 추가
  },
  title: {
    fontSize: 40,
    top: 47,
    marginBottom: 211,
    fontFamily: 'NanumGothic',
    color: '#000', // 글자색상 추가
  },
  
  input: {
    fontSize: 15,
    borderBottomWidth: 0.5,
    height: 40,
    width: 232,
    marginBottom: 30,
    color: '#878787',
  },
  save: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    bottom: 15,
    right: 45,
  },
  saveTxt: {
    fontSize: 12,
    color: '#757575',
  },
  signUp: {
    top: 105,
    right: 100,
    paddingHorizontal: 100,
  },
  reset: {
    top: 90,
    left: 100,
    paddingHorizontal: 100,
  },
  
  button: {
    top: 85,
    backgroundColor: '#FEA655',
    paddingVertical: 10,
    paddingHorizontal: 48,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'NanumGothic',
  },
  introBudget: {
    fontSize: 20,
    top: 149,
    marginBottom: 211,
    fontFamily: 'NanumGothic',
    color: '#000', // 글자색상 추가
  },
  subTitle: {
    color: '#727272',
    bottom: 45,
  },
    back: {
    top: 42,
    right: 163,
  },
  backBTN: {
    fontSize: 25,
  },
})

export default Budgetpg;
