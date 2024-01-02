import React, { useState, useEffect } from 'react';

const ServiceProviderDetailComponent = ({ selectedProvider, onBackClick, onConfirmClick}) => {
  const [serviceProviderInfo, setServiceProviderInfo] = useState(null);

  // 模拟加载服务商信息的方法
  const loadServiceProviderInfo = (serviceProvider) => {
    // 这里可以调用实际的API或异步函数来加载服务商信息
    // 这里使用setTimeout模拟异步加载
    setTimeout(() => {
      // 模拟服务商信息
      const info = {
        name: serviceProvider.name,
        id:serviceProvider.id,
      };
      setServiceProviderInfo(info);
    }, 10); // 模拟加载延迟
  };

  // 当选择的服务商发生变化时加载服务商信息
  useEffect(() => {
    if (selectedProvider) {
      loadServiceProviderInfo(selectedProvider);
    }
  }, [selectedProvider]);

  return (
    <div>
      <button onClick={onBackClick}>返回列表</button>
      {serviceProviderInfo ? (
        <div>
          <h2>当前选择的服务商信息</h2>
          <p>服务商名称: {serviceProviderInfo.name}</p>
          {/* 显示其他服务商信息 */}
        </div>
      ) : (
        <p>加载中...</p>
      )}
      <button onClick={() => onConfirmClick(selectedProvider)}>确认选择</button>
    </div>
  );
};

export default ServiceProviderDetailComponent;
