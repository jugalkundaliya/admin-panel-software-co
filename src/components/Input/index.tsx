import React from "react";
import { TextField, Box, Typography, BaseTextFieldProps } from "@mui/material";

type InputProps = BaseTextFieldProps & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
};

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  ...rest
}: InputProps) => {
  return (
    <Box sx={{ width: "100%", textAlign: "start" }}>
      {label && (
        <Typography variant="body1" sx={{ marginBottom: 1.5 }}>
          {label}
        </Typography>
      )}
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        {...rest}
        sx={{ width: "100%", ...rest.sx }}
      />
    </Box>
  );
};

export default Input;
