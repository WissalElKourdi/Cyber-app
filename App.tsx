import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { FlatList,Button, Image, StyleSheet, DrawerLayoutAndroid,KeyboardAvoidingView,Platform,TouchableWithoutFeedback, Keyboard, Text, View,Alert, SafeAreaView,Modal,Pressable, TextInput,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import * as Font from 'expo-font';
//import AppLoading from 'expo-app-loading';

//import {
 // DancingScript_400Regular,
  //DancingScript_500Medium,
  //DancingScript_600SemiBold,
  //DancingScript_700Bold
//} from '@expo-google-fonts/dancing-script'

//import {useFonts} from 'expo-font';
const Separator = () => <View style={styles.separator} />;
//b0d7ff

function HomeScreen({ navigation }){
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  //let[fontsLoaded]=useFonts({
    //DancingScript_400Regular,
    //DancingScript_500Medium,
    //DancingScript_600SemiBold,
    //DancingScript_700Bold
  //})
  //if (!fontsLoaded){
    //return <AppLoading />
  //}
  return (
    <View style={styles.container}>
      <View style ={styles.titleContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 35}}> BullyBuster </Text>
         <Image source={require('./assets/DesignLogo.png')} style={styles.logo2} />
      </View>


      <StatusBar style="auto" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('You did not login');
          setModalVisible(!modalVisible);
        } }>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
       
              <TextInput placeholder="Username" style={styles.textInput} />
              <Separator />
              <TextInput placeholder="Password" style={styles.textInput} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('My Account')}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </Modal>
    
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        } }>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
             
              <TextInput placeholder="Username" style={styles.textInput} />
              <Separator />
              <TextInput placeholder="Password" style={styles.textInput} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('Social Media Infos')}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </Modal>
    
    
    <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Login</Text>
      </Pressable>
      <Separator />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible1(true)}>
        <Text style={styles.textStyle}>Create an account</Text>
      </Pressable>
    </View>
  );
}

function DetailsScreen() {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const navigationView = () => (
    <View style={[styles.container2, styles.navigationContainer]}>
      <FlatList
        data={[
          {key: 'Instagram', logo : require ('./assets/logoInstagram.jpg')},
          {key: 'Twitter', logo : require ('./assets/logoTwitter.png')},
          {key: 'Pinterest',logo : require ('./assets/logoPinterest.png')},
          {key: 'Tiktok',logo : require ('./assets/LogoTiktok.png')},
        ]}
        renderItem={({item}) => 
        <View style={styles.itemContainer}>
        <Image source={item.logo} style={styles.logo} />
        <Text style={styles.item}>{item.key}</Text>
      </View>
        }
      />
    </View>
  );
  return (
    <DrawerLayoutAndroid
    ref={drawer}
    drawerWidth={300}
    drawerPosition={drawerPosition}
    renderNavigationView={navigationView}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() =>  drawer.current?.openDrawer()}>
        <Text style={styles.textStyle}> My Applications </Text>
      </Pressable>

    </View>
    </DrawerLayoutAndroid>
  );
}

function SocialMediaDetails({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ margin: 16, fontWeight: 'bold', fontSize: 30 }}> Enter Your infos </Text>
      </View>
      <Separator />
      <StatusBar style="auto" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('You did not login');
          setModalVisible(!modalVisible);
        } }>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput placeholder="Username" style={styles.textInput} />
              <Separator />
              <TextInput placeholder="Password" style={styles.textInput} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </Modal>
    
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        } }>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput placeholder="Username" style={styles.textInput} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible1(!modalVisible1)}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </Modal>
    
    
    <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Instagram</Text>
      </Pressable>
      <Separator />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible1(true)}>
        <Text style={styles.textStyle}>Twitter</Text>
      </Pressable>
      <Separator />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible1(true)}>
        <Text style={styles.textStyle}>Pinterest</Text>
      </Pressable>
      <Separator />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Tiktok</Text>
      </Pressable>
      <Separator />
      <Separator />
      <Pressable
        style={[styles.button, styles.buttonOpen2]}
        onPress={() => navigation.navigate('My Account')}>
        <Text style={styles.textStyle}>Next</Text>
      </Pressable>
    </View>
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
  const screenOptions = {
    headerStyle: {
      backgroundColor: '#5e5c6c', // Set your desired background color here
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="My Account" component={DetailsScreen} />
        <Stack.Screen name="Social Media Infos" component={SocialMediaDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//b0d7ff
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  } ,  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }, Title:{
    fontSize:20,
    marginLeft: 5,
    marginRight : 5,
    height: 50,
    paddingLeft : 5
  },   separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }, titleContainer :{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor : '#white'
  },
  text: {
    color: 'blue',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'grey',
  },centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 20,
    elevation: 20,
  },
  buttonOpen: {
    backgroundColor: '#beb8eb',
  },
  buttonOpen2: {
    backgroundColor: '#8a2be2',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  }, item : {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'left',
  },   itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logo2: {
    width: 300,
    height: 300,
  },

});


