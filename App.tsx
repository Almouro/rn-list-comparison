/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/EvilIcons';
import {FlashList} from '@shopify/flash-list';
import feed from './feed.json';
import {Tweet} from './Tweet';

const textStyle = {color: '#444'};
const iconStyle = {paddingRight: 5, color: '#444'};
const viewStyle = {flexDirection: 'row', flex: 1, alignItems: 'center'};

const Metric = ({iconName, value}: {iconName: string; value: number}) => (
  <View style={viewStyle}>
    <Icon name={iconName} size={24} style={iconStyle} />
    {value ? <Text style={textStyle}>{value}</Text> : null}
  </View>
);

const metricsContainerStyle = {flexDirection: 'row', paddingTop: 5};
const Metrics = ({tweet}: {tweet: Tweet}) => (
  <View style={metricsContainerStyle}>
    <Metric iconName="comment" value={tweet.public_metrics.quote_count} />
    <Metric iconName="retweet" value={tweet.public_metrics.retweet_count} />
    <Metric iconName="heart" value={tweet.public_metrics.like_count} />
    <Icon name="share-google" size={24} color="#444" style={{flex: 1}} />
  </View>
);

const TweetImage = ({tweet}: {tweet: Tweet}) =>
  tweet.image ? (
    <Image
      key={tweet.image.url}
      source={{uri: tweet.image.url}}
      style={{
        aspectRatio: tweet.image.width / tweet.image.height,
        width: '100%',
        borderRadius: 10,
        marginVertical: 5,
      }}
    />
  ) : null;

const tweetAuthorStyle = {fontWeight: 'bold', color: 'black'};

const TweetHeader = ({tweet}: {tweet: Tweet}) => (
  <Text>
    <Text style={{flex: 1}} numberOfLines={1}>
      <Text style={tweetAuthorStyle}>{tweet.author.name}</Text>
      <Text style={{color: '#444'}}> @{tweet.author.username}</Text>
    </Text>
    <TweetDate tweet={tweet} />
  </Text>
);

const TweetDate = ({tweet}: {tweet: Tweet}) => (
  <Text style={{color: '#444'}}>
    {' '}
    · {format(new Date(tweet.createdAt), 'dd MMM')}
  </Text>
);

const tweetAvatarStyle = {
  height: 48,
  width: 48,
  borderRadius: 24,
};

const TweetAvatar = ({tweet}: {tweet: Tweet}) => {
  return (
    <View style={{paddingRight: 10}}>
      <Image
        source={{uri: tweet.author.profile_image_url}}
        style={tweetAvatarStyle}
      />
    </View>
  );
};

const TweetItem = ({tweet}: {tweet: Tweet}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <TweetAvatar tweet={tweet} />
        <View style={{flex: 1}}>
          <TweetHeader tweet={tweet} />

          <Text style={{marginVertical: 5, color: 'black'}}>{tweet.text}</Text>
          <TweetImage tweet={tweet} />
          <Metrics tweet={tweet} />
        </View>
      </View>
    </View>
  );
};

const USE_FLASHLIST = true;
const Item = USE_FLASHLIST ? TweetItem : memo(TweetItem);

const ItemSeparatorComponent = () => <View style={{height: 1}} />;
const Separator = USE_FLASHLIST
  ? ItemSeparatorComponent
  : memo(ItemSeparatorComponent);

const ListComponent = USE_FLASHLIST ? FlashList : FlatList;

const renderItem = ({item}: {item: Tweet}) => <Item tweet={item} />;
const keyExtractor = ({id}: Tweet) => id;

const List = () => {
  return (
    <ListComponent
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={feed}
      estimatedItemSize={350}
      ItemSeparatorComponent={Separator}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <List />
    </>
  );
};

export default App;
