import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import Api from '@lib/Api';
import ArticleResponse from '@lib/Api/types/ArticleResponse';
import Card from '@components/Card';
import SplashScreen from 'react-native-splash-screen'

const PAGE_SIZE = 20;

export interface FeedProps {
}

const Feed = (props: FeedProps) => {
    const [items, setItems] = useState<ArticleResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (items.length <= 0) handleLoading().then();
    }, [items]);

    const handleRefresh = useCallback(() => {
        setItems([]);
        setPage(1);
    }, []);
    const handleLoading = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        const i = await Api.getArticles({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE });
        setItems(items => [...items, ...i].filter((v, i, a) => a.indexOf(v) === i));
        setPage(page => page + 1);
        setLoading(false);

        SplashScreen.hide();
    }, [page, loading]);
    const renderItem = useCallback(({ item }) => <Card data={item} />, []);

    return <FlatList
        contentContainerStyle={styles.container}
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoading}
        refreshing={loading}
        bounces={false}
        refreshControl={
            <RefreshControl
                refreshing={loading}
                onRefresh={handleRefresh}
            />
        }
    />
};

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        padding: 10,
    },
    header: {
        backgroundColor: '#FFF',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        padding: 10
    }
});

export default Feed;
