import {Navigation} from 'react-native-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import NewsItemScreen from './src/screens/NewsItem';
import colors from './src/assets/styles/colors';

const WrappedScreen = Component => {
  return props => (
    <SafeAreaProvider>
      <Component {...props} />
    </SafeAreaProvider>
  );
};

Navigation.setDefaultOptions({
  topBar: {
    background: {
      color: {
        light: colors.bgLightGrey,
        dark: colors.dark.main,
      },
    },
    title: {
      color: {
        light: colors.mainBlack,
        dark: colors.dark.text.main,
      },
    },
  },
});

Navigation.registerComponent('HomeScreen', () => WrappedScreen(HomeScreen));
Navigation.registerComponent('NewsItemScreen', () =>
  WrappedScreen(NewsItemScreen),
);

Navigation.events().registerAppLaunchedListener(() => {
  return Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
});
