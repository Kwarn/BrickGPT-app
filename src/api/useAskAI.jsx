import { useState } from "react";
import axios from "axios";
import { removeNewLineCharacters } from "../utils/formatting";
import useAppStore from "../state/appStore";

const useAskAI = () => {
  const setIsAwaitingResponse = useAppStore(
    (state) => state.setIsAwaitingResponse
  );
  const [aiResponse, setAiResponse] = useState(null);

  const askAI = async (prompt) => {
    try {
      console.log("askAI", prompt);
      setIsAwaitingResponse(true);
      const {
        data: { aiResponse },
      } = await axios.post(
        "http://192.168.0.43:4000/api/ask",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsAwaitingResponse(false);
      setAiResponse(removeNewLineCharacters(aiResponse));
    } catch (e) {
      console.log(e);
      setIsAwaitingResponse(false);
    }
  };

  return { aiResponse, askAI };
};

export default useAskAI;
