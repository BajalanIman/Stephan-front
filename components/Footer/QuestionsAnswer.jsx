import { Box, Typography } from "@mui/material";

const QuestionsAnswer = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        py: 1,
        borderTop: 1,
        borderTopColor: "gray",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "800px" }}>
        <Box>
          <Typography variant="body2" color="text.secondary" align="center">
            Questions and answers will be recorded for scientific purposes.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Die Fragen und Antworten werden zu wissenschaftlichen Zwecken
            aufgezeichnet.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionsAnswer;
