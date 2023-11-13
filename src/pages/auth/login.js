import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import Cool from './cool';
import Cool1 from './cool1';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('accountPassword');
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      phone: '',
      password: '',
      account:'',
      checkNum:'',
      submit: null
    },
    validationSchema: Yup.object({

      account: Yup
        .string()
        .max(255)
        .required('account is required'),
      phone: Yup
        .string()
        .matches(/^1[3-9]\d{9}$/, 'Must be a valid tel') // 正则表达式来验证中国大陆的手机号
        .max(255)
        .required('Phone Number is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),

      checkNumber: Yup
        .string()
        .max(255)
        .required('checkNumber is required'),


    }),
    onSubmit: async (values, helpers) => {
      try {

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  async function handleAccPwd() {
    console.log("co" + formik.values.account + formik.values.password);
    await auth.signIn(formik.values.account, formik.values.password);
    console.log("登录完了跳");
    router.push('/');
  }

  async function handleMess() {
    console.log("执行短信登录" + formik.values.phone + "check : " + formik.values.checkNum);
    console.log("0009"+ formik.values.phone + "   "+  formik.values.checkNum);
    await auth.signInMess(formik.values.phone, formik.values.checkNum);
    console.log("短信登录完了跳");
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>
          Login | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
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
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Account Password"
                value="accountPassword"
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
              />
            </Tabs>
            {method === 'accountPassword' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.account && formik.errors.account)}
                    fullWidth
                    helperText={formik.touched.account && formik.errors.account}
                    label="Account Number"
                    name="account"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="account"
                    value={formik.values.account}
                  />


                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
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
                  onClick={handleAccPwd}
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert>
              </form>
            )}


             {/*短信登录*/}
            {method === 'phoneNumber' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <Cool1  formik={formik} />

                  <TextField
                    error={!!(formik.touched.checkNum && formik.errors.checkNum)}
                    fullWidth
                    helperText={formik.touched.checkNum && formik.errors.checkNum}
                    label="Check Number"
                    name="checkNum"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="account"
                    value={formik.values.checkNum}
                  />



                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
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
                  onClick={handleMess}
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert>
              </form>
            )}
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
