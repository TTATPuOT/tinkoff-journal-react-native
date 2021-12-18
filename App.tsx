import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import Feed from '@components/Feed';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Icon, IconRegistry, Text } from '@ui-kitten/components';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import 'moment/locale/ru';
import Article from '@components/Article';
import Contacts from '@components/Contacts';
import { RootStackParamsList } from '@t/Navigation';
import { Share } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderTitleProps } from '@react-navigation/elements/src/types';
import Logo from '@img/logo.svg';
import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types';

const linking: LinkingOptions<RootStackParamsList> = {
    prefixes: ['http://journal.tinkoff.ru', 'https://journal.tinkoff.ru', 'tinkoffjournal://'],
    config: {
        screens: {
            Home: '',
            Article: 'news/:id'
        }
    }
};

const Drawer = createDrawerNavigator<RootStackParamsList>();

const App = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer linking={linking}>
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShadowVisible: false,
                        headerTitleStyle: { fontSize: 16 },
                        headerLeft: headerLeft,
                        headerRight: headerRight,
                        headerTitle: headerTitle
                    }}
                >
                    <Drawer.Screen name="Home" component={Feed} options={{ title: 'Лента' }} />
                    <Drawer.Screen name="Article" component={Article} options={{
                        title: '',
                        drawerItemStyle: { height: 0 }
                    }} />
                    <Drawer.Screen name="Contacts" component={Contacts} options={{ title: 'Контакты' }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    </>;
};

function headerTitle(props: HeaderTitleProps) {
    const route = useRoute();

    if (route.name === "Home") {
        return <Logo width={200} height={35} fill="#000" />
    }

    return <Text>{props.children}</Text>
}

function headerLeft() {
    const navigation = useNavigation();

    if (navigation.canGoBack()) {
        return <Icon
            name="arrow-back-outline"
            fill="#000"
            style={{marginLeft: 15, width: 25, height: 25}}
            onPress={() => navigation.goBack()}
        />;
    } else {
        return <Icon
            name="menu-outline"
            fill="#000"
            style={{marginLeft: 15, width: 25, height: 25}}
            //@ts-ignore
            onPress={() => navigation.openDrawer()}
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
                title: route.params.title,
                //@ts-ignore
                message: `${route.params.title}: https://journal.tinkoff.ru/${route.params.slug}`,
            }, {
                dialogTitle: 'Поделиться статьёй'
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
