import { Box, Grid, Typography, Link, Container, Divider } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter, X } from "@mui/icons-material";
import Aktuelles from "../../assets/Images/Aktuelles_QR-code.png";

const Footer = () => {
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
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Questions and answers will be recorded for scientific purposes.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ pb: 1 }}
          >
            Die Fragen und Antworten werden zu wissenschaftlichen Zwecken
            aufgezeichnet.
          </Typography>
          <Divider />
        </Box>
        <Container disableGutters>
          <Grid container spacing={1} justifyContent={"center"}>
            {/* About Us */}
            <Grid item xs={12} sm={4} md={5}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>LLM Developer:</strong> Stephan Playfair
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Frontend developer:</strong> Iman Bajalan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"Copyright © "}
                <Link
                  color="inherit"
                  href="https://wald-reallabor.de/"
                  target="_blank"
                >
                  ADAPT-Wald-Holz
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Grid>

            {/* Contact Us */}
            <Grid item xs={12} sm={4} md={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Us
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                Hochschule für nachhaltige Entwicklung Eberswalde
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                Schicklerstr. 5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                16225 Eberswalde
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 11 }}
              >
                <strong>Email:</strong> Stephan.Playfair@zalf.de
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong> Phone:</strong> +49 3334 657 414
              </Typography>
            </Grid>

            {/* Follow Us */}
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <img src={Aktuelles} className="w-20 h-20" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href="https://www.linkedin.com/company/adapt-wald-holz/posts/?feedView=all"
                    color="primary"
                    target="_blank"
                  >
                    <LinkedIn />
                  </Link>
                  <Link
                    href="https://www.instagram.com/"
                    color="error"
                    target="_blank"
                  >
                    <Instagram />
                  </Link>
                  <Link
                    href="https://www.twitter.com/"
                    color="inherit"
                    target="_blank"
                  >
                    <X />
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Copyright */}
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
