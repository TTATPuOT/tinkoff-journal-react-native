export default (string: string): string => {
    return string.toString().replace(/<[^>]*>?/gm, '');
}
