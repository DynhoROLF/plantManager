import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../components/Button';
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'thumbsUp' | 'droplet',
    nextScreen: string;
}

const emojis ={
    droplet: (<Feather name="droplet" style={{fontSize: 44, color: colors.green}}/> ),
    thumbsUp: (<Feather name="thumbs-up" style={{fontSize: 44, color: colors.green}}/> ),
}

export function Confirmation(){
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params
    
    function handleConfirmation(){
        navigation.navigate(nextScreen)
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}  
                </Text>
                <Text style={styles.title}>
                  {title}  
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button 
                        title="Começar"
                        onPress={handleConfirmation}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },

    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },

    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
    },

    emoji: {
        fontSize: 44,
    },

    footer: {
        width: '100%',
        paddingHorizontal: 50,
    }
})

