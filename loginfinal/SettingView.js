import React, {useState, useEffect} from "react";
import { Button, View, StyleSheet, Text, Dimensions,TouchableOpacity, Modal} from "react-native";
import SettingModifyIcon from "../assets/icons/SettingModifyIcon.svg";
import WithdrawModal from "../assets/icons/WithdrawModal.svg";
import LogoutModal from "../assets/icons/LogoutModal.svg";
import YesBTN from "../assets/icons/YesBTN.svg";
import NoBTN from "../assets/icons/NoBTN.svg";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SettingsView = ({navigation}) => {
  const [logoutVisible, setLogoutVisible]=useState(false);
  const [withdrawVisible, setWithdrawVisible]=useState(false);
  const [Budget,setBudget] = useState();

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    const userId = 'aBsXiwzPUnVsFAH7dLBtmkum1383';
    try {
      const userRef = firestore().collection('users').doc(userId);
      const snapshot = await userRef.get();
      if (snapshot.exists) {
        const userData = snapshot.data();
        const userBudget = userData.user_budget;
        setBudget(userBudget);
      } else {

        console.log('사용자 문서가 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('예산을 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const handleWithdraw = async () => {
    const userId = 'aBsXiwzPUnVsFAH7dLBtmkum1383';
    try {
        await firestore().collection('users').doc(userId).delete();
        console.log("사용자 문서가 삭제되었습니다.");

      const user = auth().currentUser;
      if (user) {
        user.delete();
        console.log('사용자가 성공적으로 삭제되었습니다.');
    } else {
      console.log('현재 로그인한 사용자가 없습니다.')
    }}catch (error) {
      console.error("사용자 탈퇴 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchBudget();
    });
    return unsubscribe;
  }, [navigation]);

  const logoutModal = () => {
    setLogoutVisible(!logoutVisible);
  };

  const withdrawVisModal = () => {
    setWithdrawVisible(!withdrawVisible);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log("사용자가 로그아웃되었습니다.");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.Texts}>
        Setting
      </Text>

      <View style={Styles.MonthlyContainer}>
        <View style={Styles.MonthlyPlan}>
          <Text style={Styles.MonthlyText}>{Budget ? Budget + ' 원' : '로딩 중...'}</Text>
            <View style={{flexDirection:'row', gap:120, marginTop:15}}>
              <Text style={{fontSize:10, marginLeft:20, marginTop:10}}>이번 달 예산을 설정해주세요!</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('MonthlyModifyView')}>
                <SettingModifyIcon/>
              </TouchableOpacity>
            </View>
        </View>

        <View style={[Styles.SettingSelect, {marginTop:45}]}>
          <TouchableOpacity>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>비밀번호 변경</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.SettingSelect}>
          <TouchableOpacity>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>이용약관</Text>
            </View>
          </TouchableOpacity>
        </View>
          
        <View style={Styles.SettingSelect}>
          <TouchableOpacity onPress={logoutModal}>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>로그아웃</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.SettingSelect}>
          <TouchableOpacity onPress={withdrawVisModal}>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>탈퇴하기</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.SettingSelect}>
          <TouchableOpacity onPress={()=> navigation.navigate('CreditView')}>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>크레딧</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={logoutVisible}
        onRequestClose={logoutModal}
        >
          <View style={Styles.ModalContainer}>
            <View style={Styles.ModalOpen}>
              <LogoutModal/>
              <View style={Styles.ModalBTN}>
                <TouchableOpacity onPress={handleLogout}>
                  <YesBTN/>
                </TouchableOpacity>
                <TouchableOpacity onPress={logoutModal}>
                  <NoBTN/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={withdrawVisible}
        onRequestClose={withdrawVisModal}
        >
          <View style={Styles.ModalContainer}>
            <View style={Styles.ModalOpen}>
             <WithdrawModal/>
             <View style={Styles.ModalBTN}>
                <TouchableOpacity onPress={handleWithdraw}>
                  <YesBTN/>
                </TouchableOpacity>
                <TouchableOpacity onPress={withdrawVisModal}>
                  <NoBTN/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height ,
    backgroundColor: '#f8f9fa',
  },
  Texts: {
    color: '#474646',
    //fontFamily: 'NanumGothic, sans-serif',
    fontSize: 24,
    alignItems:"center",
    justifyContent:"center",
    marginLeft: 22,
    marginTop: 20,
  },
  MonthlyContainer:{
    flex:1,
    alignItems:'center',
  },
  MonthlyPlan:{
    width: Dimensions.get('window').width/1.15,
    height:100,
    marginTop:40,
    backgroundColor:'white',
  },
  MonthlyText:{
    fontSize:25,
    marginLeft:20,
    marginTop:15
  },
  SettingSelect:{
    width: Dimensions.get('window').width/1.15,
    marginTop:5,
    backgroundColor:'white',
    borderRadius:5,
  },
  SelectText:{
  marginLeft:20,
  fontSize:20,
  },

  SelectContainer:{
    height:50,
    justifyContent:'center',
  },
  ModalContainer:{
    flex:1,
    justifyContent:'flex-end',
  },
  ModalOpen:{
    backgroundColor:'white',
    width:Dimensions.get('window').width,
    height: 200,
  },
  ModalBTN:{
    flexDirection:'row',
    gap:30,
    position:'absolute',
    zIndex:1,
    bottom: 50,
    left: 70,
}

})
export default SettingsView;
