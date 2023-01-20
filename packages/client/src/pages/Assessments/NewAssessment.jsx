import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

import classes from './NewAssessment.module.css';

// import {  } from 'react-hook-form';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      dateOfBirth: Date.now(),
      instrumentType: `Cat Behavioral`,
      name: ``,
      score: 0,
    },
  });

  const [ contact, setContact ] = useState(0);
  const [ alterWithCats, setAlterWithCats ] = useState(0);
  const [ alterWithOwner, setAlterWithOwner ] = useState(0);
  const [ play, setPlay ] = useState(0);
  const [ hisses, setHisses ] = useState(0);

  const [ score, setScore ] = useState(0);

  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
    reset();
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
        <Form.Check className={classes.check} name="contact" type="radio" label="No"
          onClick={() => setContact(0)} />
        <Form.Check className={classes.check} name="contact" type="radio" label="Yes"
          onClick={() => setContact(1)} />
      </Form.Group>

      <Form.Group >
        <Form.Label>2. Physical altercations with other cats</Form.Label>
        <Form.Check className={classes.check} name="alterCat" type="radio" label="0-3 altercations"
          onClick={() => setAlterWithCats(0)} />

        <Form.Check className={classes.check} name="alterCat" type="radio" label="3+ altercations"
          onClick={() => setAlterWithCats(1)} />
      </Form.Group>

      <Form.Group >
        <Form.Label>3. Physical altercations with owner (scratching, biting, etc...)</Form.Label>

        <Form.Check className={classes.check} name="alterOwner" type="radio" label="0-10 altercations"
          onClick={() => setAlterWithOwner(0)} />
        <Form.Check className={classes.check} name="alterOwner" type="radio" label="10+ altercations"
          onClick={() => setAlterWithOwner(1)} />
      </Form.Group>

      <Form.Group >
        <Form.Label>4. Plays well with dogs</Form.Label>
        <Form.Check className={classes.check} name="play" type="radio" label="Yes"
          onClick={() => setPlay(0)} />
        <Form.Check className={classes.check} name="play" type="radio" label="No"
          onClick={() => setPlay(1)} />
      </Form.Group>

      <Form.Group >
        <Form.Label>5. Hisses at strangers</Form.Label>
        <Form.Check className={classes.check} name="hisses" type="radio" label="No"
          onClick={() => setHisses(0)} />
        <Form.Check className={classes.check} name="hisses" type="radio" label="Yes"
          onClick={() => setHisses(1)} />
      </Form.Group>
    </Form.Group>

    <Button variant="primary" type="submit"
      onClick={() => {
        setScore(contact + alterWithCats + alterWithOwner + play + hisses);
        setValue(`score`, score);
      }}
    >Submit</Button>

  </Form>;
};
