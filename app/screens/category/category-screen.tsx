import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, FlatList, ScrollView, TouchableOpacity } from "react-native"
import Config from "react-native-config"
import { Text, ImageWithPlaceholder } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { remove } from "../../utils/storage";
import AppTitleBar from '../../components/title-bar';
import styles from "./styles"
import { color } from "../../theme"

export const CategoryScreen = observer(function CategoryScreen() {
  const [comicData, setComicData] = useState([])
  // Pull in one of our MST stores
  const { comicsStore } = useStores()
  const { getComics, comics, saveSingleComic } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    getComics()
  }, [])

  useEffect(() => {
    setComicData(JSON.parse(comics))
  }, [comics])

  const logout = async () => {
    await remove('userProfile')
    navigation.navigate('onboard')
  }

  const _navigateToComicDetails = (comic) => {
    saveSingleComic(comic)
    navigation.navigate('comic-details', { id: comic.id });
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
        data: comicData
      },
      {
        cateName: "For Kids",
        data: comicData
      }
    ];
    return (
      comicHomeData.map(item => (
        <View 
          key={item.cateName}
          style={styles.comicsSection}
        >
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
                onPress={() => _navigateToComicDetails(comic)}
              >
                <ImageWithPlaceholder style={styles.cardImage} src={{ uri: `${Config.API_URL}${comic?.cover_page?.formats?.medium?.url}` }} />
                <Text style={styles.comicName}>{comic.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      ))
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
