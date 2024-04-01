import React, { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Button } from "./Button";
import UserProfileService from "../services/UserProfileService";
import { useAlert } from "react-alert";
import { withGlobalContext } from "../contexts/GlobalContext";
import { fetchJoinedCommunities } from "../contexts/actions/community";

type JoinCommunityModalProps = {
  communityId: string | undefined;
  communityName: string;
  uid: string;
  show: boolean;
  onHide: () => void;
  setJoined: (joined: boolean) => void;
  globalContext: any;
};

type ProficiencyOption = {
  name: string;
  value: string;
};

const proficiencyOptions: Array<ProficiencyOption> = [
  { name: "Casual", value: "1" },
  { name: "Serious", value: "2" },
  { name: "Professional", value: "3" }
];

const _JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({
  communityId,
  communityName,
  uid,
  show,
  onHide,
  setJoined,
  globalContext
}) => {
  const [proficiencyLevel, setProficiencyLevel] = useState(
    proficiencyOptions[0].value
  );
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const joinCommunity = async () => {
    try {
      setLoading(true);
      await UserProfileService.joinCommunity(
        uid,
        communityId,
        proficiencyLevel
      );
      onHide();
      await globalContext.dispatch(fetchJoinedCommunities, {});
      alert.success("Joined community!");
      setJoined(true);
    } catch (e) {
      console.error(e);
      alert.error("Couldn't join community");
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Join {communityName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="proficiencyLevel">
            <Form.Label column={true} sm="4">
              Proficiency Level
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProficiencyLevel(e.currentTarget.value)
                }
              >
                {proficiencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button text="Join" onClick={joinCommunity} disabled={loading} />
      </Modal.Footer>
    </Modal>
  );
};

export const JoinCommunityModal = withGlobalContext(_JoinCommunityModal);
