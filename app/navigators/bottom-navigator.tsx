/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ComicsScreen, CategoryScreen, LibraryScreen, SettingsScreen } from "../screens"
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';

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
      initialRouteName="comics"
    >
      <Tab.Screen
        name="comics"
        component={ComicsScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: function Icon({ color, size }) {
            return (
              <AntDesignIcon name="home" color={color} size={size} />
            )} 
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoryScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: function Icon({ color, size }) {
            return (
              <MaterialIcons name="category" color={color} size={size} />
            )
          },

        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: function Icon({ color, size }) {
            return (
              <FeatherIcons name="bookmark" color={color} size={size} />
            )} 
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: function Icon({ color, size }) {
            return (
              <AntDesignIcon name="setting" color={color} size={size} />
            )} 
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
