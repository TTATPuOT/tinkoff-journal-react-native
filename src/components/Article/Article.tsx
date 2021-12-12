import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ArticleContentResponse, { ArticleContentDataNodeResponse } from '@lib/Api/types/ArticleContentResponse';
import Api from '@lib/Api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@t/Navigation';
import getImageFromArticle from '@helpers/getImageFromArticle';
import { StyleSheet, View } from 'react-native';
import LoadingScreen from '@components/LoadingScreen';
import { Text } from '@ui-kitten/components';
import ArticleNode from '@components/ArticleNode';
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import ignoreNodes from '@t/ignoreNodes';

type NavigationProps = NativeStackScreenProps<RootStackParamsList, 'Article'>;

const Article = (props: NavigationProps) => {
    const scrollY = useSharedValue(0);
    const [data, setData] = useState<ArticleContentResponse>();

    const imageUrl = useMemo<string|undefined>(() => {
        if (data) return getImageFromArticle(data);
        return undefined;
    }, [data]);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });
    const imageStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(scrollY.value, [0, 300], [0, 150])
            }]
        }
    });
    const textStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: interpolate(scrollY.value, [0, 300], [1, 0.9])
            }, {
                translateY: interpolate(scrollY.value, [0, 300], [0, 150]),
            }]
        }
    });

    const header = useCallback(() => {
        if (!data) return null;

        return <View>
            <View style={styles.background}>
                {!!imageUrl &&
                <Animated.Image
                    source={{uri: imageUrl}}
                    style={[StyleSheet.absoluteFill, imageStyle]}
                    blurRadius={20}
                />
                }
                <Animated.View style={textStyle}>
                    <Text style={styles.title} category="h2">{data.title}</Text>
                </Animated.View>
            </View>
        </View>;
    }, [imageUrl, data?.title, imageStyle, textStyle]);
    const renderItem = useCallback(({ item }) => {
        if (ignoreNodes.includes(item.kind)) return null;

        return <View style={styles.block}>
            <ArticleNode {...item} />
        </View>
    }, []);

    useEffect(() => {
        Api.getArticle(props.route.params.id)
            .then((data) => {
                const nodes: ArticleContentDataNodeResponse[] = [];
                for (const [index, node] of data.content.nodes.entries()) {
                    if (node.kind === 'cut') {
                        const childs = node.children;
                        if (childs) {
                            nodes.splice(index, 1, ...childs);
                        }
                    } else {
                        nodes.push(node);
                    }
                }

                data.content.nodes = nodes;
                setData(data);
            });
    }, [props.route.params.id]);

    if (!data) return <LoadingScreen />;

    return <Animated.FlatList
        //@ts-ignore
        contentContainerStyle={styles.container}
        data={data.content.nodes}
        ListHeaderComponent={header}
        renderItem={renderItem}
        onScroll={scrollHandler}
    />
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 300,
        backgroundColor: '#FFF'
    },
    block: {
        marginBottom: 20
    },
    background: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        left: -10,
        right: -10,
        top: -310,
        backgroundColor: 'grey',
        overflow: 'hidden'
    },
    title: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 20
    }
});

export default Article;
