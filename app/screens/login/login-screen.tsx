import React, { useEffect, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, Platform, View, TouchableWithoutFeedback, TextInput, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import SInfo from "react-native-sensitive-info"
import Auth0 from 'react-native-auth0';
import Config from "react-native-config";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { save } from "../../utils/storage"

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const auth0 = new Auth0({ 
  domain: Config.AUTH0_DOMAIN, 
  clientId: Config.AUTH0_CLIENT_ID
});

export const SIOptions = {
  sharedPreferencesName: Config.KEYCHAIN_NAME,
  keychainService: Config.KEYCHAIN_SERVICE,
}

const styles = StyleSheet.create({
  activeBar: {
    backgroundColor: color.darkBlue,
    borderRadius: 3,
    height: 8,
  },
  activeFormName: {
    color: color.palette.black,
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Regular',
    }),
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Regular',
    }),
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    backgroundColor: color.palette.white,
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  formButton: {
    backgroundColor: color.primaryBlue,
    height: 64,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    padding: 14,
  },
  formHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  formName: {
    color: color.gray,
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Regular',
    }),
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  headerText: {
    color: color.palette.black,
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Regular',
    }),
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    backgroundColor: color.inputBg,
    borderColor: color.inputBorder,
    borderRadius: 11,
    borderWidth: 3,
    color: color.palette.black,
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Regular',
    }),
    fontSize: 18,
    fontWeight: '600',
    height: 68,
    paddingLeft: 50,
    paddingRight: 55,
    paddingVertical: 16,
  },
  inputError: {
    borderColor: color.error,
  },
  inputContainer: {
    marginTop: 44,
    position: 'relative',
  },
  inputIcon: {
    height: 35,
    position: 'absolute',
    right: 16,
    top: 16,
    width: 35,
  },
  loader: {
    backgroundColor: color.opaque,
    position: 'absolute',
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  errorText: {
    color: color.error,
    fontSize: 14,
  }
})

export const LoginScreen = observer(function LoginScreen() {
  const [formName, setFormName] = useState('signup')

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const passwordRef = useRef()
  const emailRef = useRef()
  const isSignup = formName === 'signup'
  const fullScreen = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  }

  // Pull in one of our MST stores
  const { userStore } = useStores()
  const { registerUser, loginUser } = userStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const clearFormErrors = () => {
    setUsernameError('')
    setEmailError('')
    setPasswordError('')
    setFormError('')
  }

  const authUser = async () => {
    const authFn = isSignup ? registerUser : loginUser
    if (isSignup && !username.length) {
      return setUsernameError('Enter value for username')
    } else if (!emailRegex.test(email)) {
      return setEmailError('Enter valid email')
    } else if (password.length < 6) {
      return setPasswordError('Enter a minimum of 6 characters')
    }

    clearFormErrors()
    setLoading(true)

    const { response, error } = await authFn({ username, email, password })
    setLoading(false)
    if (error?.data) {
      return setFormError(error?.data[0]?.messages[0]?.message)
    }
    
    SInfo.setItem('accessToken', response.jwt, SIOptions)
    await save('userProfile', response.user)
    
    navigation.navigate('home')
  }

  return (
    <Screen style={styles.container} preset={loading ? 'fixed' : 'scroll'}>
      {loading && (
        <View style={[styles.loader, fullScreen]}>
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      )}
      <Text style={styles.headerText}>{isSignup ? 'Create an Account' : 'Login Account' }</Text>
      <View style={styles.formHeader}>
        <TouchableWithoutFeedback onPress={() => {clearFormErrors(); setFormName('signup')}}>
          <View>
            <Text style={isSignup ? styles.activeFormName : styles.formName}>Sign up</Text>
            <View style={isSignup && styles.activeBar} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback  onPress={() => { clearFormErrors(); setFormName('signin') }}>
          <View>
            <Text style={!isSignup ? styles.activeFormName : styles.formName}>Sign in</Text>
            <View style={!isSignup && styles.activeBar} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {isSignup && (
        <View style={styles.inputContainer}>
          <TextInput 
            style={[styles.input, usernameError && styles.inputError]} 
            placeholder="Username"
            placeholderTextColor={color.placeholder}
            returnKeyType="next"
            autoCapitalize="none"
            onFocus={clearFormErrors}
            onSubmitEditing={() => emailRef?.current?.focus()}
            onChangeText={setUsername} 
            value={username}
          />
          <FontAwesomeIcon name="user-o" color={usernameError ? color.error : color.inputIcon} size={35} style={styles.inputIcon} />
          <Text style={styles.errorText}>{usernameError}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput 
          style={[styles.input, emailError && styles.inputError]} 
          placeholder="Email"
          placeholderTextColor={color.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onFocus={clearFormErrors}
          onSubmitEditing={() => passwordRef?.current?.focus()}
          onChangeText={setEmail} 
          ref={emailRef}
          value={email}
        />
        <FeatherIcon name="mail" color={emailError ? color.error : color.inputIcon} size={35} style={styles.inputIcon} />
        <Text style={styles.errorText}>{emailError}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={[styles.input, (passwordError || formError) && styles.inputError]}
          placeholder="Password"
          placeholderTextColor={color.placeholder}
          secureTextEntry
          autoCapitalize="none"
          returnKeyType="go"
          onFocus={clearFormErrors}
          onChangeText={setPassword}
          ref={passwordRef}
          value={password}
        />
        <FeatherIcon name="eye-off" color={passwordError || formError ? color.error : color.inputIcon} size={35} style={styles.inputIcon} />
        <Text style={styles.errorText}>{passwordError || formError}</Text>
      </View>
    
      <Button onPress={authUser} style={styles.formButton} textStyle={styles.buttonText} text={isSignup ? "Create Account" : "Sign in"} />
    </Screen>
  )
})
