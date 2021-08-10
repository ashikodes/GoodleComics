import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, Image, Platform, ScrollView, TouchableHighlight } from "react-native"
import axios from 'axios';
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { load, remove } from "../../utils/storage";

// const profile = {
//   "email": "ash1@gmail.com", 
//   "emailVerified": false, 
//   "name": "ash1@gmail.com", 
//   "nickname": "ash1", 
//   "picture": "https://i1.wp.com/cdn.auth0.com/avatars/as.png", 
//   "sub": "auth0|610c42f938a30b006ac819e1", 
//   "updatedAt": "2021-08-07T08:50:40.581Z"
// }

const styles = StyleSheet.create({
  cardImage: {
    borderRadius: 8,
    height: 184,
    width: 150,
  },
  comicCard: {
    marginRight: 15,
    width: 150,
  },
  comicName: {
    color: color.palette.black,
    fontSize: 18,
    marginTop: 5,
    paddingRight: 10,
  },
  comicsSection: {
    backgroundColor: color.palette.white,
    paddingTop: 50,
  },
  container: {
    paddingBottom: 100,
    paddingLeft: 44,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 44,
    paddingTop: 60,
  },
  headerImage: {
    borderRadius: 20,
    height: 40,
    marginRight: 20,
    width: 40,
  },
  headerProfile: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    color: color.palette.black,
    fontFamily: Platform.select({
      ios: 'Poppins-SemiBold',
      android: 'Poppins-SemiBold',
    }),
    fontSize: 24,
  },
  listIcon: {
    height: 14,
    width: 20,
  },
  sectionHeader: {
    color: color.lightGray,
    fontSize: 18,
    marginBottom: 22,
  },
  sectionSlide: {
    // backgroundColor: color.transparent,
  }
})

export const ComicsScreen = observer(function ComicsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [ comics, setComics ] = useState([])
  const [profile, setUserProfile] = useState<any>({})
  useEffect(() => {
    const fetchComics = async () => {
      const response = await axios.get('https://codecamp.exchangepointgroup.com/comics')
      setComics(response.data)
    }
    const loadUser = async () => {
      const user = await load('userProfile')
      if (user) {
        setUserProfile(user)
        fetchComics()
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

  return (
    <Screen style={styles.container} preset="scroll">
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <Image style={styles.headerImage} source={{ uri: profile?.picture}} />
          <Text style={styles.headerText}>Hi {profile?.username}</Text>
        </View>
        <TouchableHighlight onPress={logout}>
          <Image style={styles.listIcon} source={require('../../../assets/images/list-icon.png')} />
        </TouchableHighlight>
      </View>

      <View style={styles.comicsSection}>
        <Text style={styles.sectionHeader}>New from embassy</Text>
        <ScrollView horizontal style={styles.sectionSlide}>
          {comics.map(comic => (
            <View key={comic.id} style={styles.comicCard}>
              <Image style={styles.cardImage} source={{ uri: `https://codecamp.exchangepointgroup.com${comic?.page_images[0]?.formats?.thumbnail?.url}` }} />
              <Text style={styles.comicName}>{comic.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.comicsSection}>
        <Text style={styles.sectionHeader}>Must read for you</Text>
        <ScrollView horizontal style={styles.sectionSlide}>
          {comics.map(comic => (
            <View key={comic.id} style={styles.comicCard}>
              <Image style={styles.cardImage} source={{ uri: `https://codecamp.exchangepointgroup.com${comic?.page_images[0]?.formats?.thumbnail?.url}` }} />
              <Text style={styles.comicName}>{comic.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  )
})
