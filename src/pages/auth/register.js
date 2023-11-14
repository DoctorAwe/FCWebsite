import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cool from 'src/pages/auth/cool.js'
import { Progress } from 'antd';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import { useEffect, useState } from 'react';

const Page = () => {
  const  [nameOk, setNameOk] = useState(false);
  const  [passStrength,setPassStrength] = useState(0);
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      tel:'',
      name: '',

      password: '',
      verificationCode:'',
      submit: null,

    },
    validationSchema: Yup.object({

      name: Yup
        .string()
        .max(255)
        .required('Name is required'),

      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      tel: Yup
        .string()
        .matches(/^1[3-9]\d{9}$/, 'Must be a valid Tel') // 正则表达式来验证中国大陆的手机号
        .max(255)
        .required('Tel is required'),
      verificationCode: Yup
        .string()
        .matches(/^[0-9]+$/, 'Must be a valid verification code') // 正则表达式来验证纯数字
        .max(255)
        .required('verification code is required'),




    }),
    onSubmit: async (values, helpers) => {
      try {

        await auth.signUp( formik.values.name, formik.values.password, formik.values.tel, formik.values.verificationCode);
        console.log("注册完了跳");
        router.push('/auth/login'); // 这里进行页面跳转


      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  useEffect(() => {
    console.log("----" + formik.values.name);
    handleAccountChange();
  }, [formik.values.name]);

  useEffect(() =>{
    handlePwdChange();
  }, [formik.values.password])

  useEffect(() =>{
    setPassStrength(countPasswordTypes(formik.values.password));
  }, [formik.values.password])

  const PasswordStrength = ({ strength }) => {
    return (
      <Progress
        percent={strength * 25} // 每个级别 25%
        steps={4}
        strokeColor={['#e74242', '#EFBD47', '#ffa500', '#1bbf1b' ]}
        showInfo={false}

      />
    );
  };


  async function handleAccountChange() {


      console.log("now acc change to " + formik.values.name);

      const url = '/api/user/username_check';
      const data = { 'username': formik.values.name };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resData = await response.json();

      if (resData.code === 1) {
        setNameOk(false);
        console.log("now 用户名不可用：  " + formik.values.name);
        return;
      }

      console.log("now 用户名可用：  " + formik.values.name);
      console.log("响应体: ", resData); // 打印响应体
      setNameOk(true);


  }

  const countPasswordTypes = (password) => {
    return (/\d/.test(password) + /[A-Z]/.test(password) + /[a-z]/.test(password) + /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password));
  };

  function handlePwdChange() {
    console.log("now Pwd change to " + formik.values.password);
    console.log("密码强度 = " + countPasswordTypes(formik.values.password));
  }

  return (
    <>
      <Head>
        <title>
          Register | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={5}>
                <TextField
                  // error={!!(formik.touched.name && formik.errors.name)}
                  error={!!((formik.touched.name && formik.errors.name) || !nameOk)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}

                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.handleChange(event, true); // 保留表单状态更新
                  }}
                  value={formik.values.name}
                />

                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.handleChange(event); // 保留表单状态更新

                  }}
                  type="password"
                  value={formik.values.password}
                />
                  <PasswordStrength sx={{ width: '100%' }} strength={passStrength} />

                <Cool  formik={formik}/>
                <TextField  // 渲染一个Material-UI TextField组件
                  error={!!(formik.touched.verificationCode && formik.errors.verificationCode)}
                  fullWidth
                  helperText={formik.touched.verificationCode && formik.errors.verificationCode}
                  label="verificationCode"
                  name="verificationCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="verificationCode"
                  value={formik.values.verificationCode}
                  style={{padding:0}}

                />

              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
