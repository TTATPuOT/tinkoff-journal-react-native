import React, { useMemo } from 'react';
import { ArticleContentDataNodeVideo } from '@lib/Api/types/ArticleContentResponse';
import YoutubePlayer from "react-native-youtube-iframe";
import { useWindowDimensions } from 'react-native';
import DescriptionNode from '@components/ArticleNode/Nodes/DescriptionNode';

const VideoNode = (props: ArticleContentDataNodeVideo) => {
    const { width } = useWindowDimensions();

    const style = useMemo<{ width: number, height: number }>(() => {
        return { height: width * 0.5625, width: width };
    }, [width]);

    return <DescriptionNode text={props.caption}>
        <YoutubePlayer
            videoId={props.video_id}
            height={style.height}
            width={style.width}
        />
    </DescriptionNode>;
};

export default VideoNode;
