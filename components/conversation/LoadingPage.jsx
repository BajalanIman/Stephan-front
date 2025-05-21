import React from "react";
import Rabbit from "../../assets/Images/Rabbit_Wh.png";
import { Box, Typography } from "@mui/material";

const LoadingPage = () => {
  const thinkingMessages = [
    "I'm still thinking about your question. It's a really interesting one!",
    "Just a moment while I piece this together for you, great question!",
    "Hang tight, I’m working through the best answer for you.",
    "This one’s got some depth, give me a sec to dig in!",
    "Still processing… You’ve definitely asked something worth pondering!",
    "Taking a moment to get this just right for you!",
    "Love this question! Thinking it through now.",
    "Let me double-check everything, want to make sure it’s a solid answer!",
    "Good one! I’m putting the pieces together as we speak.",
    "Hold on a moment, this deserves a thoughtful reply.",
  ];
  return (
    <div className="h-screen w-full absolute flex justify-center items-center top-0 left-0 z-[9999]">
      <Box
        sx={{
          position: "relative",
          width: 260,
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={Rabbit}
          alt="Loading"
          sx={{ height: "auto", display: "block", zIndex: 9 }}
        />
        <Typography
          sx={{
            position: "absolute",
            color: "Black",
            textAlign: "center",
            top: 42,
            pl: 5,
            pr: 2,
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          {
            thinkingMessages[
              Math.floor(Math.random() * thinkingMessages.length)
            ]
          }
        </Typography>
      </Box>
    </div>
  );
};

export default LoadingPage;
