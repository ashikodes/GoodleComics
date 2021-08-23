import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, FlatList, TouchableOpacity } from "react-native"
import { Text, ImageWithPlaceholder } from "../../../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../../../models"
import styles from "./styles"
import StarRating from 'react-native-star-rating';
import { load } from "../../../../utils/storage";
import { color } from "../../../../theme"

const BookmarkedTab = observer(() => {
  // Pull in one of our MST stores
  const { libraryStore } = useStores()
  const { bookmarks, loadingBookmarks, getBookmarks } = libraryStore

  const _getBookmarkFromStore = () => JSON.parse(bookmarks)

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [userData, setUserData] = useState({});

  const loadUserAndBookmarks = async () => {
    const user = await load('userProfile')
    if (user) {
      getBookmarks(user.id);
      setUserData(user)
    } else {
      navigation.navigate('onboard')
    }
  }

  useEffect(() => {
    loadUserAndBookmarks()
  }, [])

  return (
    <View style={styles.main}>
      <FlatList
        data={_getBookmarkFromStore()}
        refreshing={loadingBookmarks}
        contentContainerStyle={{ paddingVertical: 20 }}
        onRefresh={() => getBookmarks(userData.id ?? "")}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.listItemWrapper}
            onPress={() => navigation.navigate('comic-details', { id: item.comic.id })}
          >
            <ImageWithPlaceholder
              style={styles.listItemImage}
            />
            <View style={styles.listItemTitleZone}>
              <Text numberOfLines={1} style={styles.itemTitle}>
                {item.comic.title}
              </Text>
              <Text numberOfLines={1} style={styles.itemDesc}>
                {item.comic.summary}
              </Text>
            </View>
            <StarRating
              disabled
              maxStars={3}
              rating={2.5}
              starSize={13}
              emptyStarColor={color.palette.appYellowStar}
              fullStarColor={color.palette.appYellowStar}
              halfStarColor={color.palette.appYellowStar}
              containerStyle={{ alignSelf: 'flex-end', marginVertical: 3 }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
})

export default BookmarkedTab;