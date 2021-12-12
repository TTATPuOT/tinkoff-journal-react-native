import ArticleResponse from '@lib/Api/types/ArticleResponse';

export default (article: ArticleResponse): string|undefined => {
    if (article.cover.cover_bg_image?.files)
        return article.cover.cover_bg_image.files.original.filepath;
    if (article.cover.cover_image?.files)
        return article.cover.cover_image.files.original.filepath;

    return undefined;
}
