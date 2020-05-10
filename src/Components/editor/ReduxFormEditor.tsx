import React from 'react';
import { Field, FieldArray, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validate';
import { Button, Form, Input, Card, Col, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const renderAnswerTitle = (props: { id: number, fieldName: string }) => {
  const { id, fieldName } = props;
  return (
      <div>
        <span>{`Answer ${id + 1}`}</span>
        <Field
            name={`${fieldName}.isCorrect`}
            type="checkbox"
            component={renderField}
            label="Is Correct"
        />
      </div>
  );

};

let IsCorrectSwitch = (props: {answer: string, dispatch?: Function}) => {

  const {answer, dispatch} = props;

  return <Switch
      checkedChildren="Correct"
      unCheckedChildren="  Incorrect "
      onChange={(checked) => {
        dispatch(change('editQuestion', `${answer}.isCorrect`, checked));
      }}/>
};

IsCorrectSwitch = connect()(IsCorrectSwitch);

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label}/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
);


const renderTextArea = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <TextArea {...input} rows={6}/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
);

const renderHobbies = ({ fields, meta: { error } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}>
          Add Hobby
        </button>
      </li>
      {fields.map((hobby, index) => (
          <li key={index}>
            <button
                type="button"
                title="Remove Hobby"
                onClick={() => fields.remove(index)}
            />
            <Field
                name={hobby}
                type="text"
                component={renderField}
                label={`Hobby #${index + 1}`}
            />
          </li>
      ))}
      {error && <li className="error">{error}</li>}
    </ul>
);


let renderAnswers = ({ fields, meta: { error, submitFailed }, dispatch }) => (
    <div>
      <div>
        <button type="button" onClick={() => fields.push({})}>
          Add Answer
        </button>
        {submitFailed && error && <span>{error}</span>}
      </div>
      {fields.map((answer, index) => {


            console.log('answer=', JSON.stringify(answer));

            return (
                <div key={index}>
                  <Card title={`Answer ${index + 1}`}
                        extra={<Switch checkedChildren="1" unCheckedChildren="0"/>}
                        style={{ width: '100%' }}
                        actions={[
                          <IsCorrectSwitch answer={answer}/>,
                          <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => fields.remove(index)}
                          />,
                        ]}>
                    <Field
                        name={`${answer}.body`}
                        type="text"
                        component={renderTextArea}
                        rows={4}
                        cols={40}
                        label="Answer"
                    />

                    <Field
                        name={`${answer}.explanation`}
                        type="text"
                        component={renderTextArea}
                        label="Explanation"
                    />
                  </Card>

                  <button
                      type="button"
                      title="Remove Answer"
                      onClick={() => fields.remove(index)}
                  />

                  //@ts-ignore
                  <FieldArray name={`${answer}.hobbies`} component={renderHobbies}/>
                </div>);
          },
      )}
    </div>
);


let QuestionEditorForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
      <form onSubmit={handleSubmit}>
        <Field
            name="question"
            type="textarea"
            component={renderTextArea}
            rows={7}
            cols={40}
            label="Question"
        />
        // @ts-ignore
        <FieldArray name="answers" component={renderAnswers}/>
        <div>
          <Button type="primary" disabled={submitting} htmlType="submit">
            Submit
          </Button>

          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
  );
};

renderAnswers = connect()(renderAnswers);

export default reduxForm({
  form: 'editQuestion', // a unique identifier for this form
  initialValues: {
    question: 'Can you answer this question?', answers: [{
      answer: 'This is correct',
      explanation: 'Correct',
    }],
  },
  destroyOnUnmount: false,
  onSubmit: (data) => {
    console.log(data);
  },
  validate,
})(QuestionEditorForm);
