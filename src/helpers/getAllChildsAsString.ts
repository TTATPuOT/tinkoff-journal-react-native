import { ArticleContentDataNodeResponse } from '@lib/Api/types/ArticleContentResponse';
import shortcode from '@wordpress/shortcode';

const getAllChildsAsString = (item: ArticleContentDataNodeResponse): string => {
    if (item.children) {
        const array: string[] = [];

        for (const child of item.children) {
            //TODO: Доделать красивое отображение текстовых виджетов
            if (child.kind === 'text') {
                let content: string = child.content;
                const d = /\[.+]/gm.exec(content);
                if (d) {
                    for (const i of d) {
                        const data = shortcode.attrs(i);
                        if (data.named.placeholder) content = content.replace(i, data.named.placeholder);
                    }
                }
                array.push(content);
            } else if (child.kind === 'br') {
                array.push('\n');
            }

            if (child.children) {
                const childs = getAllChildsAsString(child);
                if (childs.length > 0) array.push(...childs);
            }
        }

        //@ts-ignore
        return array.join('');
    }

    return '';
}

export default getAllChildsAsString;
