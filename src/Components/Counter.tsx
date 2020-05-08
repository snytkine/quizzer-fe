import React from 'react';
import { Card } from 'antd';
import { Button } from 'antd';

const Counter = () => {

  return (
      <div className="site-card-border-less-wrapper">
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
          <Button type="primary" block onClick={() => alert('BOO')}>
            Increment Counter
          </Button>

        </Card>
      </div>
  )
};

export default Counter;
