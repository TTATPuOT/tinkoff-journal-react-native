import React, { useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { ArticleContentDataNodeMobileTable } from '@lib/Api/types/ArticleContentResponse';
import getAllChildsAsString from '@helpers/getAllChildsAsString';
import { StyleSheet, View } from 'react-native';

interface Row {
    key: string
    values: string[]
}

const MobileTableNode = (props: ArticleContentDataNodeMobileTable) => {
    const items = useMemo(() => {
        if (!props.children) return null;

        const array: Row[] = [];

        for (const section of props.children) {
            if (section.kind === 'div' && section.children && section.class.some(c => c.includes('section'))) {
                for (const row of section.children) {
                    if (row.kind === 'div' && row.children && row.class.some(c => c.includes('row'))) {
                        const rowData: Row = { key: '', values: [] };

                        for (const item of row.children) {
                            if (item.kind === 'div' && item.children) {

                                if (item.class.some(c => c.includes('key'))) {
                                    rowData.key = getAllChildsAsString(item.children).trim();
                                } else if (item.class.some(c => c.includes('value'))) {
                                    rowData.values.push(getAllChildsAsString(item.children).trim());
                                }
                            }
                        }

                        array.push(rowData);
                    }
                }
            }
        }

        if (array.length) {
            return array.map((row, key) => {
                const items = row.values.map((v, key) => {
                    return <Text key={key} style={styles.value}>{v}</Text>;
                })
                return <View key={key} style={styles.row}>
                    <Text style={styles.key}>{row.key}</Text>
                    {items}
                </View>
            });
        }

        return null;
    }, [props.children]);

    return <View style={styles.table}>{items}</View>;
};

const styles = StyleSheet.create({
    table: {
        borderTopColor: 'grey',
        borderBottomColor: 'grey',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 5,
        paddingBottom: 5,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    key: {},
    value: {},
});

export default MobileTableNode;
