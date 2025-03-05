import { Box, styled } from "@mui/material";

export const InnerWrapper = styled(Box)(({ theme }) => ({
  width: '70%',
  margin: '0 auto',
  padding: '26px 0 25px 10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '89%',
  },
}));