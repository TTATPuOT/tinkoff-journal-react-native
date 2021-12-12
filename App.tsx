import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import Feed from '@components/Feed';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Icon, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import 'moment/locale/ru';
import Article from '@components/Article';
import { RootStackParamsList } from '@t/Navigation';
import { Share } from 'react-native';

const Drawer = createStackNavigator<RootStackParamsList>();

const App = () => {
    return <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShadowVisible: false,
                        headerTitleStyle: {
                            fontSize: 16
                        },
                        headerLeft: headerLeft,
                        headerRight: headerRight,
                        transitionSpec: {
                            open: TransitionSpecs.FadeInFromBottomAndroidSpec,
                            close: TransitionSpecs.FadeOutToBottomAndroidSpec,
                        },
                    }}
                >
                    <Drawer.Screen name="Home" component={Feed} options={{ title: 'Последние статьи' }} />
                    <Drawer.Screen name="Article" component={Article} options={{ title: 'Статья' }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    </>;
};

function headerLeft() {
    const navigation = useNavigation();

    if (navigation.canGoBack()) {
        return <Icon
            name="arrow-back-outline"
            fill="#000"
            style={{marginLeft: 15, width: 25, height: 25}}
            onPress={() => navigation.goBack()}
        />;
    }
}

function headerRight() {
    const route = useRoute();

    const handleShare = useCallback(() => {
        //@ts-ignore
        if (route.params.slug) {
            //@ts-ignore
            Share.share({
                //@ts-ignore
                url: `https://journal.tinkoff.ru/${route.params.slug}`,
                //@ts-ignore
                title: `https://journal.tinkoff.ru/${route.params.slug}`,
                //@ts-ignore
                message: `https://journal.tinkoff.ru/${route.params.slug}`,
            });
        }
    }, [route.params]);

    if (route.name === "Article") {
        return <Icon
            name="share-outline"
            fill="#000"
            style={{marginRight: 15, width: 25, height: 25}}
            onPress={handleShare}
        />;
    }
}

export default App;
