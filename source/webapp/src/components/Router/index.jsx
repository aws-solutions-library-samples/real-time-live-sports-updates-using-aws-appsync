import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import App from '../../App';
import Game from '../Game';

const { Header, Content, Footer } = Layout;

const Routing = (
  
 <Router>
    <Layout className="layout">
    <Header>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
    </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
    </Breadcrumb>
    <div className="site-layout-content">
        <Route exact path="/" component={App} />
        <Route exact path="/games/:gameId" component={Game} />
    </div>
    </Content>
    <Footer style={{ textAlign: 'center', backgroundColor: '#333', color:'white' }}>Real-time Live Sports Updates Using AWS AppSync</Footer>
    </Layout>
</Router> 
);

export default Routing;
