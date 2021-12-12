import React, { useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { ArticleContentDataNodeOl } from '@lib/Api/types/ArticleContentResponse';
import getAllChildsAsString from '@helpers/getAllChildsAsString';
import { StyleSheet, View } from 'react-native';

const OlNode = (props: ArticleContentDataNodeOl) => {
    const items = useMemo<JSX.Element[]>(() => {
        const array: JSX.Element[] = [];

        if (props.children) {
            array.push(...props.children.map((c, key) => {
                return <View style={styles.li} key={key}>
                    <View style={styles.dot} />
                    <Text category="p1">{getAllChildsAsString(c)}</Text>
                </View>
            }));
        }

        return array;
    }, [props.children]);


    return <View style={styles.container}>{items}</View>
};

const styles = StyleSheet.create({
    container: {
        marginTop: -5
    },
    li: {
        position: 'relative',
        paddingLeft: 15,
        marginTop: 5,
    },
    dot: {
        position: 'absolute',
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#000',
        top: 8,
    }
});

export default OlNode;
