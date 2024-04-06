import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NavigationFunctionComponent} from 'react-native-navigation';
import {useArticles} from '#app/classes/API';
import colors from '#app/assets/styles/colors';
import NewsItem from '#app/components/NewsItem';
import {ArticleItem} from '#app/models/article';
import dayjs from 'dayjs';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const LAST_WEEK = dayjs().subtract(7, 'days').format('YYYY-MM-DD');

const Home: NavigationFunctionComponent = (props): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const totalResults = useRef(0);

  /**
   * А вдруг нужно будет фильтр сделать, чтоб пользователь мог сам выбирать параметры
   * */
  const filterArticles = {
    q: 'bitcoin',
    sortBy: 'popularity',
    from: LAST_WEEK,
  };

  const {data, isLoadingMore, size, setSize, isLoading, error} =
    useArticles(filterArticles);

  let articles: ArticleItem[] = [];

  data.forEach(val => {
    totalResults.current = val.totalResults;
    articles = articles.concat(val.articles);
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.dark.main : colors.bgLightGrey,
  };

  const onRefresh = () => {
    return setSize(1);
  };

  const renderItem = ({item, index}) => {
    return (
      <NewsItem item={item} index={index} componentId={props.componentId} />
    );
  };

  const loadMoreData = () => {
    if (isLoading || error) {
      return false;
    }

    return setSize(size + 1);
  };

  const showMoreBtn = !isLoading && articles.length > 0;
  const showOnRefreshBtn = error && articles.length === 0 && !isLoading;
  const showHeader = (error || totalResults?.current) && !isLoading;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        contentContainerStyle={[
          Styles.content,
          isDarkMode ? Styles.contentDark : null,
          {
            minHeight: WINDOW_HEIGHT - insets.bottom - insets.top,
          },
        ]}
        data={articles}
        refreshing={isLoading && !error}
        onRefresh={onRefresh}
        renderItem={renderItem}
        initialNumToRender={6}
        ListHeaderComponent={
          !showHeader ? (
            <></>
          ) : (
            <View
              style={[
                Styles.wrapItem,
                isDarkMode ? Styles.wrapItemDark : null,
              ]}>
              <Text
                maxFontSizeMultiplier={1.5}
                style={[
                  Styles.headerComponentText,
                  isDarkMode ? Styles.headerComponentTextDark : null,
                ]}>
                {error ? error : null}
                {!error && totalResults?.current
                  ? `Общее кол-во новостей: ${totalResults?.current}`
                  : null}
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          showMoreBtn ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={loadMoreData}
              style={[
                Styles.wrapItem,
                Styles.moreBtnWrap,
                isDarkMode ? Styles.wrapItemDark : null,
              ]}>
              {isLoadingMore ? (
                <ActivityIndicator />
              ) : (
                <Text
                  maxFontSizeMultiplier={1.5}
                  style={[
                    Styles.moreBtnText,
                    isDarkMode ? Styles.moreBtnTextDark : null,
                  ]}>
                  Загрузить еще
                </Text>
              )}
            </TouchableOpacity>
          ) : showOnRefreshBtn ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRefresh}
              style={[
                Styles.wrapItem,
                Styles.moreBtnWrap,
                isDarkMode ? Styles.wrapItemDark : null,
              ]}>
              <Text
                maxFontSizeMultiplier={1.5}
                style={[
                  Styles.moreBtnText,
                  isDarkMode ? Styles.moreBtnTextDark : null,
                ]}>
                Обновить
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 15,
    backgroundColor: colors.bgLightGrey,
  },
  contentDark: {
    backgroundColor: colors.dark.main,
  },
  headerComponentText: {
    fontSize: 20,
    color: colors.mainBlack,
  },
  headerComponentTextDark: {
    color: colors.dark.text.second,
  },
  wrapItem: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 5,
    backgroundColor: colors.mainWhite,
    shadowColor: colors.mainBlack,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  wrapItemDark: {
    backgroundColor: colors.dark.frame,
  },
  moreBtnWrap: {
    marginBottom: 20,
    borderRadius: 8,
    paddingVertical: 15,
    minHeight: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
  },
  moreBtnText: {
    color: colors.mainWhite,
    fontSize: 16,
    fontWeight: '500',
  },
  moreBtnTextDark: {
    color: colors.dark.text.second,
  },
});

export default Home;
