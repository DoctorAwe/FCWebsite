import React from 'react';



const ServiceProviderListComponent = ({ serviceProviders, selectedProvider, onProviderClick }) => {
  const listItemStyle = {
    cursor: 'pointer',
    padding: '8px',
    transition: 'background-color 0.3s',
  };

  return (
    <div>
      <h2>当前节点服务商列表</h2>
      <ul>
        {serviceProviders.map((provider) => (
          <li
            key={provider.id}  // 假设服务商对象中有一个id属性
            onClick={() => onProviderClick(provider)}
            style={{
              ...listItemStyle,
              backgroundColor: selectedProvider && selectedProvider.id === provider.id ? '#a7c0cd' : 'transparent',
              color: selectedProvider && selectedProvider.id === provider.id ? 'white' : 'black',
            }}
          >
            {provider.name} {/* 假设服务商对象中有一个name属性 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceProviderListComponent;

