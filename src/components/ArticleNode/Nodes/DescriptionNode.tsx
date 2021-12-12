import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

export interface DescriptionNodeProps {
    children: React.ReactElement
    text: string
}

const DescriptionNode = (props: DescriptionNodeProps) => {
    return <>
        <View style={styles.container}>{props.children}</View>
        <Text style={styles.caption}>{props.text}</Text>
    </>
};

const styles = StyleSheet.create({
    container: {
        marginLeft: -10,
        marginRight: -10,
        position: 'relative'
    },
    caption: {
        opacity: 0.75,
        marginTop: 5
    }
});

export default DescriptionNode;
