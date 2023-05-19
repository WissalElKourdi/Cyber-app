import React, {createContext} from 'react';
import axios from 'axios'
import {BASE_URL} from '../config.js'
export const AuthContext = createContext();

export const AuthProvider =({children}) => {

   
    return (
 <AuthContext.Provider value= "test value"> {children}</AuthContext.Provider>
    );
}

 //const register =(username,password) =>{
      //  axios.post ('${BASE_URL}/register', {
       //     username,
         //   password,
        //})
        //.then(res => {
          //  let userInfo = res.data;
            //console.log(userInfo);
        //})
        //.catch(e=> {
          //  console.log('register error ${e}');
        //})
    //} ;