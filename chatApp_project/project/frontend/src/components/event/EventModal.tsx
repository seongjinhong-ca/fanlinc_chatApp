import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "../Button";
import { EventForm } from "./EventForm";
import UserProfileService from "../../services/UserProfileService";
import { useAlert } from "react-alert";
import { EventData } from "../../pages/Event";
import Col from "react-bootstrap/Col";
import { confirm } from "../../utilities/confirm";
import moment from "moment";
import IdentityService from "../../services/IdentityService";

type EventModalProps = {
  communityId: string | undefined;
  uid: string;
  show: boolean;
  onHide: () => void;
  savedIndicator?: boolean;
  setIndicator?: (changed: boolean) => void;
  eventInfo?: EventData;
};

export const EventModal: React.FC<EventModalProps> = ({
  communityId,
  uid,
  show,
  onHide,
  savedIndicator,
  setIndicator,
  eventInfo
}) => {
  const history = useHistory();
  const [themeImage, setThemeImage]: [File | undefined, any] = useState(
    undefined
  );
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [invalidEndDate, setInvalidEndDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState();
  const alert = useAlert();

  useEffect(() => {
    if (!!eventInfo) {
      const { name, description, location, startDate, id, endDate } = eventInfo;
      setName(name);
      setDescription(description);
      setLocation(location);
      setStartDate(moment(startDate).toDate());
      setEndDate(moment(endDate).toDate());
      setEventId(id);
    } else {
      resetState();
    }
  }, [eventInfo, savedIndicator]);

  const resetState = () => {
    setName("");
    setDescription("");
    setLocation("");
    setStartDate(new Date());
    setEndDate(new Date());
    setThemeImage(undefined);
  };

  const handleSave = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        let themeImageLink;
        if (!!themeImage) {
          const result = await IdentityService.imageUpload(themeImage);
          themeImageLink = result.image;
        }
        if (!eventInfo) {
          await UserProfileService.hostEvent(
            communityId,
            uid,
            name,
            location,
            description,
            startDate,
            endDate,
            themeImageLink
          );
        } else {
          await UserProfileService.editEvent(
            eventId,
            uid,
            name,
            location,
            description,
            startDate,
            endDate,
            themeImageLink
          );
        }
        if (savedIndicator !== undefined && setIndicator) {
          setIndicator(!savedIndicator);
        }
        onHide();
      } catch (e) {
        console.error(e);
        alert.error("Something went wrong");
      }
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    confirm("Are you sure you want to cancel the Event?").then(
      async () => {
        await UserProfileService.deleteEvent(eventId, uid);
        history.replace(`/communities/${communityId}`);
      },
      () => {}
    );
  };

  const validateForm = () => {
    let result = true;
    if (!name || !location || !description) {
      setValidated(true);
      result = false;
    } else {
      if (endDate <= startDate) {
        setInvalidEndDate(true);
        result = false;
      }
      setValidated(false);
    }
    return result;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EventForm
          themeImage={themeImage}
          name={name}
          setName={setName}
          location={location}
          setLocation={setLocation}
          description={description}
          startDate={startDate}
          endDate={endDate}
          invalidEndDate={invalidEndDate}
          setThemeImage={setThemeImage}
          setDescription={setDescription}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          validated={validated}
          setInvalidEndDate={setInvalidEndDate}
        />
      </Modal.Body>
      <Modal.Footer>
        <Col hidden={!eventInfo}>
          <span style={deleteStyle} onClick={handleDelete}>
            Delete Event
          </span>
        </Col>
        <Col style={saveStyle}>
          <Button
            text={eventInfo ? "Save" : "Create Event"}
            onClick={handleSave}
            disabled={loading}
          />
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

const saveStyle = {
  display: "flex",
  justifyContent: "flex-end"
};

const deleteStyle = {
  color: "blue",
  textDecoration: "underline",
  cursor: "pointer"
};
