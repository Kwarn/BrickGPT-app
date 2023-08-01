import axios from "axios";
import { removeNewLineCharacters } from "../utils/formatting";

export const askAI = async (prompt) => {
  try {
    console.log("askAI prompt", prompt);
    const {
      data: { aiResponse },
    } = await axios.post(
      "http://192.168.39.9:4000/api/ask",
      { prompt },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return removeNewLineCharacters(aiResponse);
  } catch (e) {
    console.log(e);
  }
};
