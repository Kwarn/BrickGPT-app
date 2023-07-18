import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: ${(props) =>
    props.iconPosition === "left"
      ? "25px auto auto 40px"
      : "25px 40px auto auto"};
`;

const Ball = styled(Animated.View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: ${(props) =>
    props.iconPosition === "left"
      ? "5px auto 5px auto"
      : "5px 5px auto auto"};
  background-color: white;
`;

const LoadingIcon = ({ position }) => {
  console.log("loading icon, position", position);
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
            outputRange: [0, 15 * index],
          }),
        },
      ],
      opacity: animation,
    };
  };

  return (
    <Container iconPosition={position}>
      {[0, 1, 2].map((index) => (
        <Ball
          key={index}
          style={interpolateBallStyles(index)}
          iconPosition={position}
        />
      ))}
    </Container>
  );
};

export default LoadingIcon;
