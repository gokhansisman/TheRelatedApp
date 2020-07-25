import React from 'react'
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import Header from "./Header"
import TemplatePage from "./TemplatePage";

function WhatsNew() {
	return <TemplatePage tabName="WhatsNew" />
}
function Women() {
	return <TemplatePage tabName="Women" />
}
function Man() {
	return <TemplatePage tabName="Man" />
}
function Tops() {
	return <TemplatePage tabName="Tops" />
}

const TabNavigator = createMaterialTopTabNavigator(
	{
		WhatsNew: {
			screen: WhatsNew
		},
		Women: {
			screen: Women
		},
		Man: {
			screen: Man
		},
		Tops: {
			screen: Tops
		}
	},
	{
		tabBarComponent: Header,
		tabBarOptions: {
			activeTintColor: "#1BA1F3",
			inactiveTintColor: "#000"
		},
		initialRouteName: "WhatsNew"
	}
);

const TabScreen = createAppContainer(TabNavigator);

export default TabScreen;