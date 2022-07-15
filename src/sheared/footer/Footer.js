import { Box, Container, Link as MuiLink, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href="https://mui.com/">
        Build Api
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: 30 }}>
      <Container>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Build Api
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </Container>
    </Container>
  );
};

export default Footer;
