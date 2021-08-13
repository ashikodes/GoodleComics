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

export const CategoryScreen = observer(function CategoryScreen() {
  // Pull in one of our MST stores
  const { comicsStore } = useStores()
  const { getComics, comics } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    getComics()
  }, [])

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
              Categories
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

  const _renderComicList = () => {
    const comicHomeData = [
      {
        cateName: "For young adults",
        data: comics
      },
      {
        cateName: "For Kids",
        data: comics
      }
    ];
    return (
      <FlatList
        data={comicHomeData}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <View style={styles.comicsSection}>
            <Text style={styles.sectionHeader}>
              {item.cateName}
            </Text>
            <FlatList
              horizontal
              data={item.data}
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.comicHorizontalItemListContentContainerStyle}
              renderItem={({ item: comic }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={comic.id}
                  style={styles.comicCard}
                >
                  <Image style={styles.cardImage} source={{ uri: comic?.imageThumbnail }} />
                  <Text style={styles.comicName}>{comic.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
        keyExtractor={(item, index) => item.cateName + index}
      />
    );
  }

  return (
    <View style={styles.main}>
      <ScrollView
        style={styles.scrollViewContentWrapper}
        showsVerticalScrollIndicator={false}
      >
        {_renderTitleBar()}
        {_renderComicList()}
      </ScrollView>
    </View>
  )
})
