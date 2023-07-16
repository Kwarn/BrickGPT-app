import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 25px auto auto 20px;
`;

const Ball = styled(Animated.View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: 5px 0 5px 0;
  background-color: white;
`;

const LoadingIcon = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  const interpolateBallStyles = (index) => {
    return {
      transform: [
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 20 * index],
          }),
        },
      ],
      opacity: animation,
    };
  };

  return (
    <Container>
      {[0, 1, 2].map((index) => (
        <Ball key={index} style={interpolateBallStyles(index)} />
      ))}
    </Container>
  );
};

export default LoadingIcon;
