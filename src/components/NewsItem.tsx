import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import colors from '#app/assets/styles/colors';
import {Navigation} from 'react-native-navigation';
import HeaderNewsItem from '#app/components/HeaderNewsItem';

const NewsItem = (props): React.JSX.Element => {
  const {item, index, componentId} = props;
  const isDarkMode = useColorScheme() === 'dark';

  const goToNewsItem = () => {
    if (!item) {
      return;
    }

    const title = item?.title.substring(0, 35) + '...';

    return Navigation.push(componentId, {
      component: {
        name: 'NewsItemScreen',
        options: {
          topBar: {
            title: {
              text: title,
            },
          },
        },
        passProps: {
          item: item,
        },
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[Styles.wrapItem, isDarkMode ? Styles.wrapItemDark : null]}
      onPress={goToNewsItem}>
      <HeaderNewsItem item={item} index={index} />

      {item.title ? (
        <Text
          maxFontSizeMultiplier={1.5}
          style={[Styles.titleText, isDarkMode ? Styles.titleTextDark : null]}>
          {item.title}
        </Text>
      ) : null}
      {item.description ? (
        <Text
          maxFontSizeMultiplier={1.5}
          style={[Styles.descText, isDarkMode ? Styles.descTextDark : null]}>
          {item.description}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(NewsItem);

const Styles = StyleSheet.create({
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
    overflow: 'hidden',
  },
  wrapItemDark: {
    backgroundColor: colors.dark.frame,
  },
  titleText: {
    marginBottom: 15,
    color: colors.mainBlack,
    fontSize: 20,
    fontWeight: '500',
  },
  titleTextDark: {
    color: colors.dark.text.main,
  },
  descText: {
    color: colors.grey,
    fontSize: 16,
  },
  descTextDark: {
    color: colors.dark.text.second,
  },
});
