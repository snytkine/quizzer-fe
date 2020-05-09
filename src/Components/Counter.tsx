import React from 'react';
import { Card } from 'antd';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from '../store/actiontypes';

const mapStateToProps = (state: { counter: number }) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  increment: () => dispatch({ type: ActionType.INCREMENT_COUNTER }),
  decrement: () => dispatch({ type: ActionType.DECREMENT_COUNTER }),
});

export interface ICounterComponent {
  increment: Function,
  decrement: Function,
  counter?: number
}

let Counter: React.FunctionComponent<ICounterComponent> = (props) => {

  const { increment, decrement, counter } = props;
  return (
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="site-card-border-less-wrapper">
          <Card title={String(counter)} bordered={true} style={{ width: 300 }}>
            <Button id="btn1" type="primary" block onClick={() => increment()} style={{ marginBottom: '4px' }}>
              Increment Counter
            </Button>

            <Button id="btn2" block onClick={() => decrement()}>
              Decrement Counter
            </Button>

          </Card>
        </div>
      </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
