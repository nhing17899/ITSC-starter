import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

import classes from './NewAssessment.module.css';

// import {  } from 'react-hook-form';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const { control, handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      checkBox: [ 0, 0, 0, 0, 0 ],
      dateOfBirth: Date.now(),
      instrumentType: 1,
      name: ``,
      riskLevel: ``,
      score: 0,
    },
  });

  const sum = (data) => {
    let scoreSum = 0;

    for (const el in data) {
      scoreSum += parseFloat(data[el]);
    }
    return scoreSum;
  };

  const risk = (score) => {
    if (score <= 1) { return `low`; }
    else if (score <= 3) { return `medium`; }
    return `high`; };

  const onSubmit = (data) => {
    // calculate score here
    data.score = sum(data.checkBox);
    data.riskLevel = risk(data.score);
    // data.riskLevel =

    AssessmentService.submit(data)
      .then(() => {
        reset();
      });
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

      <Form.Group>
        <Form.Label>1. Previous contact with the Cat Judicial System</Form.Label>
        <Form.Check
          className={classes.check}
          name="contact"
          type="radio"
          label="No"
          value="0"
          {...register(`checkBox[0]`, { required: true })}
        />

        <Form.Check
          className={classes.check}
          name="contact"
          type="radio"
          label="Yes"
          value="1"
          {...register(`checkBox[0]`, { required: true })}
        />

      </Form.Group>

      <Form.Group>
        <Form.Label>2. Physical altercations with other cats</Form.Label>
        <Form.Check
          className={classes.check}
          name="alterCat"
          type="radio"
          label="0-3 altercations"
          value="0"
          {...register(`checkBox[1]`, { required: true })}
        />

        <Form.Check
          className={classes.check}
          name="alterCat"
          type="radio"
          label="3+ altercations"
          value="1"
          {...register(`checkBox[1]`, { required: true })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>3. Physical altercations with owner (scratching, biting, etc...)</Form.Label>
        <Form.Check
          className={classes.check}
          name="alterOwner"
          type="radio"
          label="0-10 altercations"
          value="0"
          {...register(`checkBox[2]`, { required: true })}
        />

        <Form.Check
          className={classes.check}
          name="alterOwner"
          type="radio"
          label="10+ altercations"
          value="1"
          {...register(`checkBox[2]`, { required: true })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>4. Plays well with dogs</Form.Label>
        <Form.Check
          className={classes.check}
          name="play"
          type="radio"
          label="Yes"
          value="0"
          {...register(`checkBox[3]`, { required: true })}
        />

        <Form.Check
          className={classes.check}
          name="play"
          type="radio"
          label="No"
          value="1"
          {...register(`checkBox[3]`, { required: true })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>5. Hisses at strangers</Form.Label>
        <Form.Check
          className={classes.check}
          name="hisses"
          type="radio"
          label="No"
          value="0"
          {...register(`checkBox[4]`, { required: true })}
        />

        <Form.Check
          className={classes.check}
          name="hisses"
          type="radio"
          label="Yes"
          value="1"
          {...register(`checkBox[4]`, { required: true })}
        />
      </Form.Group>
    </Form.Group>

    <Button variant="primary" type="submit">Submit</Button>

  </Form>;
};
