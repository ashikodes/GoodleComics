import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, FlatList, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { remove } from "../../utils/storage";
import AppTitleBar from '../../components/title-bar';
import styles from "./styles"
import { color } from "../../theme"

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { comicsStore } = useStores()
  // const { getComics, comics } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  // useEffect(() => {
  //   getComics()
  // }, [])

  const logout = async () => {
    await remove('userProfile')
    navigation.navigate('onboard')
  }

  const _renderTitleBar = () => {
    return (
      <AppTitleBar
        statusBarStyle='dark'
        backgroundColor={color.palette.white}
        contentContainerStyle={styles.titleBarStyle}
        title={
          <View>
            <Text style={styles.headerText}>
              Settings
            </Text>
            <View style={styles.headerTextUnderline} />
          </View>
        }
        trailing={
          <TouchableOpacity onPress={logout}>
            <Image style={styles.listIcon} source={require('../../../assets/images/list-icon.png')} />
          </TouchableOpacity>
        }
      />
    )
  }

  return (
    <View style={styles.main}>
      <ScrollView
        style={styles.scrollViewContentWrapper}
        showsVerticalScrollIndicator={false}
      >
        {_renderTitleBar()}
      </ScrollView>
    </View>
  )
})
