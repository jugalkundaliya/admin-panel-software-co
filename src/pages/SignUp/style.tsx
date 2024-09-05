import { Box, Button, styled, Link } from "@mui/material";
import Input from "../../components/Input";

type PasswordInputProps = {
  password: boolean;
};
export const Container = styled(Box)(({ theme }) => ({
  textAlign: "center",
  background: theme.palette.white.main,
  borderRadius: 4,
  padding: theme.spacing(8),
  width: 720,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  "& a": {
    cursor: "pointer",
  },
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "start",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

export const ForgotPasswordLink = styled(Link)(() => ({
  textDecoration: "none",
  position: "absolute",
  right: 0,
  lineHeight: 1,
}));

export const PasswordInput = styled(Input)<PasswordInputProps>(
  ({ password, theme }) => ({
    ...(password && {
      input: {
        fontSize: "36px",
        letterSpacing: "12px",
        padding: theme.spacing(0.25, 1.75),
      },
    }),
  })
);

export const SignInButton = styled(Button)({
  width: "65%",
  alignSelf: "center",
  textTransform: "none",
});
