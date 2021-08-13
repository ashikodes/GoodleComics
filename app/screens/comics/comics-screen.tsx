import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, FlatList, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { load, remove } from "../../utils/storage";
import AppTitleBar from '../../components/title-bar';
import { Icon } from '../../components';
import styles from "./styles"
import { color } from "../../theme"

export const ComicsScreen = observer(function ComicsScreen() {
  // Pull in one of our MST stores
  const { comicsStore } = useStores()
  const { getComics, comics } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [profile, setUserProfile] = useState<any>({})
  useEffect(() => {
    const loadUser = async () => {
      const user = await load('userProfile')
      if (user) {
        setUserProfile(user)
        getComics()
      } else {
        navigation.navigate('onboard')
      }
    }

    loadUser()
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
        leading={
          profile?.picture && <Image style={styles.headerImage} source={{ uri: profile?.picture }} />
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
    const comicHomeData = [
      {
        cateName: "New from embassy",
        data: comics
      },
      {
        cateName: "New from embassy 2",
        data: comics
      },
      {
        cateName: "New from embassy 3",
        data: comics
      },
      {
        cateName: "Must read for you",
        data: comics
      },
      {
        cateName: "Must read for you 2",
        data: comics
      },
      {
        cateName: "Must read for you 3",
        data: comics
      },
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
        stickyHeaderIndices={[1]}
      >
        {_renderTitleBar()}
        {_renderSearchBar()}
        {_renderComicList()}
      </ScrollView>
    </View>
  )
})
