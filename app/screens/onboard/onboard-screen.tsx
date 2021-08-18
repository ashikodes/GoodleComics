import React from "react"
import { observer } from "mobx-react-lite"
import { View, ImageBackground, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Text, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { load } from "../../utils/storage"
import styles from "./styles"

export const OnboardScreen = observer(function OnboardScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  const onProceed = async () => {
    const userProfile = await load('userProfile');
    if (userProfile) {
      navigation.navigate('home')
    } else {
      navigation.navigate('login')
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent style='light' />
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
    </View>
  )
})
