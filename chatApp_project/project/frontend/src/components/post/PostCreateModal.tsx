import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../Button";
import UserProfileService from "../../services/UserProfileService";
import { PostCreateForm } from "./PostCreateForm";
import { useAlert } from "react-alert";
import IdentityService from "../../services/IdentityService";

type PostCreateModalProps = {
  uid: string;
  show: boolean;
  onHide: () => void;
  createdIndicator?: boolean;
  setIndicator?: (changed: boolean) => void;
  eventId?: string;
};

export const PostCreateModal: React.FC<PostCreateModalProps> = ({
  uid,
  show,
  onHide,
  createdIndicator,
  setIndicator,
  eventId
}) => {
  const alert = useAlert();
  const [image, setImage]: [File | undefined, any] = useState(undefined);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setDescription("");
    setImage(undefined);
  };
  const handleCreatePost = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        if (!!eventId) {
          let imageLink;
          if (!!image) {
            const result = await IdentityService.imageUpload(image);
            imageLink = result.image;
          }
          await UserProfileService.addEventPost(
            uid,
            eventId,
            imageLink,
            description
          );
        }
        if (createdIndicator !== undefined && setIndicator) {
          setIndicator(!createdIndicator);
        }
        onHide();
        resetState();
      } catch (e) {
        console.error(e);
        alert.error("Something went wrong");
      }
      setLoading(false);
    }
  };

  const validateForm = () => {
    let result = true;
    if (!image) {
      result = false;
    }
    return result;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostCreateForm
          image={image}
          description={description}
          setImage={setImage}
          setDescription={setDescription}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          text={"Add Post"}
          onClick={handleCreatePost}
          disabled={loading}
        />
      </Modal.Footer>
    </Modal>
  );
};
