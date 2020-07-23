import React from 'react'
import Screen from './Screen'
import { View, Text } from 'react-native'

export const ListScreen = ({ navigation }) => <Screen navigation={navigation} name="List" />
export const MessageScreen = ({ navigation }) => <Screen navigation={navigation} name="Message" />
export const ActivityScreen = ({ navigation }) => <Screen navigation={navigation} name="Activity" />
export const ProfileScreen = ({ navigation }) => <Screen navigation={navigation} name="Profile" />
export const ReportScreen = ({ navigation }) => <Screen navigation={navigation} name="Report" />
export const StatisticScreen = ({ navigation }) => <Screen navigation={navigation} name="Statistic" />
export const SignOutScreen = ({ navigation }) => <Screen navigation={navigation} name="SignOut" />