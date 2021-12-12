import React from 'react';
import { Avatar, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { ArticleContentDataNodeCommunityAuthor } from '@lib/Api/types/ArticleContentResponse';

const CommunityAuthor = (props: ArticleContentDataNodeCommunityAuthor) => {
    return <View style={styles.container}>
        {!!props.image.files?.original &&
            <Avatar source={{ uri: props.image.files.original.filepath }} />
        }
        <View style={styles.text}>
            <Text category="s2">{props.name}</Text>
            <Text appearance="hint" category="c1">{props.description}</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        flex: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
})

export default CommunityAuthor;
