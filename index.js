import {Navigation} from 'react-native-navigation';
import HomeScreen from './src/screens/Home';
import NewsItemScreen from './src/screens/NewsItem';

Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('NewsItemScreen', () => NewsItemScreen);

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  return Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
