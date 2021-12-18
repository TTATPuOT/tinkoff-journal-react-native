module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    "@components": "./src/components",
                    "@lib": "./src/lib",
                    "@t": "./src/types",
                    "@img": "./src/img",
                    "@helpers": "./src/helpers",
                }
            }
        ],
        'react-native-reanimated/plugin',
    ]
};
