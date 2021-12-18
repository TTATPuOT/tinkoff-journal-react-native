import React, { useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { ArticleContentDataNodeHtml, HtmlElementType } from '@lib/Api/types/ArticleContentResponse';
import getAllChildsAsString from '@helpers/getAllChildsAsString';

const HtmlNode = (props: ArticleContentDataNodeHtml) => {
    const text = useMemo<string>(() => {
        if (props.children) return getAllChildsAsString(props.children);
        return '';
    }, [props.children]);

    if (!props.children || !text) return null;
    return <Text category={HtmlElementType[props.kind]}>{text}</Text>
};

export default HtmlNode;
