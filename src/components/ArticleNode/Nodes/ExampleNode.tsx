import React, { useMemo } from 'react';
import { ArticleContentDataNodeExample } from '@lib/Api/types/ArticleContentResponse';
import getAllChildsAsComponents from '@helpers/getAllChildsAsComponents';
import { StyleSheet, View } from 'react-native';

const ExampleNode = (props: ArticleContentDataNodeExample) => {
    const items = useMemo<Element[]|undefined>(() => {
        return getAllChildsAsComponents(props.children);
    }, [props.children]);

    if (items) return <View style={styles.container}>{items}</View>;
    return null;
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});

export default ExampleNode;
