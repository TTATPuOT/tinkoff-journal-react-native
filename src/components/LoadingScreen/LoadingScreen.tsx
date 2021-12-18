import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '@img/logo.svg';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing, interpolate,
} from 'react-native-reanimated';

const LoadingScreen = () => {
    const size = useSharedValue(0);
    const opacity = useSharedValue(1);

    useEffect(() => {
        size.value = 100;
    }, []);

    const style = useAnimatedStyle(() => {
        return {
            width: withTiming(size.value * 2, {
                duration: 1000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }),
            height: withTiming(size.value, {
                duration: 1000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }),
            borderRadius: withTiming(interpolate(size.value, [0, 100], [100, 0]), {
                duration: 1000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }, () => opacity.value = 0),
            opacity: withTiming(opacity.value, {
                duration: 300,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            })
        }
    });

    return <View style={styles.container}>
        <MaskedView
            maskElement={<Logo width={200} height={100} fill="#000" />}
            style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 100 }}
        >
            <Animated.View style={[styles.box, style]} />
        </MaskedView>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
    },
    box: {
        width: 0,
        height: 0,
        backgroundColor: '#000',
    }
});

export default LoadingScreen;
