import styled from "styled-components";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`

export const AnimatedScrollView = styled(Animated.ScrollView)`
  width: 100%;
  flex: 1;
  flex-direction: row;
`;

export const SPanGestureHandler = styled(PanGestureHandler)`
  flex: 1;
`;

export const ButtonContainer = styled.View`
  height: 180px;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const ContentContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ChildContainer = styled.View`
  width: ${(props) => props.screenWidth}px; 
  align-items: center;
`;