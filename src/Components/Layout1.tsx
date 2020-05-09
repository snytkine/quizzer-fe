import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Routes, Route, Link } from 'react-router-dom';
import CreateQuestion from './editor/CreateQuestion';
import QuizList from './quiz/list';
import Counter from './Counter';
import { QuestionEditor } from './editor/QuestionEditor';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class Layout1 extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (

          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className="logo"/>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                  <Link to="quiz">Quizzes</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="Editor">
                  <Menu.Item key="12">
                    <Link to="editor">Create Question</Link>
                  </Menu.Item>
                  <Menu.Item key="13">
                    <Link to="aformeditor">Question Editor</Link>
                  </Menu.Item>
                  <Menu.Item key="14">
                    <Link to="counter">Counter</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}/>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Content style={{ margin: '0 16px' }}>
                <Routes>
                  <Route path="editor" element={<CreateQuestion/>}/>
                  <Route path="aformeditor" element={<QuestionEditor/>}/>
                  <Route path="quiz" element={<QuizList/>}/>
                  <Route path="counter" element={<Counter/>}/>
                </Routes>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Copyleft</Footer>
            </Layout>
          </Layout>

    );
  }
}
