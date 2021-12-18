import ArticleResponse, { FileResponse } from '@lib/Api/types/ArticleResponse';

export default interface ArticleContentResponse extends ArticleResponse {
    content: ArticleContentDataResponse
}

export interface ArticleContentDataResponse {
    ts: number
    schema_version: 1,
    nodes: ArticleContentDataNodeResponse[]
}

export type ArticleContentDataNodeResponse = ArticleContentDataNodeAuthor
    | ArticleContentDataNodeLead
    | ArticleContentDataNodeText
    | ArticleContentDataNodeHtml
    | ArticleContentDataNodeBanner
    | ArticleContentDataNodeImage
    | ArticleContentDataNodeVideo
    | ArticleContentDataNodeAsideBox
    | ArticleContentDataNodeAsideRef
    | ArticleContentDataNodePanel
    | ArticleContentDataNodeCommunityAuthor
    | ArticleContentDataNodeFeature
    | ArticleContentDataNodeFotorama
    | ArticleContentDataNodeAside
    | ArticleContentDataNodeDiv
    | ArticleContentDataNodeOl
    | ArticleContentDataNodeLi
    | ArticleContentDataNodeCut
    | ArticleContentDataNodeHighlight
    | ArticleContentDataNodeTableHeading
    | ArticleContentDataNodeTable
    | ArticleContentDataNodeMobileTable
    | ArticleContentDataNodeExplanation
    | ArticleContentDataNodeTableContainer
    | ArticleContentDataNodeTableCitation
    | ArticleContentDataNodeSource
    | ArticleContentDataNodeExample
    | ArticleContentDataNodeA

export enum HtmlElementType {
    p = 'p1',
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    nobr = 'p1',
    span = 's1',
    lead = 'h5',
    br = 'br',
    strong = 'strong'
}
export interface ArticleContentDataNodeBase {
    kind: string
    children?: ArticleContentDataNodeResponse[]
}
export interface ArticleContentDataNodeAuthor extends ArticleContentDataNodeBase {
    kind: "author"
    name: string
    description: string
    image: FileResponse
    consultant: string
    is_anonymous: boolean
    is_deleted: boolean
    link: string
    social_id: string
}
export interface ArticleContentDataNodeLead extends ArticleContentDataNodeBase {
    kind: "lead"
}
export interface ArticleContentDataNodeText extends ArticleContentDataNodeBase {
    kind: "text"
    content: string
}
export interface ArticleContentDataNodeHtml extends ArticleContentDataNodeBase {
    kind: keyof typeof HtmlElementType
}
export interface ArticleContentDataNodeBanner extends ArticleContentDataNodeBase {
    kind: "bannerlink-level"
    label: string
    banner_id: string
}
export interface ArticleContentDataNodeImage extends ArticleContentDataNodeBase {
    kind: "image"
    slug: string
    object: FileResponse
    caption: string|ArticleContentDataNodeResponse[]
    link: string|null
    noretina: boolean
    bordered: boolean
    columned: boolean
    is_label: boolean
    in_fotorama: boolean
    without_container: boolean
}
export interface ArticleContentDataNodeVideo extends ArticleContentDataNodeBase {
    kind: "video"
    video_id: string
    url: string
    caption: string|ArticleContentDataNodeResponse[]
    preview: string
    ratio: number
    fullsize: boolean
    mediumsize: boolean
    column: boolean
    size: "medium"
}
export interface ArticleContentDataNodeAsideBox extends ArticleContentDataNodeBase {
    kind: "aside-box"
}
export interface ArticleContentDataNodeAsideRef extends ArticleContentDataNodeBase {
    kind: "aside-ref"
    id: string
    url: string
    title: string
    subtitle: string
    date_published: string
    image: FileResponse
    badge: string
    slug: string
}
export interface ArticleContentDataNodePanel extends ArticleContentDataNodeBase {
    kind: "panel"
    style: {
        color: string
        'background-color': string
    }
    inner_style: {
        color: string
    }
    trackinglabel: string
}
export interface ArticleContentDataNodeCommunityAuthor extends ArticleContentDataNodeBase {
    kind: 'community-author'
    name: string
    description: string|ArticleContentDataNodeResponse[]
    image: FileResponse,
    "consultant": string,
    "is_anonymous": boolean,
    "is_deleted": boolean,
    "link": string
}
export interface ArticleContentDataNodeFeature extends ArticleContentDataNodeBase {
    kind: 'feature'
}
export interface ArticleContentDataNodeFotorama extends ArticleContentDataNodeBase {
    kind: 'fotorama'
}
export interface ArticleContentDataNodeAside extends ArticleContentDataNodeBase {
    kind: 'aside'
    url: string
    image: FileResponse
}
export interface ArticleContentDataNodeDiv extends ArticleContentDataNodeBase {
    kind: 'div'
    class: string[]
}
export interface ArticleContentDataNodeOl extends ArticleContentDataNodeBase {
    kind: 'ol'|'ul'|'summary',
    style: string
    title?: string
    children?: ArticleContentDataNodeLi[]
}
export interface ArticleContentDataNodeLi extends ArticleContentDataNodeBase {
    kind: 'li'
    style: string
}
export interface ArticleContentDataNodeCut extends ArticleContentDataNodeBase {
    kind: 'cut'
    title: string
    subtitle: string
}
export interface ArticleContentDataNodeHighlight extends ArticleContentDataNodeBase {
    kind: 'highlight'
}
export interface ArticleContentDataNodeTableHeading extends ArticleContentDataNodeBase {
    kind: 'table-heading'
}
export interface ArticleContentDataNodeTable extends ArticleContentDataNodeBase {
    kind: 'table'
}
export interface ArticleContentDataNodeMobileTable extends ArticleContentDataNodeBase {
    kind: 'mobile-table',
    children?: ArticleContentDataNodeDiv[]
}
export interface ArticleContentDataNodeExplanation extends ArticleContentDataNodeBase {
    kind: 'explanation'
}
export interface ArticleContentDataNodeTableContainer extends ArticleContentDataNodeBase {
    kind: 'table-container'
}
export interface ArticleContentDataNodeTableCitation extends ArticleContentDataNodeBase {
    kind: 'citation'
}
export interface ArticleContentDataNodeSource extends ArticleContentDataNodeBase {
    kind: 'source',
    items: {
        name: string
        href: string
    }[]
}
export interface ArticleContentDataNodeExample extends ArticleContentDataNodeBase {
    kind: 'example'
}
export interface ArticleContentDataNodeA extends ArticleContentDataNodeBase {
    kind: 'a'
    href: string
}
