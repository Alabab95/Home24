import React, { useContext, useEffect, useState } from 'react';
import { Layout } from 'antd';
import HeaderBar from './layout/Header';
import Sidebar from './layout/Sidebar';
import Breadcrumb from './layout/Breadcrumb';
import Footer from './layout/Footer';
import { DataContext } from '../context/data';
import useFournitureSearch from '../utils/useFournitureSearch';
import Announcement from './atoms/announcement';

const { Content } = Layout;
export const App = () => {
  const Context = useContext(DataContext);
  const { querySearch, quantity } = useContext(DataContext);

  const { fournitures, loading } = useFournitureSearch(querySearch, quantity);
  // Context
  useEffect(() => {
    Context.setData(fournitures);
    Context.setLoading(loading);
  }, [fournitures]);

  return (
    <Layout>
      <Announcement />
      <HeaderBar />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb />
        <Sidebar />
      </Content>
      <Footer />
    </Layout>
  );
};