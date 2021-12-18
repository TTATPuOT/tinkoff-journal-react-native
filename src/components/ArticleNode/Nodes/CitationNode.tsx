import React, { useMemo } from 'react';
import { ArticleContentDataNodeTableCitation } from '@lib/Api/types/ArticleContentResponse';
import { Text } from '@ui-kitten/components';
import getAllChildsAsString from '@helpers/getAllChildsAsString';

const CitationNode = (props: ArticleContentDataNodeTableCitation) => {
    const text = useMemo<string>(() => getAllChildsAsString(props.children), [props.children]);

    return <Text category="h2">{text}</Text>
};

export default CitationNode;
