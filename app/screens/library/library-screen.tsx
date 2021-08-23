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
import { Tabs } from '@ant-design/react-native';

import BookmarkedTab from "./components/bookmarked-tab";

export const LibraryScreen = observer(function LibraryScreen() {
  // Pull in one of our MST stores
  // const { comicsStore } = useStores()
  // const { getComics, comics } = comicsStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  // useEffect(() => {
  //   getComics()
  // }, [])

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
              My Libraries
            </Text>
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

  const _renderTabBarForTabView = (tabProps) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30
      }}>
        {
          tabProps.tabs.map((tab, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index.toString()}
              onPress={() => {
                const { goToTab, onTabClick } = tabProps;
                onTabClick && onTabClick(tabProps.tabs[index], index);
                goToTab && goToTab(index);
              }}
            >
              <Text style={styles.tabBarTitle}>
                {tab.title}
              </Text>
              <View
                style={[styles.tabBarIndicator, {
                  backgroundColor: tabProps.activeTab === index
                    ? color.palette.appVeryLightBlue
                    : color.transparent
                }]}
              />
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }

  const _renderTabsView = () => {
    const tabs = [
      { title: "Books" },
      { title: "Bookmarked" },
    ];

    return (
      <Tabs
        tabs={tabs}
        renderTabBar={_renderTabBarForTabView}
        styles={{
          topTabBarSplitLine: { borderBottomWidth: 0 }
        }}
      >
        <View></View>
        <BookmarkedTab />
      </Tabs>
    );
  }

  return (
    <View style={styles.main}>
      {_renderTitleBar()}
      {_renderTabsView()}
    </View>
  )
})
