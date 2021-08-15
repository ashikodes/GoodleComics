import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, FlatList, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { load, remove } from "../../utils/storage";
import AppTitleBar from '../../components/title-bar';
import { Icon, ImageWithPlaceholder } from '../../components';
import styles from "./styles"
import { color } from "../../theme"
import Config from "react-native-config"

export const ComicsScreen = observer(function ComicsScreen() {
  // Pull in one of our MST stores
  const { genresStore, comicsStore } = useStores()
  const { getGenres, genres } = genresStore
  const { saveSingleComic } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [profile, setUserProfile] = useState<any>({})

  const loadUser = async () => {
    const user = await load('userProfile')
    if (user) {
      setUserProfile(user)
    } else {
      navigation.navigate('onboard')
    }
  }

  useEffect(() => {
    loadUser();
    getGenres();
  }, [])

  const logout = async () => {
    remove('userProfile')
    navigation.navigate('onboard')
  }

  const _genresDataFiltered = () => {
    const comicGenreArray = JSON.parse(genres).map(genre => genre);
    const comicGenreFiltered = comicGenreArray.filter(genre => genre.comics.length > 0);
    return comicGenreFiltered
  }

  const _renderTitleBar = () => {
    return (
      <AppTitleBar
        statusBarStyle='dark'
        backgroundColor={color.palette.white}
        contentContainerStyle={styles.titleBarStyle}
        leading={
          profile?.picture
            ? <Image style={styles.headerImage} source={{ uri: profile?.picture }} />
            : <Icon icon='ic-default-user' style={styles.headerImage} />
        }
        title={
          <Text style={styles.headerText}>Hi, {profile?.username}</Text>
        }
        trailing={
          <TouchableOpacity onPress={logout}>
            <Image style={styles.listIcon} source={require('../../../assets/images/list-icon.png')} />
          </TouchableOpacity>
        }
      />
    )
  }

  const _renderSearchBar = () => {
    return (
      <View style={styles.searchBarStickyWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchBarWrapper}
        >
          <Text style={styles.searchBarText}>
            Search Goodle
          </Text>
          <Icon icon='search-normal' style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  const _renderComicList = () => {
    return (
      <FlatList
        data={_genresDataFiltered()}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <View style={styles.comicsSection}>
            <Text style={styles.sectionHeader}>
              {item.title}
            </Text>
            <FlatList
              horizontal
              data={item.comics}
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.comicHorizontalItemListContentContainerStyle}
              renderItem={({ item: comic }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={comic.id}
                  style={styles.comicCard}
                  onPress={() => {
                    saveSingleComic(comic)
                    navigation.navigate('comic-details');
                  }}
                >
                  <ImageWithPlaceholder style={styles.cardImage} source={{ uri: `${Config.API_URL}${comic?.cover_page?.formats?.medium?.url}` }} />
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
        stickyHeaderIndices={[1]}
      >
        {_renderTitleBar()}
        {_renderSearchBar()}
        {_renderComicList()}
      </ScrollView>
    </View>
  )
})
