import React, { useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { ArticleContentDataNodeSource } from '@lib/Api/types/ArticleContentResponse';
import { Linking, StyleSheet } from 'react-native';

const SourceNode = (props: ArticleContentDataNodeSource) => {
    const items = useMemo<JSX.Element[]>(() => {
        if (!props.items) return [];
        else return props.items.map((i, index) => {
            return <Text key={index}>Источник: <Text
                onPress={() => Linking.openURL(i.href)}
                status="info"
                style={styles.link}
            >{i.name}</Text></Text>;
        });
    }, [props.items]);

    return <>{items}</>;
};

const styles = StyleSheet.create({
    link: {
        textDecorationLine: 'underline'
    }
});

export default SourceNode;
