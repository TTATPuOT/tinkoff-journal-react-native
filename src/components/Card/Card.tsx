import React, { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ArticleResponse from '@lib/Api/types/ArticleResponse';
import { Text } from '@ui-kitten/components';
import moment from 'moment';
import { useLinkProps } from '@react-navigation/native';
import getImageFromArticle from '@helpers/getImageFromArticle';

export interface CardProps {
    data: ArticleResponse
}

const Card = (props: CardProps) => {
    const { data } = props;

    const { onPress } = useLinkProps({ to: { screen: 'Article', params: { id: data.id, slug: data.slug } } });

    const image = useMemo<string|undefined>(() => getImageFromArticle(data), [data.cover]);
    const flow = useMemo<React.ReactNode>(() => {
        if (data.flows.length)
            return <Text category="c2" appearance="hint">{data.flows[0].name}</Text>;
        else
            return null;
    }, [data.flows]);
    const time = useMemo<React.ReactNode>(() => {
        return <Text category="c2" appearance="hint">{moment(data.date_published).locale('ru').calendar()}</Text>;
    }, [data.date_published]);

    return <TouchableOpacity style={styles.container} onPress={onPress} delayPressIn={50}>
        {!!image && <Image source={{uri: image}} style={styles.image} />}
        <View style={styles.text}>
            <View style={styles.header}>{flow}{time}</View>
            <Text category="h5">{data.title}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#FFF',
        marginBottom: 20
    },
    image: {
        height: 200,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    text: {
        padding: 10
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export default Card;
