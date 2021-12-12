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
                    "@helpers": "./src/helpers",
                }
            }
        ],
        'react-native-reanimated/plugin',
    ]
};
