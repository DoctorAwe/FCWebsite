// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Divider,
//   Typography
// } from '@mui/material';
// import { useEffect, useState } from 'react';
//
//
//
//
//
//
//
// const [user, setUser] = useState({
//   avatar: '/assets/avatars/avatar-anika-visser.png',
//   city: 'Los Angeles',
//   country: 'USA1111',
//   jobTitle: 'Senior Developer',
//   name: 'Anika Visser11111111111111',
//   timezone: 'GTM-7'
// });
//
// export const AccountProfile = () => (
//
//
//
//
//   useEffect(async () => {
//     // 登陆成功后请求用户信息
//     try {
//       console.log('正在请求用户信息');
//       const url2 = '/api/user/user_info';
//       const data = {};
//
//       const response2 = await fetch(url2, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//
//       const responseData2 = await response2.json(); // 转换响应为 JSON 格式
//       console.log('user_info Data.code:', responseData2.code); // 输出响应信息
//       if (responseData2.code !== 0) {
//         throw new Error('userinfo failed');
//
//       }
//       // 成功则继续
//
//       console.log("成功获取用户信息" );
//
//
//       window.sessionStorage.setItem('authenticated', 'true');
//
//       // dispatch({
//       //   type: HANDLERS.SIGN_IN,
//       //   payload: user
//       // });
//
//     } catch (err) {
//       console.error(err);
//     }
//   }, []),
//
//
//
//   <Card>
//     <CardContent>
//       <Box
//         sx={{
//           alignItems: 'center',
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         <Avatar
//           src={user.avatar}
//           sx={{
//             height: 80,
//             mb: 2,
//             width: 80
//           }}
//         />
//         <Typography
//           gutterBottom
//           variant="h5"
//         >
//           {user.name}
//         </Typography>
//         <Typography
//           color="text.secondary"
//           variant="body2"
//         >
//           {user.city} {user.country}
//         </Typography>
//         <Typography
//           color="text.secondary"
//           variant="body2"
//         >
//           {user.timezone}
//         </Typography>
//       </Box>
//     </CardContent>
//     <Divider />
//     <CardActions>
//       <Button
//         fullWidth
//         variant="text"
//       >
//         Upload picture
//       </Button>
//     </CardActions>
//   </Card>
// );


import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

export const AccountProfile = () => {
  // 在组件内部使用 useState
  const [user, setUser] = useState({
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA1111',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser11111111111111',
    timezone: 'GTM-7'
  });

  useEffect(() => {
    // 在组件内部使用 useEffect
    const fetchData = async () => {
      try {
        console.log('正在请求用户信息');
        const url2 = '/api/user/user_info';
        const data = {};

        const response2 = await fetch(url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const responseData2 = await response2.json();
        console.log('user_info Data.code:', responseData2.code);
        if (responseData2.code !== 0) {
          throw new Error('userinfo failed');
        }

        console.log("成功获取用户信息");

        window.sessionStorage.setItem('authenticated', 'true');

        // 在这里更新用户状态
        setUser((prevUser) => ({
          ...prevUser,

          name: responseData2.data.username,
          id: responseData2.data.id,
          avatar: responseData2.data.avatar,


        }));
        console.log("179 " + responseData2.data.username);


        // dispatch({
        //   type: HANDLERS.SIGN_IN,
        //   payload: user
        // });

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); // 注意：这里是空数组，表示只在组件挂载时执行

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.city} {user.country}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
