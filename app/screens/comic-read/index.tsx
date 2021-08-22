import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import Pdf from 'react-native-pdf';
import Config from "react-native-config";
import { Icon } from "../../components"
import AppTitleBar from '../../components/title-bar';
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import styles from './styles';
import { color } from '../../theme/color'

export const ComicReadScreen = observer(function ComicReadScreen() {
  const pdfRef = useRef(null)
  // TODO: get last page read from api
  let [page, setPage] = useState(1)
  const [, setComicData] = useState({})
  // Pull in one of our MST stores
  const { comicsStore } = useStores()
  const { singleComic } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()
  const _renderAppTitleBar = () => {
    return (
      <AppTitleBar
        contentContainerStyle={{ backgroundColor: color.palette.black }}
        statusBarStyle='auto'
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

  useEffect(() => {
    setComicData(JSON.parse(singleComic))
  }, [singleComic])

  const source = { uri: `${Config.API_URL}/uploads/Rick_and_Morty_Volume_1_8b2fbeed8c.pdf`, cache:true };
  return (
    <View style={styles.main}>
      <View style={{ position: 'absolute', height: '100%' }}>
        {_renderAppTitleBar()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity activeOpacity={1} onPress={() => setPage(++page)}>
              <Pdf
                ref={pdfRef}
                page={page}
                horizontal={true}
                source={source}
                style={styles.pdf}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
})
