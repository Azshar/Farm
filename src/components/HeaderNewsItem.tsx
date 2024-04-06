import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {ArticleItem} from '#app/models/article';
import {emptyImageIcon} from '#app/assets/ImageRepo';
import colors from '#app/assets/styles/colors';
import dayjs from 'dayjs';

interface IProps {
  item: ArticleItem;
}

const HeaderNewsItem = ({item}: IProps): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const date =
    item?.publishedAt && dayjs(item.publishedAt).format('HH:mm DD-MM-YYYY');

  return (
    <View style={[Styles.headerItem]}>
      {item?.urlToImage ? (
        <Image
          source={{
            uri: item.urlToImage,
          }}
          style={[Styles.imageItem]}
        />
      ) : (
        <View style={[Styles.wrapEmptyImageItem]}>
          <Image source={emptyImageIcon} style={[Styles.emptyImageItem]} />
        </View>
      )}
      <View style={[Styles.wrapHeaderContent]}>
        <Text
          maxFontSizeMultiplier={1.5}
          style={[
            Styles.authorText,
            isDarkMode ? Styles.authorTextDark : null,
          ]}>
          {item.author ? item.author : '#'}
        </Text>
        {date ? (
          <Text
            maxFontSizeMultiplier={1.5}
            style={[Styles.dateText, isDarkMode ? Styles.dateTextDark : null]}>
            {date}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderNewsItem;

const Styles = StyleSheet.create({
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageItem: {
    borderRadius: 6,
    width: 50,
    height: 50,
  },
  wrapEmptyImageItem: {
    backgroundColor: colors.bgGrey,
    borderRadius: 6,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImageItem: {
    width: 36,
    height: 36,
  },
  wrapHeaderContent: {
    marginLeft: 10,
  },
  authorText: {
    marginBottom: 4,
    color: colors.mainBlack,
    fontSize: 18,
    fontWeight: '500',
  },
  authorTextDark: {
    color: colors.dark.text.main,
  },
  dateText: {
    color: colors.grey,
    fontSize: 14,
  },
  dateTextDark: {
    color: colors.dark.text.second,
  },
});
