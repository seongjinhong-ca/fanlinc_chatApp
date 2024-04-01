import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from "react-images-upload";
import styled from "styled-components";

type PostCreateFormProps = {
  description: string;
  setDescription: (description: string) => void;
  image: File | undefined;
  setImage: (themeImage: File | undefined) => void;
};

const INVALID_IMG_MSG = "Please choose an image";

export const PostCreateForm: React.FC<PostCreateFormProps> = ({
  description,
  image,
  setDescription,
  setImage
}) => {
  const hideOnPreview = image ? { display: "none" } : {};

  return (
    <Form noValidate>
      <Form.Group as={Row} controlId="formDescription">
        <Form.Label column={true} sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Describe the post"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.currentTarget.value)
            }
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formImage">
        <Form.Label column={true} sm="2">
          Image
        </Form.Label>
        <Col sm="10">
          <ImageUploader
            fileContainerStyle={{ padding: "0", margin: "10px auto 0" }}
            withPreview={true}
            singleImage={true}
            withIcon={!image}
            onChange={picture => setImage(picture.pop())}
            buttonText="Choose image"
            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
            label={"Max file size: 5MB"}
            buttonStyles={hideOnPreview}
            labelStyles={hideOnPreview}
            errorStyle={hideOnPreview}
          />
          <Form.Control hidden isInvalid={!image} />
          <Form.Control.Feedback as={CenterWrapper} type="invalid">
            {INVALID_IMG_MSG}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </Form>
  );
};

const CenterWrapper = styled.div`
  text-align: center;
`;
