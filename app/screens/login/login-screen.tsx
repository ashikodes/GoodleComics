import React, { useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useNavigation } from "@react-navigation/native"
import SInfo from "react-native-sensitive-info"
import Config from "react-native-config";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'
import styles from "./styles"
import { Button, Text, LoadingOverlay } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import { save } from "../../utils/storage"

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const SIOptions = {
  sharedPreferencesName: Config.KEYCHAIN_NAME,
  keychainService: Config.KEYCHAIN_SERVICE,
}

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
    <View style={{ flex: 1, backgroundColor: color.palette.white }}>
      <StatusBar translucent style='dark' />
      <LoadingOverlay show={loading} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ flex: 1 }}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.headerText}>{isSignup ? 'Create an Account' : 'Login Account'}</Text>
            <View style={styles.formHeader}>
              <TouchableWithoutFeedback onPress={() => { clearFormErrors(); setFormName('signup') }}>
                <View>
                  <Text style={isSignup ? styles.activeFormName : styles.formName}>Sign up</Text>
                  <View style={isSignup && styles.activeBar} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { clearFormErrors(); setFormName('signin') }}>
                <View>
                  <Text style={!isSignup ? styles.activeFormName : styles.formName}>Sign in</Text>
                  <View style={!isSignup && styles.activeBar} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            {isSignup && (
              <View style={styles.inputContainer}>
                <View style={[styles.input, usernameError && styles.inputError]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor={color.placeholder}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onFocus={clearFormErrors}
                    onSubmitEditing={() => emailRef?.current?.focus()}
                    onChangeText={setUsername}
                    value={username}
                  />
                  <FontAwesomeIcon name="user-o" color={usernameError ? color.error : color.inputIcon} size={30} style={styles.inputIcon} />
                </View>
                <Text style={styles.errorText}>{usernameError}</Text>
              </View>
            )}
            <View style={styles.inputContainer}>
              <View style={[styles.input, emailError && styles.inputError]}>
                <TextInput
                  style={styles.textInput}
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
                <FeatherIcon name="mail" color={emailError ? color.error : color.inputIcon} size={30} style={styles.inputIcon} />
              </View>
              <Text style={styles.errorText}>{emailError}</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={[styles.input, (passwordError || formError) && styles.inputError]}>
                <TextInput
                  style={styles.textInput}
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
                <FeatherIcon name="eye" color={passwordError || formError ? color.error : color.inputIcon} size={30} style={styles.inputIcon} />
              </View>
              <Text style={styles.errorText}>{passwordError || formError}</Text>
            </View>
            <Button onPress={authUser} style={styles.formButton} textStyle={styles.buttonText} text={isSignup ? "Create Account" : "Sign in"} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
})
