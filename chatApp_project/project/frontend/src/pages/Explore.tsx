import React, { useEffect, useState } from "react";
import { withGlobalContext } from "../contexts/GlobalContext";
import styled from "styled-components";
import { PRIMARY_FONT } from "../configurations/styles";
import EventService from "../services/EventService";
import { Card, Col, Row } from "react-bootstrap";
import { shuffleArray } from "../utilities/shuffleArray";
import { Button } from "../components/Button";
import { withRouter } from "react-router-dom";

const _Explore = ({ globalContext, history }: any) => {
  const { communities } = globalContext.state;
  const [events, setEvents]: [any[], any] = useState([]);
  const [cards, setCards]: [any[], any] = useState([]);

  useEffect(() => {
    communities &&
      (async () => {
        setEvents(await EventService.getAllEvents([...communities]));
      })();
  }, [communities]);

  // This effect will generate a random list of things to show
  useEffect(() => {
    let result = [];

    for (const community of communities || []) {
      result.push({
        type: "community",
        community
      });
    }

    for (const event of events || []) {
      result.push({
        type: "event",
        event
      });
    }

    shuffleArray(result);
    setCards(result);
  }, [communities, events]);

  const getFirstHalfCards = () => {
    return cards.slice(0, Math.floor(cards.length / 2));
  };

  const getSecondHalfCards = () => {
    return cards.slice(Math.floor(cards.length / 2), cards.length);
  };

  return (
    <PageWrapper>
      <h2>
        <i className="fa fa-compass" aria-hidden="true" />
        &nbsp;Explore Fanlinc
      </h2>
      <Row>
        <Col>
          <ExploreRow cards={getFirstHalfCards()} history={history} />
        </Col>
        <Col>
          <ExploreRow cards={getSecondHalfCards()} history={history} />
        </Col>
      </Row>
    </PageWrapper>
  );
};

const ExploreRow = ({ cards, history }: any) => {
  return (
    <RowWrapper>
      {cards.map((card: any) => {
        if (card.type === "event") {
          return (
            <Card key={card.event.id} style={{ marginTop: "10px" }}>
              <Card.Body>
                <TypeHeader>Event</TypeHeader>
                <Card.Title>{card.event.name}</Card.Title>
                <Card.Text>{card.event.description}</Card.Text>
                <Button
                  text={"Details"}
                  link
                  compact
                  onClick={() => {
                    history.push("/dashboard/events/" + card.event.id);
                  }}
                />
              </Card.Body>
            </Card>
          );
        } else {
          return (
            <Card key={card.community.id} style={{ marginTop: "10px" }}>
              {card.community.themeImage && (
                <Card.Img variant="top" src={card.community.themeImage} />
              )}
              <Card.Body>
                <TypeHeader>Community</TypeHeader>
                <Card.Title>{card.community.name}</Card.Title>
                <Button
                  text={"Join"}
                  link
                  compact
                  onClick={() => {
                    history.push("/dashboard/communities/" + card.community.id);
                  }}
                />
              </Card.Body>
            </Card>
          );
        }
      })}
    </RowWrapper>
  );
};

const PageWrapper = styled.div`
  padding: 30px;
  font-family: ${PRIMARY_FONT};
`;

const RowWrapper = styled.div`
  padding: 20px;
`;

const TypeHeader = styled.div`
  font-family: ${PRIMARY_FONT};
  font-size: 16px;
  opacity: 0.5;
  text-transform: uppercase;
`;

export const Explore = withGlobalContext(withRouter(_Explore));
