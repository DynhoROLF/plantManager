import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from '../pages/Welcome';
import { MyPlants } from '../pages/MyPlants';
import { PlantSave } from '../pages/PlantSave';
import { PlantSelect } from '../pages/PlantSelect';
import { Confirmation } from '../pages/Confirmation';
import { UserIdentification } from '../pages/UserIdentification';

import colors from '../styles/colors';

const stackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: colors.white,
            },
        }}
        
    >
        <stackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen 
            name="UserIdentification"
            component={UserIdentification}
        />

        <stackRoutes.Screen 
            name="Confirmation"
            component={Confirmation}
        />

        <stackRoutes.Screen 
            name="PlantSelect"
            component={PlantSelect}
        />

        <stackRoutes.Screen 
            name="PlantSave"
            component={PlantSave}
        />

        <stackRoutes.Screen 
            name="MyPlants"
            component={MyPlants}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;