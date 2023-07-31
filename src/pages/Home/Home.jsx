import React, { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { useValue } from "react-native-reanimated";
import ClearConversationsButton from "../../components/ClearConversationsButton/ClearConversationsButton";
import RecordButton from "../../components/RecordButton/RecordButton";
import FormFiller from "../../features/FormFiller/FormFiller";
import Assistant from "../../features/Assistant/Assistant";
import * as S from "./HomeStyles";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Home() {
  const scrollRef = useRef(null);
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);
  const [recordingUri, setRecordingUri] = useState();

  const translationX = useValue(0);

  const onGestureEvent = Animated.event([{ nativeEvent: { translationX } }], {
    useNativeDriver: true,
  });

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
      scrollRef.current?.scrollTo({ x: newScrollPosition, animated: true });
    }
  };

  return (
    <S.Wrapper>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <S.AnimatedScrollView // Change this to Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast" // Add this line for faster scrolling
          snapToInterval={SCREEN_WIDTH} // Add this line for snapping to each component
          snapToAlignment="center" // Add this line for alignment
        >
          <S.ContentContainer>
            <S.ChildContainer screenWidth={SCREEN_WIDTH}>
              <Assistant
                recordingUri={activeComponentIndex === 0 && recordingUri}
              />
            </S.ChildContainer>
            <S.ChildContainer screenWidth={SCREEN_WIDTH}>
              <FormFiller
                recordingUri={activeComponentIndex === 1 && recordingUri}
              />
            </S.ChildContainer>
          </S.ContentContainer>
        </S.AnimatedScrollView>
      </PanGestureHandler>
      <S.ButtonContainer>
        <RecordButton callback={(uri) => setRecordingUri(uri)} />
        <ClearConversationsButton />
      </S.ButtonContainer>
    </S.Wrapper>
  );
}
