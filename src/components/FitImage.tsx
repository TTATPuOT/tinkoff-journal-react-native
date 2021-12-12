import React, { useEffect, useState } from 'react';
import { Image, useWindowDimensions } from 'react-native';

export interface FitImageProps {
    uri: string
    reducer: number
}

const FitImage = (props: FitImageProps) => {
    const dimensions = useWindowDimensions();

    const [height, setHeight] = useState<number>((dimensions.width - props.reducer) / 16 * 9);
    const [width, setWidth] = useState<number>(dimensions.width - props.reducer);

    useEffect(() => {
        Image.getSize(props.uri, (width, height) => {
            const maxWidth = dimensions.width - props.reducer;
            const maxHeight = maxWidth * 2;

            let ratio = Math.min(maxWidth / width, maxHeight / height);
            setWidth(Math.round(width * ratio * 100) / 100);
            setHeight(Math.round(height * ratio * 100) / 100);
        })
    }, [props.uri, props.reducer, dimensions.width]);

    return <Image
        source={{ uri: props.uri }}
        style={[{ height, width }]}
    />;
};

FitImage.defaultProps = {
    reducer: 0
}

export default FitImage;
