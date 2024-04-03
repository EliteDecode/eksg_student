import React, { useEffect, useState } from "react";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginSchema } from "@/lib/schemas";
import { login, reset } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.studentAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        onClose: () => {
          setSubmitting(false);
        },
      });
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      student_code: "",
      pin: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <Box className="sm:w-[70%] w-[90%] m-auto">
      <Box className="flex items-center justify-center">
        <Typography
          variant="h2"
          className="hr-lines text-primary font-semibold text-[22px]">
          LOGIN
        </Typography>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full space-y-4">
            <Box>
              <Input
                placeholder="Enter your surname"
                name="student_code"
                value={formik.values.student_code}
                onChange={formik.handleChange}
                className="sm:text-[13px] text-[13px]"
                onBlur={formik.handleBlur}
              />
              {formik.touched.student_code && formik.errors.student_code ? (
                <span className="sm:text-[10px] text-[13px] text-red-500 leading-none">
                  (*) {formik.errors.student_code}
                </span>
              ) : null}
            </Box>
            <Box>
              <Input
                placeholder="Enter student access pin"
                name="pin"
                value={formik.values.pin}
                onChange={formik.handleChange}
                className="sm:text-[13px] text-[13px]"
                onBlur={formik.handleBlur}
              />
              {formik.touched.pin && formik.errors.pin ? (
                <span className="sm:text-[10px] text-[13px] text-red-500 leading-none">
                  (*) {formik.errors.pin}
                </span>
              ) : null}
            </Box>

            <Button
              className="w-full"
              type="submit"
              disabled={!formik.isValid || isLoading}>
              {isLoading ? "Please wait..." : "Log In"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
