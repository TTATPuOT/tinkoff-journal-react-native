import React from 'react';
import { Text } from '@ui-kitten/components';
import {
    ArticleContentDataNodeHtml,
    ArticleContentDataNodeResponse,
    HtmlElementType
} from '@lib/Api/types/ArticleContentResponse';
import HtmlNode from './Nodes/HtmlNode';
import ImageNode from '@components/ArticleNode/Nodes/ImageNode';
import AsideBoxNode from '@components/ArticleNode/Nodes/AsideBoxNode';
import VideoNode from '@components/ArticleNode/Nodes/VideoNode';
import PanelNode from '@components/ArticleNode/Nodes/PanelNode';
import CommunityAuthor from '@components/ArticleNode/Nodes/CommunityAuthorNode';
import GalleryNode from '@components/ArticleNode/Nodes/GalleryNode';
import ignoreNodes from '@t/ignoreNodes';
import OlNode from '@components/ArticleNode/Nodes/OlNode';
import TableHeadingNode from '@components/ArticleNode/Nodes/TableHeadingNode';
import MobileTableNode from '@components/ArticleNode/Nodes/MobileTableNode';
import CitationNode from '@components/ArticleNode/Nodes/CitationNode';

const ArticleNode = (props: ArticleContentDataNodeResponse) => {
    if (ignoreNodes.includes(props.kind)) return null;

    if (instanceOfNodeHtml(props)) {
        return <HtmlNode {...props} />
    } else if (props.kind === "image") {
        return <ImageNode {...props} />
    } else if (props.kind === "aside-box") {
        return <AsideBoxNode {...props} />
    } else if (props.kind === "video") {
        return <VideoNode {...props} />
    } else if (props.kind === "panel") {
        return <PanelNode {...props} />
    } else if (props.kind === "community-author") {
        return <CommunityAuthor {...props} />
    } else if (props.kind === "fotorama") {
        return <GalleryNode {...props} />
    } else if (props.kind === 'ul' || props.kind === 'ol') {
        return <OlNode {...props} />
    } else if (props.kind === "table-heading") {
        return <TableHeadingNode {...props} />
    } else if (props.kind === "mobile-table") {
        return <MobileTableNode {...props} />
    } else if (props.kind === "citation") {
        return <CitationNode {...props} />
    }

    return <Text
        onPress={() => console.log(JSON.stringify(props))}
        style={{ backgroundColor: 'red' }}
    >
        ArticleNode {props.kind}
    </Text>;
};

function instanceOfNodeHtml(object: ArticleContentDataNodeResponse): object is ArticleContentDataNodeHtml {
    return object.kind in HtmlElementType;
}

export default ArticleNode;
