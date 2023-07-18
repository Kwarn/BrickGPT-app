import { useState } from "react";
import useAppStore from "../state/appStore";
import axios from "axios";

const useTranscribe = () => {
  const setIsAwaitingResponse = useAppStore(
    (state) => state.setIsAwaitingResponse
  );
  const [transcript, setTranscript] = useState(null);

  const transcribe = async (fileUri) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        name: "audio.m4a",
        type: "audio/m4a",
      });

      setIsAwaitingResponse(true);
      const {
        data: { transcript },
      } = await axios.post(
        "http://192.168.0.43:4000/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscript(transcript);
      setIsAwaitingResponse(false);
    } catch (e) {
      console.log(e);
      setIsAwaitingResponse(false);
    }
  };

  return { transcript, transcribe };
};

export default useTranscribe;
