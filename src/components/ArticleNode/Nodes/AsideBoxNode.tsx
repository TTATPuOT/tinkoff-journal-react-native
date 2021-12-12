import React, { useMemo } from 'react';
import { ArticleContentDataNodeAsideBox } from '@lib/Api/types/ArticleContentResponse';
import ArticleNode from '@components/ArticleNode';

const AsideBox = (props: ArticleContentDataNodeAsideBox) => {
    const items = useMemo<Element[]|undefined>(() => {
        return props.children?.map((i, key) => <ArticleNode key={key} {...i} />);
    }, []);

    if (items) return <>{items}</>;
    return null;
};

export default AsideBox;
