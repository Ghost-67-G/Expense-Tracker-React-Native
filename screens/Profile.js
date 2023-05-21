import React from 'react'
import { SafeAreaView, Platform, StatusBar, Text, Button } from "react-native";
import { useDispatch } from 'react-redux';


const Profile = () => {
  const dispatch = useDispatch()
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Button title='Log out' onPress={()=>{
        dispatch({type:"LOG_OUT"})
      }}/>
        <Text>Hello</Text>
    </SafeAreaView>
  )
}

export default Profile