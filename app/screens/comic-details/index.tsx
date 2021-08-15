import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import AppTitleBar from '../../components/title-bar';
import { Icon, ImageWithPlaceholder, Text } from '../../components';
import { useStores } from "../../models"
import styles from "./styles"
import StarRating from 'react-native-star-rating';
import Config from "react-native-config"
import { color } from "../../theme";

export const ComicDetailsScreen = observer(function ComicDetailsScreen(props) {
  const [isPurchased, setIsPurchased] = useState(false)
  const [isMarked, setIsMarked] = useState(false)

  // Pull in one of our MST stores
  const { comicsStore } = useStores()
  const { singleComic, getSingleComic, loadingSingleComics } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const _getSingleComicData = () => {
    return JSON.parse(singleComic)
  }

  useEffect(() => {
    _loadSingleComic()
  }, [])

  const _loadSingleComic = () => {
    const comicRawData = _getSingleComicData();
    getSingleComic(comicRawData.id)
  } 

  const _renderAppTitleBar = () => {
    return (
      <AppTitleBar
        backgroundColor='transparent'
        leading={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Icon icon='ic-arrow-back' style={styles.backIcon} />
          </TouchableOpacity>
        }
      />
    );
  }

  const _renderComicImage = () => {
    return (
      <View style={{ marginTop: 15 }}>
        <View style={styles.comicImageWrapper}>
          <ImageWithPlaceholder
            resizeMode='cover'
            style={styles.comicImage}
            source={{ uri: `${Config.API_URL}${_getSingleComicData()?.cover_page?.formats?.large?.url}` }}
          />
        </View>
      </View>
    )
  }

  const _renderComicTitleRatingAndPrice = () => {
    return (
      <View style={styles.comicTitleRatingAndPriceWrapper}>
        <View style={{ flex: 1 }}>
          <Text style={styles.comicTitle}>
            {_getSingleComicData().title}
          </Text>
          <StarRating
            disabled
            maxStars={3}
            rating={2.5}
            starSize={20}
            emptyStarColor='#ffc30b'
            fullStarColor='#ffc30b'
            halfStarColor='#ffc30b'
            containerStyle={{ alignSelf: 'center', marginVertical: 3 }}
          />
        </View>
        <Text style={styles.comicPrice}>
          {_getSingleComicData().price ? `$${_getSingleComicData().price}` : "Free"}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.previewBtn}
        >
          <Icon icon='ic-preview' style={styles.previewIcon} />
          <Text style={styles.previewTextBtn}>
            Preview
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const _renderComicDescription = () => {
    return (
      <View style={styles.comicDescriptionWrapper}>
        <Text style={styles.comicDescriptionTitle}>
          Description
        </Text>
        <Text style={styles.comicDescription}>
          {_getSingleComicData().summary}
        </Text>
      </View>
    );
  }

  const _renderBottomBtns = () => {
    return (
      <View style={styles.bottomBtnsWrapper}>
        <TouchableOpacity
          style={styles.purchaseReadBtn}
          onPress={() => setIsPurchased(!isPurchased)}
          activeOpacity={0.8}
        >
          <Text style={styles.purchaseReadBtnText}>
            {isPurchased ? "Read Now" : "Purchase"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsMarked(!isMarked)}
          activeOpacity={0.8}
        >
          <Icon icon='ic-comic-mark' style={isMarked ? styles.comicMarkIconMarked : styles.comicMarkIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  const _renderBackground = () => {
    return (
      <View>
        <ImageWithPlaceholder
          resizeMode='cover'
          style={styles.background}
          blurRadius={10}
          source={{ uri: `${Config.API_URL}${_getSingleComicData()?.cover_page?.formats?.thumbnail?.url}` }}
        />
        <View style={styles.backgroundDarkOverlay} />
      </View>
    )
  }

  return (
    <View style={styles.main}>
      {_renderBackground()}
      <View style={{ position: 'absolute', height: '100%' }}>
        {_renderAppTitleBar()}
        <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loadingSingleComics}
            onRefresh={() => _loadSingleComic()}
            tintColor={color.palette.white}
          />
        }
        >
          <View>
            {_renderComicImage()}
            {_renderComicTitleRatingAndPrice()}
            {_renderComicDescription()}
          </View>
        </ScrollView>
        {_renderBottomBtns()}
      </View>
    </View>
  )
})
