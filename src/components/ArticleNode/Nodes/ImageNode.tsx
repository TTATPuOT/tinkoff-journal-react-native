import React, { useMemo } from 'react';
import { ArticleContentDataNodeImage } from '@lib/Api/types/ArticleContentResponse';
import FitImage from '@components/FitImage';
import DescriptionNode from '@components/ArticleNode/Nodes/DescriptionNode';
import removeHtml from '@helpers/removeHtml';
import getAllChildsAsString from '@helpers/getAllChildsAsString';

const ImageNode = (props: ArticleContentDataNodeImage) => {
    const caption = useMemo<string>(() => {
        const caption = typeof props.caption === 'string'
            ? props.caption
            //@ts-ignore
            : getAllChildsAsString(props.caption);

        return removeHtml(caption);
    }, [props.caption]);

    if (props.object.files) {
        return <DescriptionNode text={caption}>
            <FitImage uri={props.object.files.original.filepath} />
        </DescriptionNode>
    }

    return null;
};

export default ImageNode;
