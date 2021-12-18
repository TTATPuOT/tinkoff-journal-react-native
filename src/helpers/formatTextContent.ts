import shortcode from '@wordpress/shortcode';

const formatTextContent = (content: string) => {
    //TODO: Доделать красивое отображение текстовых виджетов
    const d = /\[.+]/gm.exec(content);
    if (d) {
        for (const i of d) {
            const data = shortcode.attrs(i);
            if (data.named.placeholder) content = content.replace(i, data.named.placeholder);
        }
    }
    return content;
}

export default formatTextContent;
