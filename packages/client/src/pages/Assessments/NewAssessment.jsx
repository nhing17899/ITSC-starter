import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

import classes from './NewAssessment.module.css';

// import {  } from 'react-hook-form';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const { handleSubmit, register } = useForm({
    defaultValues: {
      dateOfBirth: Date.now(),
      name: ``,
      questions: {
        alterWithCats: 0,
        alterWithOwner: 0,
        contact: 0,
        hisses: 0,
        play: 0,
      },
    },
  });

  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  return <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
    <h1 className={classes.title}>Cat Assessment Info</h1>

    <Form.Group className="mb-3">
      <Form.Label className={classes.heading}>Instrument</Form.Label>
      <Form.Control
        type="text"
        placeholder="Cat Behavioral Instruments"
        readOnly
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label className={classes.heading}>Cat Details</Form.Label>
      <Row>
        <Col>
          <Form.Control type="text"
            {...register(`name`, { required: true })}
            placeholder="Cat Name" />
        </Col>
        <Col>
          <Form.Control type="date"
            {...register(`dateOfBirth`, { required: true })}
            placeholder="Cat Date of Birth" />
        </Col>
      </Row>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label className={classes.heading}>Questions & Responses</Form.Label>
      <Form.Group register={`questions.contact`}>
        <Form.Label>1. Previous contact with the Cat Judicial System</Form.Label>
        <Form.Check className={classes.check} type="radio" label="No"
          {...register(`questions.contact`)} value="0" />
        <Form.Check className={classes.check} type="radio" label="Yes"
          {...register(`questions.contact`)} value="1" />
      </Form.Group>

      <Form.Group >
        <Form.Label>2. Physical altercations with other cats</Form.Label>
        <Form.Check className={classes.check} type="radio" label="0-3 altercations"
          {...register(`questions.alterWithCats`)} value="0" />

        <Form.Check className={classes.check} type="radio" label="3+ altercations"
          {...register(`questions.alterWithCats`)} value="1" />
      </Form.Group>

      <Form.Group >
        <Form.Label>3. Physical altercations with owner (scratching, biting, etc...)</Form.Label>

        <Form.Check className={classes.check} type="radio" label="0-10 altercations"
          {...register(`questions.alterWithOwner`)} value="0" />
        <Form.Check className={classes.check} type="radio" label="10+ altercations"
          {...register(`questions.alterWithOwner`)} value="1" />
      </Form.Group>

      <Form.Group >
        <Form.Label>4. Plays well with dogs</Form.Label>
        <Form.Check className={classes.check} type="radio" label="Yes"
          {...register(`questions.play`)} value="0" />
        <Form.Check className={classes.check} type="radio" label="No"
          {...register(`questions.play`)} value="1" />
      </Form.Group>

      <Form.Group >
        <Form.Label>5. Hisses at strangers</Form.Label>
        <Form.Check className={classes.check} type="radio" label="No"
          {...register(`questions.hisses`)} value="0" />
        <Form.Check className={classes.check} type="radio" label="Yes"
          {...register(`questions.hisses`)} value="1" />
      </Form.Group>
    </Form.Group>

    <Button variant="primary" type="submit">Submit</Button>

  </Form>;
};
