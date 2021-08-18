/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ComicsScreen, CategoryScreen, LibraryScreen, SettingsScreen } from "../screens"
import { Icon } from '../components'
import { color } from "../theme"
import { getBottomSpace } from "react-native-iphone-x-helper"

const styles = StyleSheet.create({
  tab: {
    height: 75 + getBottomSpace(),
    paddingBottom: getBottomSpace(),
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarLabel: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    lineHeight: 14
  }
})

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type BottomParamList = {
  comics: undefined,
  categories: undefined,
  library: undefined,
  settings: undefined,
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Tab = createBottomTabNavigator<BottomParamList>()

export function BottomNavigator() {
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      initialRouteName="comics"
      screenOptions={{
        tabBarStyle: styles.tab,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: color.palette.appDarkBlue,
        tabBarInactiveTintColor: color.palette.appGray2
      }}
    >
      <Tab.Screen
        name="comics"
        component={ComicsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <Icon icon={focused ? "ic-home-active" : "ic-home"} style={{ width: size, height: size }} />
          )
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Categories',
          tabBarIcon: ({ focused, size }) => (
            <Icon icon={focused ? "ic-categories-active" : "ic-categories"} style={{ width: size, height: size }} />
          )
        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Library',
          tabBarIcon: ({ focused, size }) => (
            <Icon icon={focused ? "ic-library-active" : "ic-library"} style={{ width: size, height: size }} />
          )
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused, size }) => (
            <Icon icon={focused ? "ic-settings-active" : "ic-settings"} style={{ width: size, height: size }} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['comics', 'categories', 'library', 'settings']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
