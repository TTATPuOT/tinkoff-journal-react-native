import { ArticleContentDataNodeResponse } from '@lib/Api/types/ArticleContentResponse';
import formatTextContent from './formatTextContent';

const getAllChildsAsString = (items: ArticleContentDataNodeResponse[]|undefined = undefined): string => {
    const array: string[] = [];

    if (items) {
        for (const child of items) {
            if (child.kind === 'text') {
                array.push(formatTextContent(child.content));
            } else if (child.kind === 'br') {
                array.push('\n');
            }

            if (child.children) {
                //@ts-ignore
                const childs = getAllChildsAsString(child.children);
                if (childs.length > 0) array.push(...childs);
            }
        }
    }

    return array.join('');
}

export default getAllChildsAsString;
