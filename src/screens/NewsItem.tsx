import React, {useRef} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import type {NavigationFunctionComponent} from 'react-native-navigation';
import type {ArticleItem} from '#app/models/article';
import useComponentSize from '#app/hooks/useComponentSize';
import colors from '#app/assets/styles/colors';
import HeaderNewsItem from '#app/components/HeaderNewsItem';

const WINDOW_HEIGHT = Dimensions.get('window').height;

interface IProps {
  item: ArticleItem;
}

const NewsItem: NavigationFunctionComponent<IProps> = (
  props,
): React.JSX.Element => {
  const {item} = props;
  const [size, onLayout] = useComponentSize();
  const insets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const webViewRef = useRef(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.dark.main : colors.bgLightGrey,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        scrollEnabled={false}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View onLayout={onLayout} style={[Styles.headerWrap]}>
          <HeaderNewsItem item={item} />
        </View>
        <WebView
          ref={webViewRef}
          source={{uri: item?.url}}
          style={[
            Styles.webView,
            isDarkMode ? Styles.webViewDark : null,
            {
              height:
                WINDOW_HEIGHT -
                insets.bottom -
                insets.top -
                (size?.height || 0) -
                100,
            },
          ]}
          useWebkit={true}
          contentMode={'mobile'}
          originWhiteList={['*']}
          decelerationRate={1.2}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  headerWrap: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  webView: {
    flex: 1,
    backgroundColor: colors.bgLightGrey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  webViewDark: {
    backgroundColor: colors.dark.main,
  },
});

export default NewsItem;
