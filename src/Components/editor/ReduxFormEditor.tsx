import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import { Button, Form, Input } from 'antd';

const { TextArea } = Input;

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


const renderAnswers = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Add Answer
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((answer, index) => {

            console.log('answer=', JSON.stringify(answer));

            return (<li key={index}>
              <button
                  type="button"
                  title="Remove Answer"
                  onClick={() => fields.remove(index)}
              />
              <h4>Answer #{index + 1}</h4>

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

              <Field
                  name={`${answer}.isCorrect`}
                  type="checkbox"
                  component={renderField}
                  label="Is Correct"
              />
              //@ts-ignore
              <FieldArray name={`${answer}.hobbies`} component={renderHobbies}/>
            </li>);
          },
      )}
    </ul>
);

const FieldArraysForm = props => {
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

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
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
})(FieldArraysForm);
