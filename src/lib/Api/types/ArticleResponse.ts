export default interface ArticleResponse {
    title: string
    slug: string
    date_published: string
    subtitle: string
    cover: ArticleCoverResponse,
    flows: ArticleFlowResponse[],
    id: string
}

export interface ArticleFlowResponse {
    name: string
    slug: string
    id: string
    description: string
    path: string
}

export interface ArticleCoverResponse {
    "cover_bg_color": string,
    "cover_bg_tone": "light" | "dark",
    "cover_image": FileResponse,
    "cover_bg_image_shading": boolean,
    "cover_image_align": "left" | "center",
    "cover_bg_image": FileResponse,
    "cover_bg_image_fullsize": boolean,
    "cover_bg_image_gradient": boolean,
    "cover_bg_image_noresize": boolean,
    "cover_image_nonretina": boolean,
    "cover_playback_speed": number,
    "reference_image": {}
}

export interface FileResponse {
    "originalBasename"?: string,
    "files"?: {
        "original": {
            "filepath": string,
            "mimeType": "image/jpeg",
            "width": number,
            "height": number,
            "fileSize": number,
            "resourceType": "image"
        }
    }
}
