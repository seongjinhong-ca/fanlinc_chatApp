import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from "react-images-upload";

type EventFormProps = {
  name: string;
  setName: (name: string) => void;
  location: string;
  setLocation: (location: string) => void;
  description: string;
  setDescription: (description: string) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
  validated: boolean;
  invalidEndDate: boolean;
  setInvalidEndDate: (invalidEndDate: boolean) => void;
  themeImage: File | undefined;
  setThemeImage: (themeImage: File | undefined) => void;
};

const DATE_FORMAT = "dd/MM/yyyy HH:mm";
const INVALID_NAME_MSG = "Please provide a valid name";
const INVALID_LOCATION_MSG = "Please provide a valid address";
const INVALID_DESCRIPTION_MSG = "Please provide a description";
const INVALID_END_DATE_MSG = "End date cannot be before start date";

export const EventForm: React.FC<EventFormProps> = ({
  name,
  location,
  description,
  startDate,
  endDate,
  validated,
  invalidEndDate,
  themeImage,
  setName,
  setLocation,
  setDescription,
  setStartDate,
  setEndDate,
  setInvalidEndDate,
  setThemeImage
}) => {
  const hideOnPreview = themeImage ? { display: "none" } : {};

  return (
    <Form validated={validated}>
      <Form.Group as={Row} controlId="formName">
        <Form.Label column={true} sm="2">
          Theme Image
        </Form.Label>
        <Col sm="10">
          <ImageUploader
            fileContainerStyle={{ padding: "0", margin: "10px auto 0" }}
            withPreview={true}
            singleImage={true}
            withIcon={!themeImage}
            onChange={picture => setThemeImage(picture.pop())}
            buttonText="Choose image"
            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
            label={"Max file size: 5MB"}
            buttonStyles={hideOnPreview}
            labelStyles={hideOnPreview}
            errorStyle={hideOnPreview}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formName">
        <Form.Label column={true} sm="2">
          Event Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            placeholder="Add name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
          />
          <Form.Control.Feedback type="invalid">
            {INVALID_NAME_MSG}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formLocation">
        <Form.Label column={true} sm="2">
          Location
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            placeholder="Include specific address"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocation(e.currentTarget.value)
            }
          />
          <Form.Control.Feedback type="invalid">
            {INVALID_LOCATION_MSG}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formDescription">
        <Form.Label column={true} sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            as="textarea"
            rows="5"
            placeholder="Describe the event"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.currentTarget.value)
            }
          />
          <Form.Control.Feedback type="invalid">
            {INVALID_DESCRIPTION_MSG}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formStartDate">
        <Form.Label column={true} sm="2">
          StartDate
        </Form.Label>
        <Col sm="10">
          <DatePicker
            showTimeSelect
            dateFormat={DATE_FORMAT}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            customInput={<Form.Control />}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formEndDate">
        <Form.Label column={true} sm="2">
          End Date
        </Form.Label>
        <Col sm="10">
          <DatePicker
            showTimeSelect
            dateFormat={DATE_FORMAT}
            selected={endDate}
            onChange={(date: Date) => {
              setEndDate(date);
              setInvalidEndDate(false);
            }}
            customInput={<Form.Control isInvalid={invalidEndDate} />}
          />
          <Form.Control hidden isInvalid={invalidEndDate} />
          <Form.Control.Feedback type="invalid">
            {INVALID_END_DATE_MSG}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </Form>
  );
};
