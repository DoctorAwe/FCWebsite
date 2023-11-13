


import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { Button } from 'antd';

function YourComponent({ formik }) {
  const [cooldownActive, setCooldownActive] = useState(false);
  const [countdown, setCountdown] = useState(60); // 初始化倒计时为60秒

  async function handleButtonClick() {
    if (!cooldownActive) {
      let count = 60;

      const startCountdown = () => {
        setCooldownActive(true);
        setCountdown(count);
        const interval = setInterval(() => {
          count -= 1;
          setCountdown(count);

          if (count === 0) {
            setCooldownActive(false);
            clearInterval(interval);
          }
        }, 1000);
      };

      startCountdown(); // 开始倒计时

      const url = '/api/user/send_token';
      const data = { telNumber:formik.values.phone};
      console.log("短信登录发码...tel: " + formik.values.phone);

      try {
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

        const responseData = await response.json();
        console.log('Received data:', responseData);
        // 处理接收到的数据
      } catch (error) {
        console.error('An error occurred:', error);
        // 处理发送验证码失败的情况
        setCooldownActive(false);
        setCountdown(0); // 若发送失败，将倒计时设置为0
      }
    }
  }





  return (
    <TextField
      error={!!(formik.touched.phone && formik.errors.phone)}
      fullWidth
      helperText={formik.touched.phone && formik.errors.phone}
      label="Phone Number"
      name="phone"
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      type="tel"
      value={formik.values.phone}
      InputProps={{
        endAdornment: (
          <Button
            onClick={handleButtonClick}
            fullWidth
            variant="contained"
            style={{ width: '30%' }}
            disabled={cooldownActive}
          >
            {cooldownActive ? `Cooldown: ${countdown}s` : 'Verification'}
          </Button>
        ),
      }}
    />
  );
}

export default YourComponent;
