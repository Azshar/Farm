import {Navigation} from 'react-native-navigation';
import App from './App';

Navigation.registerComponent('HomeScreen', () => App);

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
