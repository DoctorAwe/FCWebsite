//
// import React, { useEffect, useState } from 'react';
// import { Space, Table, Tag, Button, Modal, Input, message, Select, Col, Row } from 'antd';
// import Router from 'next/router';
//
// const { Column } = Table;
//
// const App = () => {
//   const classification = useState('');
//   const [data, setData] = useState([
//     {
//       key: '1',
//       firstName: 'John',
//       lastName: 'Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//       createdAt: new Date().toLocaleString(),
//     },
//     // Add more initial data as needed
//   ]);
//   const [optionMap, setOptionMap] = useState(new Map());
//   const [flattenData, setFlattenData] = useState({});
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [tag1,setTag1] = useState([]);
//   const [tag2,setTag2] = useState([]);
//   const [orin, setOrin] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [tag1Options, setTag1Options] = useState([
//     { value: 'tag1-option1', label: 'Tag 1 Option 1' },
//     { value: 'tag1-option2', label: 'Tag 1 Option 2' },
//     // 添加更多选项
//   ]);
//
//   const [tag2Options, setTag2Options] = useState([
//     { value: 'tag2-option1', label: 'Tag 2 Option 1' },
//     { value: 'tag2-option2', label: 'Tag 2 Option 2' },
//     // 添加更多选项
//   ]);
//
//   const [newData, setNewData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     address: '',
//     tags: [],
//     createdAt: new Date().toLocaleString(),
//     tag1: '',
//     tag2: '',
//
//   });
//
//
//
//   const showModal = () => {
//
//
//
//
//   console.log(options);
//     setIsModalVisible(true);
//     setNewData({
//       firstName: '',
//       lastName: '',
//       age: '',
//       address: '',
//       tags: [],
//       createdAt: new Date().toLocaleString(),
//     });
//   };
//
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     // 重置弹出框的数据
//     setNewData({
//       firstName: '',
//       lastName: '',
//       age: '',
//       address: '',
//       tags: [],
//       createdAt: new Date().toLocaleString(),
//     });
//   };
//
//   const handleOk = async () => {
//
//     console.log("这是opmap   " + optionMap.size);
//     const newTitle = newData.firstName;
//
//     // 检查当前标题是否和已有的标题重复
//     if (data.some(item => item.firstName === newTitle)) {
//       message.error('标题重复，请更换标题');
//       return;
//     }
//
//     const newKey = (Math.max(...data.map((item) => parseInt(item.key, 10))) + 1).toString();
//     console.log("要显示了 number" + newData.tag2);
//     console.log(flattenData.data + "0000");
//     console.log("要显示了 str" + flattenData[parseInt(newData.tag2)]);
//     // 将tag1和tag2的值加入tags数组，过滤掉undefined值
//     const formattedData = {
//       key: newKey,
//       ...newData,
//
//       tags: [flattenData[parseInt(newData.tag2)]],
//
//     };
//
//     setData([...data, formattedData]);
//     setIsModalVisible(false);
//
//
//
//     // 创建表请求
//     const url = '/api/user/create_flowchart';
//
//     const data2 = {
//       name: newData.firstName,
//       description: newData.address,
//       content: '{"nodes":[{"width":150,"height":40,"id":"0","type":"input","data":{"label":"Node"},"position":{"x":0,"y":50},"dd":45125,"className":".react-flow__node","positionAbsolute":{"x":0,"y":50}}],"edges":[],"viewport":{"x":361,"y":216.1888888888889,"zoom":1.6044444444444443}}',
//       sub_industry: newData.tag2
//     };
//
//     console.log("data2" + JSON.stringify(data2));
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data2),
//     });
//
//     const responseData = await response.json(); // 转换响应为 JSON 格式
//     console.log("创建flowchart 响应msg: " + responseData.msg);
//     if (responseData.code !== 0) {
//       throw new Error('Create flowchart response was not ok');
//     }
//
//     // 重置弹出框的数据
//     setNewData({
//       firstName: '',
//       lastName: '',
//       age: '',
//       address: '',
//       tags: [],
//       createdAt: new Date().toLocaleString(),
//       tag1: '',
//       tag2: '',
//     });
//
//     // 跳转
//     // Router.push('/test').then(r => {});
//
//   };
//
//   // 请求当前用户流程图管理表
//   async function chartRequest() {
//     try {
//       console.log("管理表请求了");
//       const url = '/api/user/get_flowchart';
//       const data2 = {};
//
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data2),
//       });
//
//       const responseData = await response.json();
//
//       console.log("完整的响应数据:", responseData);
//
//       if (responseData.code !== 0) {
//         throw new Error('请求流程图响应不正确');
//       }
//
//       if (responseData.data && responseData.data.length > 0) {
//         // 遍历每个元素，打印 content、name、description 和 date
//         responseData.data.forEach((item) => {
//           const { content, name, description, date } = item;
//           console.log("内容:", content);
//           console.log("姓名:", name);
//           console.log("描述:", description);
//           console.log("日期:", date);
//         });
//       } else {
//         console.error('在 responseData.data 中未找到数据');
//       }
//
//       console.log("请求管理表响应code：  " + responseData.code + "请求管理表数据响应msg: " + responseData.msg);
//     } catch (error) {
//       console.error('获取数据时出错:', error);
//     }
//
//     // try {
//     //   console.log("管理表请求了");
//     //   const url = '/api/user/get_flowchart';
//     //   const data2 = {};
//     //
//     //   const response = await fetch(url, {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(data2),
//     //   });
//     //
//     //   const responseData = await response.json();
//     //
//     //   if (responseData.code !== 0) {
//     //     throw new Error('请求流程图响应不正确');
//     //   }
//     //
//     //   console.log("完整的响应数据:", JSON.stringify(responseData, null, 2));
//     //
//     //   // 检查 responseData.data 是否已定义且至少有一个元素
//     //   if (responseData.data && responseData.data.length > 0) {
//     //     const { content, name, description, date } = responseData.data[0];
//     //
//     //     // 打印键值对
//     //     console.log("内容:", content);
//     //     console.log("姓名:", name);
//     //     console.log("描述:", description);
//     //     console.log("日期:", date);
//     //     console.log("管理表数据" + responseData['data'].value('name').toString());
//     //   } else {
//     //     console.error('在 responseData.data 中未找到数据');
//     //   }
//     //
//     //   console.log("请求管理表响应code：  " + responseData.code + "请求管理表数据响应msg: " + responseData.msg);
//     // } catch (error) {
//     //   console.error('获取数据时出错:', error);
//     // }
//
//   }
//
//   // 初始化管理表
//   useEffect(() => {
//     // 定义一个异步函数，用于从 Web 请求获取数据
//     const fetchData = async () => {
//       try {
//         // 调用你的函数来获取键值对数组
//         const result = await chartRequest();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//
//     fetchData();
//   }, []); // 空数组作为依赖，确保只在组件挂载时调用一次
//
//
//
//
//
//
//
//     const handleChange = (e, key) => {
//     setNewData({
//       ...newData,
//       [key]: e.target.value,
//     });
//   };
//
//   const handleTagsChange = (e) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim());
//     setNewData({
//       ...newData,
//       tags: tags,
//     });
//   };
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/industry/get-all');
//         const data = await response.json();
//         setOrin(data);
//         // 在控制台中打印每个行业的名称
//         data.data.forEach(industry => {
//           setOptions(prevOptions => ({
//             ...prevOptions,
//             [industry.id]: industry.name,
//           }));
//         });
//
//         const jsonData = data;
//
//         function flattenCategory(category) {
//           flattenData[category.id] = category.name;
//
//           if (category.sub_list) {
//             category.sub_list.forEach(subCategory => {
//               flattenCategory(subCategory);
//             });
//           }
//         }
//
//         jsonData.data.forEach(category => {
//           flattenCategory(category);
//         });
//
//         console.log("刚完事" + flattenData[53]);
//
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//
//     fetchData();
//
//   }, []);
//
//
//
//   useEffect(() => {
//     // 假设 options 已经包含了行业数据
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/industry/get-all');
//         const data = await response.json();
//         setOrin(data);
//
//         const newTag1Options = Object.keys(options).map(id => ({
//           value: id,
//           label: options[id],
//         }));
//
//         setTag1Options(newTag1Options);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//
//     fetchData();
//   }, [options]);
//
//
//   function handleTag1Change(value) {
//     console.log("现在第一个框里选的" + value);
//     setTag1(value);
//
//     // 从 orin 中获取选项数据
//     const selectedIndustry = orin.data.find(industry => industry.id.toString() === value);
//     if (selectedIndustry) {
//       // 将 sub_list 转换为 tag2Options 格式
//       const tag2OptionsData = selectedIndustry.sub_list.map(subItem => ({
//         value: subItem.id.toString(),
//         label: subItem.name,
//       }));
//
//       // 更新 tag2Options
//       setTag2Options(tag2OptionsData);
//     }
//
//     // 更新 newData
//     setNewData({
//       ...newData,
//       tag1: value,
//     });
//
//   }
//
//   function handleTag2Change(value) {
//     console.log("2中选的是"+ value);
//     setTag2(value);
//     setNewData({
//       ...newData,
//       tag2: value,
//     });
//   }
//
//   return (
//     <div>
//       <Button onClick={showModal}>Add Data</Button>
//       <Table dataSource={data}>
//         <Column title="Map Title" dataIndex="firstName" key="firstName" />
//         <Column title="Creation Time" dataIndex="createdAt" key="createdAt" />
//         <Column title="Explain" dataIndex="address" key="address" />
//         <Column
//           title="Tags"
//           dataIndex="tags"
//           key="tags"
//           render={(tags) => (
//             <>
//               {tags.map((tag) => (
//                 <Tag color="blue" key={tag}>
//                   {tag}
//                 </Tag>
//               ))}
//             </>
//           )}
//         />
//         <Column
//           title="Action"
//           key="action"
//           render={(_, record) => (
//             <Space size="middle">
//               <a onClick={() => console.log(`Inviting ${record.lastName}`)}>Invite {record.lastName}</a>
//               <a onClick={() => setData(data.filter(item => item.key !== record.key))}>Delete</a>
//             </Space>
//           )}
//         />
//       </Table>
//
//       <Modal
//         title="Add Data"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Ok"
//         cancelText="Cancel"
//       >
//         <div style={{ marginBottom: '10px' }}>
//           <span>Map Title:</span>
//           <Input placeholder="Map Title" onChange={(e) => handleChange(e, 'firstName')} value={newData.firstName} />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <span>Creation Time:</span>
//           <Input value={newData.createdAt} disabled />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <span>Explain:</span>
//           <Input placeholder="Explain" onChange={(e) => handleChange(e, 'address')} value={newData.address} />
//         </div>
//         <div>
//           <span>Tags:</span>
//           <Row gutter={8}>
//             <Col span={12}>
//               <Select value={newData.tag1} onChange={handleTag1Change} style={{ width: '100%' }}>
//                 {tag1Options.map(option => (
//                   <Option key={option.value} value={option.value}>
//                     {option.label}
//                   </Option>
//                 ))}
//               </Select>
//             </Col>
//
//             <Col span={12}>
//               <Select value={newData.tag2} onChange={handleTag2Change} style={{ width: '100%' }}>
//                 {tag2Options.map(option => (
//                   <Option key={option.value} value={option.value}>
//                     {option.label}
//                   </Option>
//                 ))}
//               </Select>
//             </Col>
//
//           </Row>
//
//         </div>
//       </Modal>
//     </div>
//   );
// };
//
// export default App;
//
//
//
//
//





