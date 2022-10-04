import React, { useState } from 'react';
import { 
    View,
    Text,
    Alert,
    Keyboard,
    Platform,
    TextInput,
    StyleSheet,
    SafeAreaView, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button'
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIdentification(){
    const [ isFocused, setIsFocused] = useState(false);
    const [ isFilled, setIsFilled] = useState(false);
    const [ name, setName] = useState<string>();

    const navigation = useNavigation();

    const loginName = TextInput;

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Me diz como chamar você 😬');

        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Pronto!',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas.',
                buttonTitle: 'Começar',
                icon: 'thumbsUp',
                nextScreen: 'PlantSelect',
            });
                
        }catch {
            return Alert.alert('Não foi possível salvar seu nome. 😓');
        }    
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height' }
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? 
                                    <Feather 
                                        name="user-check" 
                                        style={styles.userIcon}
                                    /> 
                                    :
                                    <Feather
                                        name="user" 
                                        style={styles.userIcon}
                                    /> 
                                    } 
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você
                                </Text>
                            </View>

                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green}
                                ]}
                                placeholder='Digite o Nome'
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footer} >
                                <Button 
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>   
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>    
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    content: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },

    header: {
        alignItems: 'center',
    },

    emoji: {
        fontSize: 44,
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    userIcon: {
        fontSize: 44,
        color: colors.green,
    },

    title: {
        fontSize: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },

    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,
    }
})