import { ArticleContentDataNodeResponse } from '@lib/Api/types/ArticleContentResponse';

const getAllChilds = (item: ArticleContentDataNodeResponse): ArticleContentDataNodeResponse[] => {
    const array: ArticleContentDataNodeResponse[] = [];

    if (item.children) {
        for (const child of item.children) {
            array.push(child);

            if (child.children) {
                const childs = getAllChilds(child);
                if (childs.length > 0) array.push(...childs);

                delete child.children;
            }
        }
    }

    return array;
}

export default getAllChilds;
