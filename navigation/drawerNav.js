import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator()

export default function DrawerNavigator(){

    return(
        <Drawer.Navigator>
            <Drawer.Screen
                name = "ClientTabs" 
                component={ClientTabs}
            />
        </Drawer.Navigator>
    )
}