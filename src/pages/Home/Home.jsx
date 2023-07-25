import React, { useRef, useState } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import FormFiller from "../../features/FormFiller/FormFiller";
import Assistant from "../../features/Assistant/Assistant";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Home() {
  const scrollRef = useRef(null);
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: scrollX } }],
    {
      useNativeDriver: true,
    }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      const screenWidth = SCREEN_WIDTH;

      // Define the threshold for swipe action
      const swipeThreshold = screenWidth / 3;

      if (translationX > swipeThreshold && activeComponentIndex > 0) {
        setActiveComponentIndex((prevIndex) => prevIndex - 1);
      } else if (translationX < -swipeThreshold && activeComponentIndex < 1) {
        setActiveComponentIndex((prevIndex) => prevIndex + 1);
      }

      // Calculate the new scroll position based on the updated activeComponentIndex
      const newScrollPosition = activeComponentIndex * screenWidth;

      // Reset the scroll position
      scrollRef.current
        .getNode()
        .scrollTo({ x: newScrollPosition, animated: true });
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.childContainer}>
              <Assistant />
            </View>
            <View style={styles.childContainer}>
              <FormFiller />
            </View>
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  childContainer: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
});
