import React, { useEffect, useRef, useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import adaptLogo from "./../../assets/Images/adaptLogo.png";
import {
  ThumbDownAlt,
  ThumbDownAltOutlined,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  VolumeUp,
} from "@mui/icons-material";

const Chats = ({ customChat }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard successfully!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const [votes, setVotes] = useState({});

  const handleThumbsUp = (id) => {
    setVotes((prev) => ({
      ...prev,
      [id]: prev[id] === "up" ? null : "up",
    }));
  };

  const handleThumbsDown = (id) => {
    setVotes((prev) => ({
      ...prev,
      [id]: prev[id] === "down" ? null : "down",
    }));
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [customChat]);

  return (
    <div className="w-full h-[100%] min-h-screen pb-10">
      {customChat.map((message) => (
        <Box
          key={message.message_id}
          sx={{
            marginTop: 2,
            marginX: 25,
            padding: 2,
            borderRadius: "10px",
          }}
        >
          <div key={message.message_id}>
            <Typography sx={{ fontWeight: "bold" }}>You</Typography>
            <Box
              sx={{
                border: 1,
                borderColor: "gray",
                borderRadius: 5,
                borderBottomLeftRadius: 80,
                p: 3,
                bgcolor: "#A2C2B8",
                minWidth: 400,
                maxWidth: 500,
                width: "fit-content",
              }}
            >
              {message.question}
            </Box>

            <div className="flex flex-col justify-end items-end py-3">
              <img src={adaptLogo} className="w-9" />

              <Box
                sx={{
                  border: 1,
                  borderColor: "gray",
                  borderRadius: 5,
                  borderBottomRightRadius: 80,
                  padding: "10px 15px 5px 15px",
                  bgcolor: "#B8C2A2",
                  minWidth: 400,
                  maxWidth: 500,
                  width: "fit-content",
                  height: "fit-content",
                }}
              >
                <Typography>{message.answer}</Typography>
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    gap: 0.5,
                    paddingTop: 2,
                  }}
                >
                  {votes[message.message_id] === "up" ? (
                    <Tooltip title="Unselect like" arrow>
                      <ThumbUpAlt
                        onClick={() => handleThumbsUp(message.message_id)}
                        style={{ color: "#565656", cursor: "pointer" }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Select like" arrow>
                      <ThumbUpAltOutlined
                        onClick={() => handleThumbsUp(message.message_id)}
                        style={{ cursor: "pointer", color: "#565656" }}
                      />
                    </Tooltip>
                  )}

                  {votes[message.message_id] === "down" ? (
                    <Tooltip title="Unselect dislike" arrow>
                      <ThumbDownAlt
                        onClick={() => handleThumbsDown(message.message_id)}
                        style={{ color: "#565656", cursor: "pointer" }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Select dislike" arrow>
                      <ThumbDownAltOutlined
                        onClick={() => handleThumbsDown(message.message_id)}
                        style={{ cursor: "pointer", color: "#565656" }}
                      />
                    </Tooltip>
                  )}
                  <Tooltip title="copy to clipboard" arrow>
                    <ContentCopyIcon
                      onClick={() => copyToClipboard(message.answer)}
                      sx={{
                        fill: "#565656",
                        cursor: "pointer",
                        ":hover": { fill: "blue" },
                        ":active": { fill: "darkblue" },
                      }}
                      variant="contained"
                    />
                  </Tooltip>
                  <Tooltip title="Speak" arrow>
                    <VolumeUp
                      onClick={() => speakText(message.answer)}
                      sx={{
                        fill: "#565656",
                        cursor: "pointer",
                        ":hover": { fill: "green" },
                        ":active": { fill: "darkgreen" },
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </div>
          </div>
        </Box>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chats;
