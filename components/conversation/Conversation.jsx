import React, { useState, useEffect, useRef } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import ViewSidebarRounded from "@mui/icons-material/ViewSidebarRounded";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import Chats from "./Chats";
import AdminPanel from "../Admin/AdminPanel";
import { BASE_URL } from "../../constants/constants";
import Footer from "../Footer/Footer";
import {
  Info,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import Sidebar from "../Sidebar/Sidebar";
import QuestionsAnswer from "../Footer/QuestionsAnswer";

const Conversation = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [customChat, setCustomChat] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [answerAI, setAnswerAI] = useState("");
  const [conversations, setConversations] = useState([]);
  const [customConversationId, setCustomConversationId] = useState(null);
  const [userId, setUserID] = useState(null);

  useEffect(() => {
    const id = Number(localStorage.getItem("userId"));
    setUserID(id);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchConversations();
      console.log(userId);
    }
  }, [userId]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}conversations`);
      const filteredConversations = response.data.filter(
        (e) => e.user_id === userId
      );
      setConversations(filteredConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const payload = { messages: searchInput };
    setShowLoading(true);

    try {
      const response = await axios.post("https://ai.scifor.de", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const aiResponse = response.data.response;
      setAnswerAI(aiResponse);

      let conversationId = customConversationId;
      if (!conversationId) {
        const conversationResponse = await axios.post(
          `${BASE_URL}conversations`,
          {
            user_id: userId,
            title: searchInput.slice(0, 50),
          }
        );
        conversationId = conversationResponse.data.id;
        setCustomConversationId(conversationId);
      }

      const newMessage = {
        conversation_id: conversationId,
        user_id: userId,
        question: searchInput,
        answer: aiResponse,
      };

      await axios.post(`${BASE_URL}messages`, newMessage);

      setCustomChat((prevChat) => [
        ...prevChat,
        {
          message_id: Math.random(),
          question: searchInput,
          answer: aiResponse,
        },
      ]);

      fetchConversations();
      setSearchInput("");
    } catch (error) {
      console.error("Error handling submit:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setShowLoading(false);
    }
  };

  const [showFooter, setShowFooter] = useState(true);

  const footerBtnHandler = () => {
    setShowFooter(!showFooter);
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" }); // or 'smooth'
  }, []);

  return (
    <div className="w-full h-[100%] flex relative flex-col ">
      {/* {!showSidebar && (
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
      )} */}
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        conversations={conversations}
        customConversationId={customConversationId}
        setCustomChat={setCustomChat}
        setCustomConversationId={setCustomConversationId}
      />

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
        <Box
          sx={{
            position: "relative",
          }}
        >
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
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                }}
              >
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
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className={`${
                customConversationId === conv.conversation_id
                  ? " max-w-80 bg-gray-200 hover:bg-gray-200 active:bg-gray-300 p-1 hover:rounded-lg rounded-lg"
                  : " max-w-80 hover:bg-gray-200 active:bg-gray-300 px-2 py-1 hover:rounded-lg rounded-lg"
              }`}
            >
              <Typography
                key={conv.conversation_id}
                variant="body1"
                className={`${
                  customConversationId === conv.conversation_id
                    ? "whitespace-nowrap overflow-hidden text-ellipsis"
                    : "whitespace-nowrap overflow-hidden text-ellipsis"
                }`}
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
      <div className="w-[100%] flex justify-center ">
        <div className="w-[1500px]">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: showSidebar ? "300px" : "0",
              transition: "margin-left 1s ease-in-out",
            }}
          >
            <Box
              sx={{
                display: "flex",
                position: "sticky",
                top: 0,
                pt: 5,
                zIndex: 999,
              }}
            >
              <div className="w-full h-12 flex justify-center items-center ">
                <Box
                  sx={{
                    width: 2 / 4,
                    h: 12,
                    backgroundColor: "#F9FAFB",
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: 100,
                    alignItems: "center",
                    border: "1px solid gray",
                    paddingX: 3,
                  }}
                >
                  <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit(e);
                    }}
                    value={searchInput}
                    className="w-11/12 h-10 outline-none pr-2 bg-gray-50"
                    placeholder="Ask your questions ..."
                  />
                  <TravelExploreOutlined
                    onClick={handleSubmit}
                    sx={{
                      color: searchInput.length ? "#696969" : "#e9e9e9",
                      cursor: searchInput.length ? "pointer" : "text",
                    }}
                  />
                </Box>
              </div>
            </Box>
            {showLoading ? <LoadingPage /> : <Chats customChat={customChat} />}
          </Box>
        </div>
      </div>
      <Box
        sx={{
          mt: 2,
          ml: showSidebar ? "300px" : 0,
          ml: showSidebar ? "300px" : "0",
          transition: "margin-left 1s ease-in-out",
        }}
      >
        <Button
          onClick={footerBtnHandler}
          sx={{
            minWidth: 0,
            width: 24,
            height: 24,
            bgcolor: "white",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            border: 1,
            marginLeft: 3,
            borderColor: "gray",
            padding: 0,
          }}
        >
          {showFooter && (
            <KeyboardDoubleArrowDown sx={{ width: 16, height: 16 }} />
          )}
          {!showFooter && (
            <KeyboardDoubleArrowUp sx={{ width: 16, height: 16 }} />
          )}
        </Button>
        {showFooter ? <Footer /> : <QuestionsAnswer />}
      </Box>
      <div ref={bottomRef} />
    </div>
  );
};

export default Conversation;
