import React from 'react';
import { Field, FieldArray, reduxForm, change, formValueSelector, arrayPush } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validate';
import { Button, Form, Input, Card, Col, Switch, Select } from 'antd';
import { MinusCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const FORM_NAME = 'editQuestion';
const selectFormValue = formValueSelector(FORM_NAME);

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

let IsCorrectSwitch = (props: { answer: string, dispatch?: Function }) => {

  const { answer, dispatch } = props;

  return <Switch
      checkedChildren="Correct"
      unCheckedChildren="  Incorrect "
      onChange={(checked) => {
        dispatch(change(FORM_NAME, `${answer}.isCorrect`, checked));
      }}/>;
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


const renderTextArea = ({ input, label, rows, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <TextArea {...input} rows={rows}/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
);


let EditExplanation = (props: { id: number, hasExplanation?: boolean }) => {

  if (props.hasExplanation) {
    return (
        <Field
            name={`answers[${props.id}].explanation`}
            type="text"
            component={renderTextArea}
            label="Explanation"
        />
    );
  } else {
    return null;
  }

};

let mapStateToPropsExplanation = (state, ownProps: { id: number }) => {
  const fieldName = `answers[${ownProps.id}].explanation`;
  const explanation = selectFormValue(state, fieldName);
  console.log(`explanation value for ${fieldName}=${explanation}`);
  const hasExplanation = explanation!==undefined;

  return { hasExplanation };
};

const mergePropsExplanation = (stateProps: { hasExplanation: boolean, fieldName: string },
                               dispatchProps: { dispatch: Function },
                               ownProps: { id: number }) => {

  const { dispatch } = dispatchProps;
  const { fieldName } = stateProps;

  const addExplanation = () => {
    if (!stateProps.hasExplanation) {
      dispatch(change(FORM_NAME, fieldName, ''));
    }
  };

  const removeExplanation = () => {
    dispatch(change(FORM_NAME, fieldName, undefined));
  };

  return { ...ownProps, ...stateProps, addExplanation, removeExplanation, dispatch };

};

EditExplanation = connect(mapStateToPropsExplanation)(EditExplanation);


let ToggleExplanation = (props: {
  fieldName: string,
  hasExplanation?: boolean,
  dispatch?: Function
}) => {
  console.log(`ToggleExplanation fieldName=${props.fieldName} hasExplanation=${props.hasExplanation}`);
  const { dispatch } = props;
  let btnText: string;
  let setExplanation: Function;
  let danger;
  let BtnIcon = <PlusOutlined/>;


  if (props.hasExplanation) {
    btnText = 'Explanation';
    danger = 'danger';
    BtnIcon = <MinusCircleOutlined/>;
    setExplanation = () => dispatch(change(FORM_NAME, props.fieldName, undefined));
  } else {
    btnText = 'Explanation';
    setExplanation = () => dispatch(change(FORM_NAME, props.fieldName, ' '));
  }

  return (
      <Button
          type="primary"
          danger={danger}
          onClick={() => {
            setExplanation();
          }}
          style={{ width: '100%' }}
      >
        {BtnIcon} {btnText}
      </Button>
  );

};


const mapStateToPropsToggleExplanation = (state, ownProps: { fieldName: string }) => {
  const explanation = selectFormValue(state, ownProps.fieldName);

  const hasExplanation = explanation!==undefined;
  console.log(`mapStateToPropsToggleExplanation exp=${explanation} hasExplanation=${hasExplanation}`);

  return { hasExplanation };
};

ToggleExplanation = connect(mapStateToPropsToggleExplanation)(ToggleExplanation);


let renderAnswers = (props) => {
  const { fields, meta: { error, submitFailed } } = props;
  return (<div>
    <div>
      {submitFailed && error && <span>{error}</span>}
    </div>
    {fields.map((answer, index) => {

          console.log('answer=', JSON.stringify(answer));

          return (
              <div key={index}>
                <Card title={`Answer ${index + 1}`}
                      style={{ width: '100%' }}
                      actions={[
                        <IsCorrectSwitch answer={answer}/>,
                        <ToggleExplanation fieldName={`${answer}.explanation`}/>,
                        <DeleteOutlined
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

                  <EditExplanation id={index}/>
                </Card>

              </div>);
        },
    )}
  </div>);
};

const EditQuestionExplanation = () => {
  return (
      <Card
          title="Explanation"
          style={{ marginTop: '20px' }}
      >
        <Field
            name="explanation"
            type="textarea"
            component={renderTextArea}
            rows={3}
        />
      </Card>
  );
};


let EditQuestionType = (props: { dispatch?: Function }) => {

  const { dispatch } = props;

  function handleChange(value) {
    dispatch(change(FORM_NAME, 'qtype', value));
  }

  return (
      <Select defaultValue="single" style={{ width: 120 }} placeholder="Question Type" onChange={handleChange}>
        <Option value="single">Single Correct</Option>
        <Option value="multi">Multiple Correct</Option>
      </Select>
  );
};

EditQuestionType = connect()(EditQuestionType);

let EditQuestion = (props: { dispatch?: Function }) => {
  const { dispatch } = props;
  return (
      <Card
          title="Question"
          actions={[
            <Button onClick={() => {
              console.log('Adding Fields');
              dispatch(arrayPush(FORM_NAME, 'answers', { body: '' }));
            }}>
              <PlusOutlined/> Add Answer
            </Button>,
            <EditQuestionType/>,
          ]}>
        <Field
            name="question"
            type="textarea"
            component={renderTextArea}
            rows={7}
            label="Question"
        />
      </Card>
  );
};

EditQuestion = connect()(EditQuestion);

let QuestionEditorForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
      <form onSubmit={handleSubmit}>
        <EditQuestion/>
        { /* @ts-ignore */}
        <FieldArray name="answers" component={renderAnswers}/>
        <EditQuestionExplanation/>
        <div style={{ marginTop: '10px' }}>
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
    question: 'Can you answer this question?',
    answers: [{
      body: 'This is correct',
      explanation: 'Explain 1',
    }],
  },
  destroyOnUnmount: false,
  onSubmit: (data) => {
    console.log(data);
  },
})(QuestionEditorForm);
