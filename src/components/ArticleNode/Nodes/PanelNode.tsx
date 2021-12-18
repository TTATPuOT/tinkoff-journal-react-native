import React, { useMemo } from 'react';
import { ArticleContentDataNodePanel } from '@lib/Api/types/ArticleContentResponse';
import { Text } from '@ui-kitten/components';
import getAllChildsAsString from '@helpers/getAllChildsAsString';
import { StyleSheet, View } from 'react-native';

const PanelNode = (props: ArticleContentDataNodePanel) => {
    const text = useMemo<string>(() => getAllChildsAsString(props.children), [props]);

    return <View style={[styles.container]}>
        <Text>{text}</Text>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: '#f8f8f8',
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});

export default PanelNode;
