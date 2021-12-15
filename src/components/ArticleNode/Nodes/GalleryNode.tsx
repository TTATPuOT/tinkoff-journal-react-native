import React, { useCallback, useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { ArticleContentDataNodeFotorama, ArticleContentDataNodeImage } from '@lib/Api/types/ArticleContentResponse';
import getAllChilds from '@helpers/getAllChilds';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FitImage from '@components/FitImage';
import removeHtml from '@helpers/removeHtml';
import getAllChildsAsString from '@helpers/getAllChildsAsString';

const GalleryNode = (props: ArticleContentDataNodeFotorama) => {
    const { width } = useWindowDimensions();

    const images = useMemo<ArticleContentDataNodeImage[]>(() => {
        const array: ArticleContentDataNodeImage[] = [];
        const items = getAllChilds(props);

        for (const item of items) {
            if (item.kind === 'image' && item.object.files?.original) {
                array.push(item);
            }
        }

        return array;
    }, [props.children]);

    const renderItem = useCallback(({ item }) => {
        let caption: string;

        //@ts-ignore
        if (Array.isArray(item.caption)) caption = item.caption.filter(i => !!i.content).map(i => i.content);
        else caption = removeHtml(item.caption);

        console.log(item.caption);
        console.log(caption);

        return <View style={styles.imageContainer}>
            <View style={styles.image}>
                <Text style={styles.text} category="p2">{caption}</Text>
                <FitImage uri={item.object.files.original.filepath} reducer={60} />
            </View>
        </View>
    }, []);

    return <View style={[styles.container]}>
        <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width - 60}
            layout="default"
        />
    </View>;
};

const styles = StyleSheet.create({
    container: {
        marginLeft: -10,
        marginRight: -10
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative'
    },
    text: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 1,
        padding: 5,
        bottom: 0
    }
});

export default GalleryNode;
