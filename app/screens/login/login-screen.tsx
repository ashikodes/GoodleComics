import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import SInfo from "react-native-sensitive-info"
import Auth0 from 'react-native-auth0';
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

export const SIOptions = {
  sharedPreferencesName: "mySharedPrefs",
  keychainService: "myKeychain",
}

const auth0 = new Auth0({ 
  domain: 'dev-hmrijhi6.eu.auth0.com', //  Config.AUTH0_DOMAIN, 
  clientId: '4zjru1OxTVsq8o7n9fpgbRcYML8eVZMX', // Config.AUTH0_CLIENT_ID
});

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const onSuccess = (credentials, navigation) => {
  auth0.auth
    .userInfo({ token: credentials.accessToken })
    .then(profile => {
      SInfo.setItem('accessToken', credentials.accessToken, SIOptions)
      navigation.navigate('home', { profile })
    });
}

export const LoginScreen = observer(function LoginScreen() {
  const setAccessToken = useState('')[1];
  const navigation = useNavigation()
  useEffect(() => {
    auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .then(credentials => {
      setAccessToken(credentials.accessToken)
      onSuccess(credentials, navigation)
    });
  }, [])
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header"></Text>
    </Screen>
  )
})
