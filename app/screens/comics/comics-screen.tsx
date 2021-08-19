import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, FlatList, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { load, remove } from "../../utils/storage";
import AppTitleBar, { appTitleBarHeight } from '../../components/title-bar';
import { Icon, ImageWithPlaceholder, AppImageBackground } from '../../components';
import styles from "./styles"
import { color } from "../../theme"
import Config from "react-native-config"
import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from "react-native-iphone-x-helper"

export const ComicsScreen = observer(function ComicsScreen() {
  // Pull in one of our MST stores
  const { genresStore, comicsStore } = useStores()
  const { getGenres, genres, loadingGenres } = genresStore
  const { saveSingleComic } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [profile, setUserProfile] = useState<any>({})
  const [filteredComics, setFilteredComics] = useState([])

  const loadUserAndGetGenres = async () => {
    const user = await load('userProfile')
    if (user) {
      setUserProfile(user)
      await getGenres()
    } else {
      navigation.navigate('onboard')
    }
  }

  useEffect(() => {
    loadUserAndGetGenres()
  }, [])

  useEffect(() => {
    const comicGenreArray = JSON.parse(genres).map(genre => genre);
    const comicGenreFiltered = comicGenreArray.filter(genre => genre.comics.length > 0);
    setFilteredComics(comicGenreFiltered)
  }, [genres])

  const logout = async () => {
    remove('userProfile')
    navigation.navigate('onboard')
  }

  const _navigateToComicDetails = (comic) => {
    saveSingleComic(comic)
    navigation.navigate('comic-details', { id: comic.id });
  }

  const _renderTitleBar = () => {
    return (
      <View style={styles.titleBarWrapper}>
        <LinearGradient
          locations={[0, 0.7, 1]}
          colors={[color.palette.white, color.transparentxx, color.transparent]}
        >
          <AppTitleBar
            statusBarStyle='dark'
            backgroundColor={color.transparent}
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
                <Icon icon='search-normal' style={styles.searchIcon} />
              </TouchableOpacity>
            }
          />
        </LinearGradient>
      </View>
    )
  }

  const _renderComicList = () => {
    return (
      filteredComics.map(item => (
        <View key={item.id} style={styles.comicsSection}>
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
                onPress={() => _navigateToComicDetails(comic)}
              >
                <ImageWithPlaceholder style={styles.cardImage} source={{ uri: `${Config.API_URL}${comic?.cover_page?.formats?.medium?.url}` }} />
                <Text style={styles.comicName}>{comic.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      ))
    );
  }

  const _renderBigComic = () => {
    const comicData = filteredComics[0]?.comics[0] ?? {}
    return (
      <View style={{ marginTop: -(appTitleBarHeight + getStatusBarHeight()) }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => _navigateToComicDetails(comicData)}
        >
          <AppImageBackground
            key={`${Config.API_URL}${comicData.cover_page?.formats?.medium?.url}`}
            style={styles.bigComic}
            resizeMode='cover'
            source={{ uri: `${Config.API_URL}${comicData.cover_page?.formats?.medium?.url}` }}
          >
            <LinearGradient
              colors={[color.transparent, color.transparent80, color.palette.white]}
              locations={[0, 0.4, 1]}
              style={styles.bigComicInfoWrapper}
            >
              <Text style={styles.bigComicInfoTitle} numberOfLines={2}>
                {comicData.title}
              </Text>
              <Text style={styles.bigComicInfoDescShort} numberOfLines={1}>
                {comicData.summary}
              </Text>
            </LinearGradient>
          </AppImageBackground>
        </TouchableOpacity>
        <View style={styles.bigComicButtonWrapper}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.bigComicButtonItem}
          >
            <Icon icon='ic-comic-mark' style={styles.bigComicButtonItemIcon} />
            <Text style={styles.bigComicButtonItemText}>
              Bookmark
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.bigComicButtonItem}
          >
            <Icon icon='eye' style={styles.bigComicButtonItemIcon} />
            <Text style={styles.bigComicButtonItemTextRead}>
              Read
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.bigComicButtonItem}
          >
            <Icon icon='ic-preview' style={styles.bigComicButtonItemIcon} />
            <Text style={styles.bigComicButtonItemText}>
              Preview
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.main}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loadingGenres}
            onRefresh={() => getGenres()}
            progressViewOffset={100}
          />
        }
        stickyHeaderIndices={[0]}
      >
        {_renderTitleBar()}
        {_renderBigComic()}
        {_renderComicList()}
      </ScrollView>
    </View>
  )
})
