import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import ReduxFormEditor from './ReduxFormEditor';

const { Header, Content, Footer, Sider } = Layout;

const CreateQuestion = () => {
  return (
      <div>
        <Header className="site-layout-background">Create Question</Header>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <ReduxFormEditor/>
        </div>
      </div>

  );
};

export default CreateQuestion;
