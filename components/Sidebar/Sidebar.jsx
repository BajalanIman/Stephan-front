// Sidebar.jsx
import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ViewSidebarRounded from "@mui/icons-material/ViewSidebarRounded";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AdminPanel from "../Admin/AdminPanel";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  conversations,
  customConversationId,
  setCustomChat,
  setCustomConversationId,
}) => {
  return (
    <>
      {!showSidebar && (
        <Box
          sx={{
            height: 35,
            display: "flex",
            position: "fixed",
            left: 8,
            top: { xs: 10, md: 45 },
            zIndex: 2000,
          }}
        >
          <IconButton onClick={() => setShowSidebar(!showSidebar)}>
            <ViewSidebarRounded sx={{ color: "#696969" }} />
          </IconButton>
          <Tooltip title="New conversation" arrow>
            <IconButton
              sx={{ color: "#696969" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              <AutorenewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Box
        sx={{
          width: showSidebar ? "300px" : "0",
          height: "100%",
          display: "flex",
          position: "fixed",
          transition: "transform 1s linear",
          transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
          flexDirection: "column",
          justifyContent: "flex-start",
          pl: 2,
          pt: 5,
          gap: 1,
          borderRight: "1px solid gray",
          backgroundColor: "#ffffff",
          zIndex: 1000,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {showSidebar && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                top: { xs: -30, md: 0 },
                width: "100%",
                paddingRight: 5,
                gap: 2,
              }}
            >
              <IconButton onClick={() => setShowSidebar(false)}>
                <ViewSidebarRounded sx={{ color: "#696969" }} />
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Conversations
              </Typography>
              <AutorenewIcon
                onClick={() => {
                  window.location.reload();
                }}
              />
              <AdminPanel />
            </Box>
          )}
        </Box>
        <Box sx={{ overflowY: "scroll", mb: 1, height: "100%", mt: 5 }}>
          {conversations.map((conv) => (
            <Box
              key={conv.conversation_id}
              sx={{ display: "flex", justifyContent: "space-between" }}
              className={`${
                customConversationId === conv.conversation_id
                  ? " max-w-80 bg-gray-200 hover:bg-gray-200 active:bg-gray-300 p-1 hover:rounded-lg rounded-lg"
                  : " max-w-80 hover:bg-gray-200 active:bg-gray-300 px-2 py-1 hover:rounded-lg rounded-lg"
              }`}
            >
              <Typography
                key={conv.conversation_id}
                variant="body1"
                className="whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => {
                  setCustomChat(conv.messages || []);
                  setCustomConversationId(conv.conversation_id);
                }}
                sx={{ cursor: "pointer" }}
              >
                {conv.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
