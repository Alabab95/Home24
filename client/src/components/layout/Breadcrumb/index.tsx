import React from 'react';
import { Breadcrumb as BreadcrumbLayout} from 'antd';


const Breadcrumb = () => {
  return (
    <BreadcrumbLayout style={{ margin: '16px 0' }}>
        <BreadcrumbLayout.Item>Home</BreadcrumbLayout.Item>
        <BreadcrumbLayout.Item>List</BreadcrumbLayout.Item>
        <BreadcrumbLayout.Item>App</BreadcrumbLayout.Item>
      </BreadcrumbLayout>
  )
}

export default Breadcrumb