import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Modal, Input, message, Select, Col, Row } from 'antd';
import Router from 'next/router';

const { Column } = Table;

const App = () => {
  const classification = useState('');
  const [data, setData] = useState([
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      createdAt: new Date().toLocaleString(),
    },
    // Add more initial data as needed
  ]);

  const [optionMap, setOptionMap] = useState(new Map());
  const [flattenData, setFlattenData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tag1,setTag1] = useState([]);
  const [tag2,setTag2] = useState([]);
  const [orin, setOrin] = useState([]);
  const [options, setOptions] = useState([]);
  const [tag1Options, setTag1Options] = useState([
    { value: 'tag1-option1', label: 'Tag 1 Option 1' },
    { value: 'tag1-option2', label: 'Tag 1 Option 2' },
    // 添加更多选项
  ]);

  const [tag2Options, setTag2Options] = useState([
    { value: 'tag2-option1', label: 'Tag 2 Option 1' },
    { value: 'tag2-option2', label: 'Tag 2 Option 2' },
    // 添加更多选项
  ]);

  const [newData, setNewData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    tags: [],
    createdAt: new Date().toLocaleString(),
    tag1: '',
    tag2: '',

  });



  const showModal = () => {
    console.log(options);
    setIsModalVisible(true);
    setNewData({
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      tags: [],
      createdAt: new Date().toLocaleString(),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // 重置弹出框的数据
    setNewData({
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      tags: [],
      createdAt: new Date().toLocaleString(),
    });
  };

  const handleOk = async () => {

    console.log("这是opmap   " + optionMap.size);
    const newTitle = newData.firstName;

    // 检查当前标题是否和已有的标题重复
    if (data.some(item => item.firstName === newTitle)) {
      message.error('标题重复，请更换标题');
      return;
    }

    const newKey = (Math.max(...data.map((item) => parseInt(item.key, 10))) + 1).toString();
    console.log("要显示了 number" + newData.tag2);
    console.log(flattenData.data + "0000");
    console.log("要显示了 str" + flattenData[parseInt(newData.tag2)]);
    // 将tag1和tag2的值加入tags数组，过滤掉undefined值
    const formattedData = {
      key: newKey,
      ...newData,

      tags: [flattenData[parseInt(newData.tag2)]],

    };

    setData([...data, formattedData]);
    setIsModalVisible(false);



    // 创建表请求
    const url = '/api/user/create_flowchart';

    const data2 = {
      name: newData.firstName,
      description: newData.address,
      content: '{"nodes":[{"width":150,"height":40,"id":"0","type":"input","data":{"label":"Node"},"position":{"x":0,"y":50},"dd":45125,"className":".react-flow__node","positionAbsolute":{"x":0,"y":50}}],"edges":[],"viewport":{"x":361,"y":216.1888888888889,"zoom":1.6044444444444443}}',
      sub_industry: newData.tag2,
      time:newData.createdAt.toString(),
    };

    console.log("data2" + JSON.stringify(data2));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data2),
    });

    const responseData = await response.json(); // 转换响应为 JSON 格式
    console.log("创建flowchart 响应msg: " + responseData.msg);
    if (responseData.code !== 0) {
      throw new Error('Create flowchart response was not ok');
    }

    // 重置弹出框的数据
    setNewData({
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      tags: [],
      createdAt: new Date().toLocaleString(),
      tag1: '',
      tag2: '',
    });

    // 跳转
    // Router.push('/test').then(r => {});

  };

  // 请求当前用户流程图管理表
  async function chartRequest() {

    try {
      console.log("管理表请求了");
      const url = '/api/user/get_flowchart';
      const data2 = {};

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      });

      const responseData = await response.json();

      console.log("完整的响应数据:", responseData);

      if (responseData.code !== 0) {
        throw new Error('请求流程图响应不正确');
      }

      let resultArray = [];

      if (responseData.data && responseData.data.length > 0) {
        // 遍历每个元素，将修改后的键值对组成一个数组
        resultArray = responseData.data.map((item) => {
          const field =  item.field.name;
          const {id, name, date, description } = item;
          return {
            key:id,
            firstName: name,
            createdAt: date,
            address: description,
            tags: [field], // 添加额外的键值对
          };
        });
      } else {
        console.error('在 responseData.data 中未找到数据');
      }

      console.log("请求管理表响应code：  " + responseData.code + "请求管理表数据响应msg: " + responseData.msg);

      return resultArray; // 将组装好的数组作为返回值
    } catch (error) {
      console.error('获取数据时出错:', error);
      return []; // 如果出错，返回一个空数组或其他你认为合适的默认值
    }

  }

  // 初始化管理表
  useEffect(() => {
    // 定义一个异步函数，用于从 Web 请求获取数据
    const fetchData = async () => {
      try {
        // 调用你的函数来获取键值对数组
        const result = await chartRequest();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data.length]); // 空数组作为依赖，确保只在组件挂载时调用一次


  const handleChange = (e, key) => {
    setNewData({
      ...newData,
      [key]: e.target.value,
    });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setNewData({
      ...newData,
      tags: tags,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/industry/get-all');
        const data = await response.json();
        setOrin(data);
        // 在控制台中打印每个行业的名称
        data.data.forEach(industry => {
          setOptions(prevOptions => ({
            ...prevOptions,
            [industry.id]: industry.name,
          }));
        });

        const jsonData = data;

        function flattenCategory(category) {
          flattenData[category.id] = category.name;

          if (category.sub_list) {
            category.sub_list.forEach(subCategory => {
              flattenCategory(subCategory);
            });
          }
        }

        jsonData.data.forEach(category => {
          flattenCategory(category);
        });

        console.log("刚完事" + flattenData[53]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);



  useEffect(() => {
    // 假设 options 已经包含了行业数据
    const fetchData = async () => {
      try {
        const response = await fetch('/industry/get-all');
        const data = await response.json();
        setOrin(data);

        const newTag1Options = Object.keys(options).map(id => ({
          value: id,
          label: options[id],
        }));

        setTag1Options(newTag1Options);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [options]);


  function handleTag1Change(value) {
    console.log("现在第一个框里选的" + value);
    setTag1(value);

    // 从 orin 中获取选项数据
    const selectedIndustry = orin.data.find(industry => industry.id.toString() === value);
    if (selectedIndustry) {
      // 将 sub_list 转换为 tag2Options 格式
      const tag2OptionsData = selectedIndustry.sub_list.map(subItem => ({
        value: subItem.id.toString(),
        label: subItem.name,
      }));

      // 更新 tag2Options
      setTag2Options(tag2OptionsData);
    }

    // 更新 newData
    setNewData({
      ...newData,
      tag1: value,
    });

  }

  function handleTag2Change(value) {
    console.log("2中选的是"+ value);
    setTag2(value);
    setNewData({
      ...newData,
      tag2: value,
    });
  }

  const handleDelete = (recordKey) => {
    console.log("删除了 " + recordKey);
    setData(data.filter(item => item.key !== recordKey));


  };

  return (
    <div>
      <Button onClick={showModal}>Add Data</Button>
      <Table dataSource={data}>
        <Column title="Map Title" dataIndex="firstName" key="firstName" />
        <Column title="Creation Time" dataIndex="createdAt" key="createdAt" />
        <Column title="Explain" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => console.log(`Inviting ${record.lastName}`)}>edit {record.lastName}</a>
              {/*<a onClick={() => setData(data.filter(item => item.key !== record.key))}>Delete</a>*/}
              <a onClick={() => handleDelete(record.key)}>Delete</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Add Data"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ok"
        cancelText="Cancel"
      >
        <div style={{ marginBottom: '10px' }}>
          <span>Map Title:</span>
          <Input placeholder="Map Title" onChange={(e) => handleChange(e, 'firstName')} value={newData.firstName} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span>Creation Time:</span>
          <Input value={newData.createdAt} disabled />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span>Explain:</span>
          <Input placeholder="Explain" onChange={(e) => handleChange(e, 'address')} value={newData.address} />
        </div>
        <div>
          <span>Tags:</span>
          <Row gutter={8}>
            <Col span={12}>
              <Select value={newData.tag1} onChange={handleTag1Change} style={{ width: '100%' }}>
                {tag1Options.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col span={12}>
              <Select value={newData.tag2} onChange={handleTag2Change} style={{ width: '100%' }}>
                {tag2Options.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Col>

          </Row>

        </div>
      </Modal>
    </div>
  );
};

export default App;





