import React from 'react';
import { ArticleContentDataNodeResponse } from '@lib/Api/types/ArticleContentResponse';
import { Text } from '@ui-kitten/components';
import formatTextContent from '@helpers/formatTextContent';
import { Linking, StyleSheet } from 'react-native';
import getAllChildsAsString from '@helpers/getAllChildsAsString';

const getAllChildsAsComponents = (items: ArticleContentDataNodeResponse[]|undefined = undefined): JSX.Element[] => {
    const array: JSX.Element[] = [];

    if (items) {
        for (const child of items) {
            if (child.kind === 'text') {
                if (!!child.content) array.push(<Text>{formatTextContent(child.content)}</Text>);
            } else if (child.kind === 'br') {
                array.push(<Text>\n</Text>);
            }

            if (child.kind === 'a' && child.href) {
                const text = getAllChildsAsString(child.children);

                if (text) array.push(<Text
                    onPress={() => {
                        if (child.href.indexOf('/') === 0) {
                            return Linking.openURL('https://journal.tinkoff.ru' + child.href);
                        } else {
                            return Linking.openURL(child.href);
                        }
                    }}
                    style={styles.link}
                    status="info"
                >{text}</Text>);
            } else if (child.children) {
                const childs = getAllChildsAsComponents(child.children);
                if (childs.length > 0) array.push(...childs);
            }
        }
    }

    return array;
}

const styles = StyleSheet.create({
    link: {
        textDecorationLine: 'underline'
    }
});

export default getAllChildsAsComponents;
