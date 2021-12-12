import React, { useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { ArticleContentDataNodeTableHeading } from '@lib/Api/types/ArticleContentResponse';
import getAllChildsAsString from '@helpers/getAllChildsAsString';
import { StyleSheet } from 'react-native';

const TableHeadingNode = (props: ArticleContentDataNodeTableHeading) => {
    const text = useMemo<string>(() => getAllChildsAsString(props), [props.children]);

    return <Text category="h5" style={styles.text}>{text}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'normal'
    }
})

export default TableHeadingNode;
