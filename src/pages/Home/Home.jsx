import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
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

  // appStore => activeComponent => component => if active => getTranscript from transcript Store

  useEffect(() => {
    console.log("activeComponentIndex", activeComponentIndex);

    setRecordingUri(null)
  }, [activeComponentIndex]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newActiveIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    setActiveComponentIndex(newActiveIndex);
  };

  return (
    <S.Wrapper>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="center"
        onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust the throttle value as needed
      >
        <S.ContentContainer>
          <S.ChildContainer screenWidth={SCREEN_WIDTH}>
            <Assistant recordingUri={activeComponentIndex <= 0  && recordingUri} />
          </S.ChildContainer>
          <S.ChildContainer screenWidth={SCREEN_WIDTH}>
            <FormFiller recordingUri={activeComponentIndex === 1 && recordingUri} />
          </S.ChildContainer>
        </S.ContentContainer>
      </ScrollView>
      <S.ButtonContainer>
        <RecordButton callback={(uri) => setRecordingUri(uri)} />
        <ClearConversationsButton />
      </S.ButtonContainer>
    </S.Wrapper>
  );
}
