import React, { useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import AppTitleBar from '../../components/title-bar';
import { Icon } from '../../components';
import { Text } from "../../components"
import { useStores } from "../../models"
import styles from "./styles"
import StarRating from 'react-native-star-rating';

export const ComicDetailsScreen = observer(function ComicDetailsScreen() {
  const [isPurchased, setIsPurchased] = useState(false)
  const [isMarked, setIsMarked] = useState(false)

  // Pull in one of our MST stores
  const { userStore } = useStores()
  const { registerUser, loginUser } = userStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const _renderAppTitleBar = () => {
    return (
      <AppTitleBar
        backgroundColor='transparent'
        leading={
          <TouchableOpacity>
            <Icon icon='ic-back' style={styles.backIcon} />
          </TouchableOpacity>
        }
      />
    );
  }

  const _renderComicImage = () => {
    return (
      <View style={{ marginTop: 15 }}>
        <View style={styles.comicImageWrapper}>
          <Image
            resizeMode='cover'
            style={styles.comicImage}
            source={{ uri: 'https://vnn-imgs-f.vgcloud.vn/2020/12/18/15/doraemon.jpg' }}
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
            Doraemon
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
          $69
        </Text>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus aliquet facilisis vulputate non in quam. Pretium aenean elementum volutpat turpis ut ullamcorper diam ultrices. Sodales accumsan nibh elit enim, quis potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus aliquet facilisis vulputate non in quam. Pretium aenean elementum volutpat turpis ut ullamcorper diam ultrices. Sodales accumsan nibh elit enim, quis potenti.
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
        <Image
          resizeMode='cover'
          style={styles.background}
          blurRadius={10}
          source={{ uri: 'https://vnn-imgs-f.vgcloud.vn/2020/12/18/15/doraemon.jpg' }}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {_renderComicImage()}
          {_renderComicTitleRatingAndPrice()}
          {_renderComicDescription()}
        </ScrollView>
        {_renderBottomBtns()}
      </View>
    </View>
  )
})
