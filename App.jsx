import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [showReactions, setShowReactions] = useState(false);

  const reactionBoxScale = useRef(new Animated.Value(0)).current;
  const reactionBoxOpacity = useRef(new Animated.Value(0)).current;

  const likeCountScale = useRef(new Animated.Value(1)).current;
  const dislikeCountScale = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    hideReactionBox(); 
    animateReactionCount(likeCountScale);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
    hideReactionBox(); 
    animateReactionCount(dislikeCountScale);
  };

  const animateReactionBox = (toValue) => {
    Animated.parallel([
      Animated.timing(reactionBoxScale, {
        toValue,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(reactionBoxOpacity, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateReactionCount = (scaleRef) => {
    Animated.sequence([
      Animated.timing(scaleRef, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleRef, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLongPress = () => {
    setShowReactions(true);
    animateReactionBox(1);
  };

  const hideReactionBox = () => {
    animateReactionBox(0);
    setTimeout(() => setShowReactions(false), 300); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messageContainer}>
        <TouchableOpacity
          onLongPress={handleLongPress}
          activeOpacity={0.7}
        >
          <Text style={styles.senderName}>John Doe</Text>
          <View>
            <Text style={styles.messageText}>
              This is a demo message from an employee regarding the current project status.
            </Text>
          </View>

          {/* Reaction box with animation */}
          {showReactions && (
            <Animated.View
              style={[
                styles.reactionBox,
                {
                  transform: [{ scale: reactionBoxScale }],
                  opacity: reactionBoxOpacity,
                },
              ]}
            >
              <TouchableOpacity onPress={handleLike} style={styles.reactionButton}>
                <Icon name="thumbs-up" size={24} color={'blue'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDislike} style={styles.reactionButton}>
                <Icon name="thumbs-down" size={24} color={'red'} />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Reaction count bubble with animation */}
          {(likeCount > 0 || dislikeCount > 0) && (
            <View style={styles.reactionCountContainer}>
              {likeCount > 0 && (
                <Animated.View
                  style={[
                    styles.reactionCountBubble,
                    { transform: [{ scale: likeCountScale }] },
                  ]}
                >
                  <Icon name="thumbs-up" size={16} color="blue" />
                  <Text style={styles.reactionCountText}>{likeCount}</Text>
                </Animated.View>
              )}
              {dislikeCount > 0 && (
                <Animated.View
                  style={[
                    styles.reactionCountBubble,
                    { transform: [{ scale: dislikeCountScale }] },
                  ]}
                >
                  <Icon name="thumbs-down" size={16} color="red" />
                  <Text style={styles.reactionCountText}>{dislikeCount}</Text>
                </Animated.View>
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
    width: '80%',
    position: 'relative', 
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  reactionBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    width: '40%',
    position: 'absolute', 
    top: -30, 
    left: '60%',
    zIndex: 10, 
  },
  reactionButton: {
    marginHorizontal: 15,
  },
  reactionCountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  reactionCountBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  reactionCountText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default App;
