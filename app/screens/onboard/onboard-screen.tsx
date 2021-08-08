import React from "react"
import { observer } from "mobx-react-lite"
import { View, ImageBackground, StyleSheet, Platform, Image } from "react-native"
import { Screen, Text, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import SInfo from "react-native-sensitive-info"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { SIOptions } from "../login/login-screen"

const styles = StyleSheet.create({
  arrowIcon: {
    height: 46,
    width: 46,
  },
  button: {
    backgroundColor: color.darkBlue,
    height: 54,
    width: 54,
  },
  container: {
    backgroundColor: color.palette.black,
    flex: 1,
  },
  footer: {
    alignItems: 'flex-end',
    display: 'flex',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  headerCircle: {
    backgroundColor: color.yellow,
    borderRadius: 10,
    height: 20,
    marginRight: 12,
    width: 20,
  },
  headerText: {
    fontFamily: Platform.select({
      ios: 'Inter-Black',
      android: 'Inter-Black',
    }),
    fontSize: 36,
  },
  image: {
    flex: 1,
  },
  opaque: {
    backgroundColor: color.opaque,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 71,
    paddingHorizontal: 42,
    paddingTop: 56,
  },
  text: {
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-SemiBold',
    }),
    fontSize: 38,
    lineHeight: 54,
  }
});

export const OnboardScreen = observer(function OnboardScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  const onProceed = async () => {
    const tokenSaved = await SInfo.getItem('accessToken', SIOptions);
    if (tokenSaved) {
      navigation.navigate('home')
    } else {
      navigation.navigate('login')
    }
  }

  return (
    <Screen style={styles.container} preset="scroll">
      <ImageBackground 
        source={require('../../../assets/images/board-image.png')} 
        resizeMode="stretch"
        resizeMethod="scale"
        style={styles.image}
      >
        <View style={styles.opaque}>
          <View style={styles.header}>
            <View style={styles.headerCircle} />
            <Text style={styles.headerText}>
              Goodle
            </Text>
          </View>
          <Text style={styles.text}>Bring yourself closer to God by reading comics</Text>
          <View style={styles.footer}>
            <Button onPress={onProceed} style={styles.button}>
              <Image style={styles.arrowIcon} source={require('../../../assets/icons/arrow-right.png')} />
            </Button>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  )
})
