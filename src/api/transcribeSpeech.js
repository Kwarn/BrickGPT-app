import axios from "axios";

export const transcribe = async (fileUri) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      name: "audio.m4a",
      type: "audio/m4a",
    });
    
    const {
      data: { transcript },
    } = await axios.post("http://192.168.0.43:4000/api/transcribe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return transcript;
  } catch (e) {
    console.log(e);
  }
};
