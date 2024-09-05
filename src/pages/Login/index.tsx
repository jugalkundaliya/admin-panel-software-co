import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Input from "../../components/Input";
import routes from "../../constants/routes";
import {
  Container,
  ForgotPasswordLink,
  InputContainer,
  PasswordInput,
  SignInButton,
} from "../SignUp/style";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "../../utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setErrorMessage(null);

    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then(() => {
        localStorage.setItem("user", JSON.stringify({ email: data.email }));
        navigate(routes.DASHBOARD);
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Typography variant="h4">Login to Account</Typography>
      <Typography>Please enter your email and password to continue</Typography>
      {errorMessage && (
        <Alert variant="outlined" severity="error">
          {errorMessage}
        </Alert>
      )}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email Address"
            placeholder="Enter email address"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <InputContainer>
        <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Password"
              type="password"
              placeholder="Enter your password"
              password={!!field.value}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <FormControlLabel control={<Checkbox />} label="Remember Password" />
      </InputContainer>
      <SignInButton
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : "Sign In"}
      </SignInButton>
      <Typography>
        Don't have an account? <Link href={routes.SIGN_UP}>Create Account</Link>
      </Typography>
    </Container>
  );
};

export default Login;
