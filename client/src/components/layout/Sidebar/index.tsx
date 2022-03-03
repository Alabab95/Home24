import React, { useContext, useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import ArticleList from '../../organisms/ArticlesList'
import { Category } from '../../../types';
import Loader from '../../atoms/loader';
import { DataContext } from '../../../context/data';
const {  Content, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {

    const [selectedCategory,setSelectedCategory] = useState('');
    const [categories,setCategories] = useState<Category[]>([]);

    // Context
    const {data} = useContext(DataContext);
    
    
    useEffect(()=>{
        if(data){
            setCategories(data.data.categories)
        }
    },[data]);
 
    const handleClick = (name : string) =>{
        setSelectedCategory(name);
    }
  return (
    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            {categories.length ? (
            <ul>
              {categories[0].childrenCategories.map(({ name, urlPath }) => {
                return (
                    
                    <a href={`/${urlPath}`}>
                        <SubMenu key="sub1" icon={<UserOutlined />} title={name} onTitleClick={() => handleClick(name)}/>     
                    </a>
                  
                );
              })}
            </ul>
          ) : (
            <Loader />
          )}
        
            
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div className='content1'>
            <ArticleList categoryName={selectedCategory}/>
          </div>
            
        </Content>
        
      </Layout>
  )
}

export default Sidebar