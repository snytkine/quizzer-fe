import React from 'react';
import 'antd/dist/antd.css';
//import "./index.css";
import { Form, Input, Button, Col, Row, Checkbox, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const rules = [{ required: true }];

const initialFields = [{
  'touched': true,
  'validating': false,
  'errors': [],
  'name': ['question'],
  'value': 'What is this?',
}, {
  'touched': true,
  'validating': false,
  'errors': [],
  'name': ['answers'],
  'value': [{
    'answerBody': 'Correct',
    'explanation': 'this is good',
    'isCorrect': 'yes',
  }, { 'answerBody': 'Bad choice', 'explanation': 'this is incorrect' }],
}, {
  'touched': true,
  'validating': false,
  'errors': [],
  'name': ['answers', 0, 'answerBody'],
  'value': 'Correct',
}, {
  'touched': true,
  'validating': false,
  'errors': [],
  'name': ['answers', 0, 'explanation'],
  'value': 'this is good',
}, {
  'touched': true,
  'validating': false,
  'errors': [],
  'name': ['answers', 0, 'isCorrect'],
  'value': 'yes',
}, {
  'touched': true,
  'validating': false,
  'errors': [],
  'name': ['answers', 1, 'answerBody'],
  'value': 'Bad choice',
}, {
  'touched': true,
  'validating': false,
  'errors': [],
  'name': ['answers', 1, 'explanation'],
  'value': 'this is incorrect',
}, { 'touched': false, 'validating': false, 'errors': [], 'name': ['answers', 1, 'isCorrect'] }];

export const QuestionEditor = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    console.log(JSON.stringify(values));
  };

  const onFieldChange = (obj: any) => {
    console.log('field changed', obj);
  };

  const onValueChange = (obj: any) => {
    console.log('value changed', obj);
  };

  const onFormChange = (newFields: any) => {
    console.log('newFields:');
    console.log(JSON.stringify(newFields));
  };

  return (
      <Form fields={initialFields} onFinish={onFinish} onFieldsChange={(changedFields: any, allFields: any) => onFormChange(allFields)}
            onValuesChange={onValueChange} className="my-form">
        <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: 'Please type the question' }]}
        >
          <TextArea rows={6}/>
        </Form.Item>
        <Form.List name="answers">
          {(fields, { add, remove }) => {
            const onCheck = (id: number, e: any) => {
              console.log(`onChange for ${id} checked=${e.target.checked}`);
              console.dir(fields);
            };
            console.dir(fields);
            /**
             * `fields` internal fill with `name`, `key`, `fieldKey` props.
             * You can extends this into sub field to support multiple dynamic fields.
             */
            return (
                <div>
                  {fields.map((field, index) => {
                        console.dir(field);
                        return (

                            <Row key={field.key}>
                              <Col>
                                <Form.Item
                                    name={[field.name, 'answerBody']}
                                    fieldKey={field.fieldKey}
                                    rules={rules}
                                >
                                  <TextArea rows={4}/>
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                    name={[field.name, 'explanation']}
                                    fieldKey={field.fieldKey}
                                >
                                  <Input placeholder="Explanation"/>
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                    name={[field.name, 'isCorrect']}
                                    fieldKey={field.fieldKey}
                                >

                                  <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="Y">Correct</Radio.Button>
                                    <Radio.Button value={undefined}>Incorrect</Radio.Button>
                                  </Radio.Group>
                                </Form.Item>

                              </Col>
                              <Col flex="none">
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => {
                                      remove(field.name);
                                    }}
                                />
                              </Col>
                            </Row>
                        );
                      },
                  )
                  }
                  <Form.Item>
                    <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: '100%' }}
                    >
                      <PlusOutlined/> Add field
                    </Button>
                  </Form.Item>
                </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  );
};
