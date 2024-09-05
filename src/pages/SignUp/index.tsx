import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import routes from "../../constants/routes";
import {
  Container,
  ForgotPasswordLink,
  InputContainer,
  PasswordInput,
  SignInButton,
} from "./style";
import { signUpSchema } from "../../utils/schema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

type FormValues = {
  email: string;
  username: string;
  password: string;
};

const SingUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setErrorMessage(null);

    dispatch(
      signup({
        email: data.email,
        username: data.username,
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
      <Typography variant="h4">Create an Account</Typography>
      <Typography>Create an account to continue</Typography>
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

      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Username"
            placeholder="Username"
            error={!!errors.username}
            helperText={errors.username?.message}
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
        {loading ? <CircularProgress /> : "Sign Up"}
      </SignInButton>

      <Typography>
        Already have an account? <Link href={routes.LOGIN}>Login</Link>
      </Typography>
    </Container>
  );
};

export default SingUp;
