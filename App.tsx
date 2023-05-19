import { StatusBar } from 'expo-status-bar';
import React, { useContext, useRef, useState,useEffect } from 'react';
import { FlatList,Button, Image, StyleSheet, DrawerLayoutAndroid,KeyboardAvoidingView,Platform,TouchableWithoutFeedback, Keyboard, Text, View,Alert, SafeAreaView,Modal,Pressable, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthContext} from './src/context/AuthContext.js';
import { AuthProvider } from './src/context/AuthContext.js';
import axios from 'axios'

import CheckBox from '@react-native-community/checkbox';
import { db } from './src/firebase.js';
import { app } from './src/firebase.js';
//import firestore from '@react-native-firebase/firestore';

//import {firebase } from '@react-native-firebase/database';
import {uid } from 'uid'
import { onValue, ref } from 'firebase/database';

import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';

let globalAccessToken = '';
const Separator = () => <View style={styles.separator} />;
//b0d7ff

function HomeScreen({ navigation }){
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [username, setUsername]=useState('');
  const [password, setPasword]=useState('');
  const [Newusername, setNewUsername]=useState('');
  const [Newpassword, setNewPasword]=useState('');
  const isGlobalBooleanRef = useRef(false);

  const val= useContext(AuthContext);
  const [accessToken, setAccessToken] = useState('');


  /*const handleSignup =() =>{
    firebaseauth
    .createUserWithEmailAndPassword(username,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.username);
    })
    .catch (error => alert(error.message))
  }*/
  //const {register} = useContext(AuthContext);
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
              
              <TextInput 
                style={styles.textInput}
                value={username}
                placeholder="Username" 
                onChangeText={text => setUsername(text)}
                 />
              <Separator />
              <Text>{username}</Text> 
              <Text>{val}</Text>
              <TextInput 
                  placeholder="Password" 
                  style={styles.textInput} 
                  value={password}
                  onChangeText={text => setPasword(text)} 
                  secureTextEntry
                         />
                <Text>{password}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                 
                onPress={ async () => {
                    //if(isGlobalBooleanRef){
                      const formData = new URLSearchParams()
                      formData.append('username', username)
                      formData.append('password', password)

                    const response = await fetch("https://myimage-jhs5i76ama-ew.a.run.app/token/", {
                      method: 'POST',
                      headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                      body: formData.toString()
                    }).then(response => {
                      response.json().then(data => {
                        
                        //console.log(data.access_token)
                        //setAccessToken(data.access_token)
                        //console.log({accessToken})

                        if (response.ok) {
                          globalAccessToken = data.access_token;
                          console.log(globalAccessToken);
                          navigation.navigate('My Account');
                        }
                      })

                      
                    })
                    
                    
                     
                  }
                    //}
                    //</View>else {
                      //<Text>ERROR</Text>
                    //}
                  
                   }>
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
             
              <TextInput 
              placeholder="Username"
              style={styles.textInput}
              value={Newusername}
              onChangeText={text => setNewUsername(text)}
                 />
              <Separator />
              <TextInput 
              placeholder="Password" 
              style={styles.textInput}
              value={Newpassword}
              onChangeText={text => setNewPasword(text)}
              secureTextEntry />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={ async () => {

                  console.log("envoie request")

                
                  console.log(Newusername)
                  console.log(Newpassword)
                   
                    fetch("https://myimage-jhs5i76ama-ew.a.run.app/users/", {
                      method: 'POST',
                      headers: {
                        'content-type': 'application/json',
                      },
                      body: JSON.stringify({
                        username: Newusername,
                        password: Newpassword
                      })
                    })
                    .then(response => {
                      console.log("reception 1")
                      console.log(response.ok)
                      if (response.ok) {

                        const formData = new URLSearchParams()
                        formData.append('username', Newusername)
                        formData.append('password', Newpassword)

                        fetch("https://myimage-jhs5i76ama-ew.a.run.app/token/", {
                        method: 'POST',
                        headers: {
                          'content-type': 'application/x-www-form-urlencoded',
                        },
                        body: formData.toString()
                        }).then(response => {
                          console.log("reception 2")
                          console.log(response.ok)
                          response.json().then(data => {
                            console.log(data.access_token)
                            if (response.ok) {
                              globalAccessToken=data.access_token;
                              navigation.navigate('Social Media Infos') 
                            }
                          })
                          
                          
                        })
                      }
                    })
                }
                 //handleSignup
                 }>
                <Text style={styles.textStyle}>Register</Text>
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
 
  

  

 

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (querySnapshot) => {
      const updatedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages.slice(-7));
    });

    // Cleanup function to unsubscribe from the snapshot listener
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <DrawerLayoutAndroid
    ref={drawer}
    drawerWidth={300}
    drawerPosition={drawerPosition}
    renderNavigationView={navigationView}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         {/* Render the messages */}
      <Text style={styles.alertText}>Alert!</Text>
         {messages.map((message) => (
          <View key={message.id}>
            <Text style={styles.idText}>id : {message.id}</Text>
            <Text style={styles.socialMedia}>Social Media : {message.reseaux  }</Text>
            <Text style={styles.contentText}>Content : {message.content  }</Text>
          </View>
        ))}
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
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [username, setUsername]=useState('');
  const [password, setPasword]=useState('');
  const [username2, setUsername2]=useState('');
  const [username3, setUsername3]=useState('');
  const [username4, setUsername4]=useState('');


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
              <TextInput style={styles.textInput}
                value={username}
                placeholder="Username" 
                onChangeText={text => setUsername(text)}
               />
              <Separator />
              <TextInput style={styles.textInput}
                value={password}
                placeholder="Password" 
                onChangeText={text => setPasword(text)} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                 console.log("Bearer " + globalAccessToken)
                  const response = await fetch("https://myimage-jhs5i76ama-ew.a.run.app/reseaux/", {
                      method: 'POST',
                      headers: {
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + globalAccessToken
                      },
                      body: JSON.stringify({
                        reseaux: "instagram",
                        username: username,
                        hashed_password: password,
                      })
                    })
                  setModalVisible(!modalVisible)
                }
                }>
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
            <TextInput style={styles.textInput}
                value={username2}
                placeholder="Username" 
                onChangeText={text => setUsername2(text)}
               />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  console.log("Bearer " + globalAccessToken)
                   const response = await fetch("https://myimage-jhs5i76ama-ew.a.run.app/reseaux/", {
                       method: 'POST',
                       headers: {
                         'content-type': 'application/json',
                         'Authorization': 'Bearer ' + globalAccessToken
                       },
                       body: JSON.stringify({
                         reseaux: "Twitter",
                         username: username2,
                         hashed_password :"pw",
                       })
                     })
                   setModalVisible1(!modalVisible1)
                 }
                 }>
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
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible2(!modalVisible2);
        } }>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TextInput style={styles.textInput}
                value={username3}
                placeholder="Username" 
                onChangeText={text => setUsername3(text)}
               />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  console.log("Bearer " + globalAccessToken)
                   const response = await fetch("https://myimage-jhs5i76ama-ew.a.run.app/reseaux/", {
                       method: 'POST',
                       headers: {
                         'content-type': 'application/json',
                         'Authorization': 'Bearer ' + globalAccessToken
                       },
                       body: JSON.stringify({
                         reseaux: "Pinterest",
                         username: username3,
                         hashed_password :"",
                       })
                     })
                   setModalVisible2(!modalVisible2)
                 }
                 }>
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
        visible={modalVisible3}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible3(!modalVisible3);
        } }>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TextInput style={styles.textInput}
                value={username4}
                placeholder="Username" 
                onChangeText={text => setUsername4(text)}
               />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  console.log("Bearer " + globalAccessToken)
                   const response = await fetch("https://myimage-jhs5i76ama-ew.a.run.app/reseaux/", {
                       method: 'POST',
                       headers: {
                         'content-type': 'application/json',
                         'Authorization': 'Bearer ' + globalAccessToken
                       },
                       body: JSON.stringify({
                         reseaux: "Tiktok",
                         username: username4,
                         hashed_password :"",
                       })
                     })
                   setModalVisible3(!modalVisible3)
                 }
                 }>
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
        onPress={() => setModalVisible2(true)}>
        <Text style={styles.textStyle}>Pinterest</Text>
      </Pressable>
      <Separator />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible3(true)}>
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
    //<AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="My Account" component={DetailsScreen} />
        <Stack.Screen name="Social Media Infos" component={SocialMediaDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    //</AuthProvider>
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
  idText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'purple',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contentText: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  socialMedia: {
    color: '#3366FF', // Cool blue color
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }, alertText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

});


