import React from 'react';
import { Divider, Layout, Text } from '@ui-kitten/components';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import VersionNumber from 'react-native-version-number';

const Contacts = () => {
    return <Layout style={styles.container}>
        <ScrollView>
            <Text>
                Вся информация взята с сайта <Text
                    onPress={() => Linking.openURL('https://journal.tinkoff.ru/')}
                    status="info"
                    style={styles.link}
                >journal.tinkoff.ru</Text>
            </Text>

            <Divider style={styles.diver} />

            <Text>
                Приложение <Text
                onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.tinkoffjournal')}
                status="info"
                style={styles.link}
            >«Тинькофф Журнал»</Text> сделал <Text
                onPress={() => Linking.openURL('https://patriotovsky.ru/')}
                status="info"
                style={styles.link}
            >Антон Неверов</Text>
            </Text>

            <Divider style={styles.diver} />

            <Text>Версия: {VersionNumber.appVersion} (сборка {VersionNumber.buildVersion})</Text>
            <Text>
                Это не окончательный вид приложения. Если у вас есть идеи, как сделать его лучше, пишите мне на <Text
                    onPress={() => Linking.openURL('mailto:neverov12@gmail.com')}
                    status="info"
                    style={styles.link}
                >neverov12@gmail.com</Text>
            </Text>

            <Divider style={styles.diver} />

            <Text category="p2" appearance="hint">
                Почта для любых вопросов по журналу — <Text
                    onPress={() => Linking.openURL('mailto:support@tinkoffjournal.ru')}
                    style={styles.link}
                    category="p2"
                    appearance="hint"
                >support@tinkoffjournal.ru</Text>
            </Text>

            <Text category="p2" appearance="hint">
                Телефон «Тинькофф Банка» — <Text
                    onPress={() => Linking.openURL('tel:88005557778')}
                    style={styles.link}
                    category="p2"
                    appearance="hint"
                >8 800 555-77-78</Text>
            </Text>

            <Divider style={styles.diver} />

            <Text category="p2" appearance="hint">
                Юридический адрес «Тинькофф Журнал»: 127287, Москва, ул. Хуторская 2-я, д. 38А, стр. 26
            </Text>
            <Text category="p2" appearance="hint">
                Для почты в редакцию: Москва, ст. м. «Динамо», Ленинградский проспект, д. 36, ст. 10
            </Text>
            <Text category="p2" appearance="hint">
                Головной офис «Тинькофф Журнал»: Москва, ст. м. «Водный стадион», Головинское шоссе, 5А
            </Text>

            <Divider style={styles.diver} />

            <Text category="p2" appearance="hint">
                Это неофициальное приложение. Оно не связано с сайтом «Тинькофф Журнал» или экосистемой «Тинькофф».
            </Text>
            <Text category="p2" appearance="hint">
                «Тинькофф Журнал» и логотипы «Тинькофф Журнал» или «Тинькофф» являются товарными знаками и/или зарегистрированными товарными знаками АО «Тинькофф Банк».
            </Text>
            <Text style={{ marginTop: 10 }} category="c1" appearance="hint">Пожалуйста, не подавайте на меня в суд</Text>
        </ScrollView>
    </Layout>;
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    link: {
        textDecorationLine: 'underline'
    },
    diver: {
        marginVertical: 10
    }
});

export default Contacts;
