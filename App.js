import { StatusBar } from "expo-status-bar";
import Home from "./src/pages/Home/Home";
import styled from "styled-components";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

export default function App() {
  return (
    <Wrapper>
      <Home />
      <StatusBar style="auto" />
    </Wrapper>
  );
}
