import React, { useEffect, useState } from "react";
import { EventModal } from "../components/event/EventModal";
import { ButtonToolbar } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import CommunityService from "../services/CommunityService";
import UserProfileService from "../services/UserProfileService";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { trackPromise } from "react-promise-tracker";
import { useAlert } from "react-alert";
import { JoinCommunityModal } from "../components/JoinCommunityModal";
import { TabPanel } from "../components/TabPanel";
import { Preview } from "../components/Preview";
import moment from "moment";
import { ThemeImage } from "../components/ThemeImage";
import { withGlobalContext } from "../contexts/GlobalContext";
import { withIdentity } from "../hocs/RequireIdentity";
import { Copyright } from "../components/Copyright";
import styled from "styled-components";
import { fetchJoinedCommunities } from "../contexts/actions/community";

const DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";
const DEFAULT_EVENT_IMG =
  "https://project-bes.s3.ca-central-1.amazonaws.com/download.png";
const DEFAULT_SUBCOMMUNITY_IMG =
  "https://project-bes.s3.ca-central-1.amazonaws.com/subcommunities-default.jpeg";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    width: "100%",
    padding: 0
  },
  toolbarTabs: {
    width: "100%"
  },
  toolbarTab2: {
    paddingLeft: 25
  },
  createEventToolbar: {
    marginBottom: theme.spacing(2)
  }
}));

type Event = {
  id: number;
  name: string;
  startDate: string;
  location: string;
  themeImage: string;
  numberOfAttending: number;
};

type Subcommunity = {
  id: number;
  name: string;
  numberOfJoined: number;
  removed: boolean;
  themeImage: string;
};

const _Community = ({ globalContext, history }: any) => {
  const { identity } = globalContext.state;
  const { communityId } = useParams();
  const [communityInfo, setCommunityInfo] = useState();
  const [createEventModalShow, setCreateEventModalShow] = useState(false);
  const [joinCommunityModalShow, setJoinCommunityModalShow] = useState(false);
  const [joinedCommunity, setJoinedCommunity] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [updateTracker, setUpdateTracker] = useState(false);
  const alert = useAlert();
  const classes = useStyles();

  useEffect(() => {
    const getCommunityInfo = async () => {
      const [joinResult, communityInfo] = await Promise.all([
        UserProfileService.joinedCommunity(identity.uid, communityId),
        CommunityService.getCommunity(communityId)
      ]);
      setSelectedTab(0);
      setJoinedCommunity(joinResult.data);
      setCommunityInfo(communityInfo.data);
    };
    trackPromise(getCommunityInfo()).then(() => {});
  }, [updateTracker, joinedCommunity, communityId, identity.uid]);

  const leaveCommunity = async () => {
    try {
      await UserProfileService.leaveCommunity(identity.uid, communityId);
      await globalContext.dispatch(fetchJoinedCommunities, {});
      alert.success("Left community");
      setJoinedCommunity(false);
    } catch (e) {
      console.error(e);
      alert.error("Couldn't leave community");
    }
  };

  const sortedEvents = (events: Event[]) => {
    return events.sort((e1, e2) => {
      if (e1.numberOfAttending === e2.numberOfAttending) {
        return moment(e1.startDate).diff(moment(e2.startDate));
      }
      return e2.numberOfAttending - e1.numberOfAttending;
    });
  };

  const sortedSubcommunities = (subcommunities: Subcommunity[]) => {
    return subcommunities.sort(
      (c1, c2) => c2.numberOfJoined - c1.numberOfJoined
    );
  };

  return !communityInfo || communityInfo.removed ? null : (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          {joinedCommunity ? (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={leaveCommunity}
            >
              Leave Community
            </Button>
          ) : (
            <ButtonToolbar>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => setJoinCommunityModalShow(true)}
              >
                Join Community
              </Button>
              <JoinCommunityModal
                show={joinCommunityModalShow}
                onHide={() => setJoinCommunityModalShow(false)}
                communityId={communityId}
                communityName={communityInfo.name}
                uid={identity.uid}
                setJoined={setJoinedCommunity}
              />
            </ButtonToolbar>
          )}
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {communityInfo.name}
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" size="small">
            {communityInfo.numberOfJoined} Users
          </Button>
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            className={classes.toolbarTabs}
            onChange={(event, newSelected) => setSelectedTab(newSelected)}
          >
            <Tab label="Events" />
            <Tab label="Subcommunities" className={classes.toolbarTab2} />
            <Tab label="Chats" />
          </Tabs>
        </Toolbar>
        <ThemeImage imageLink={communityInfo.themeImage} />
        <main>
          <TabPanel value={selectedTab} index={0}>
            {joinedCommunity && (
              <ButtonToolbar className={classes.createEventToolbar}>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => setCreateEventModalShow(true)}
                >
                  Create Event
                </Button>
                <EventModal
                  show={createEventModalShow}
                  onHide={() => setCreateEventModalShow(false)}
                  communityId={communityId}
                  uid={identity.uid}
                  savedIndicator={updateTracker}
                  setIndicator={setUpdateTracker}
                />
              </ButtonToolbar>
            )}
            <Grid container spacing={4}>
              {sortedEvents(communityInfo.events).map((event: Event) => (
                <Preview
                  key={event.id}
                  title={event.name}
                  subtitle={moment(event.startDate).format(DATE_FORMAT)}
                  description={event.location}
                  image={event.themeImage}
                  defaultImg={DEFAULT_EVENT_IMG}
                  bottomText={event.numberOfAttending + " Going"}
                  onClick={() => {
                    history.push("/dashboard/events/" + event.id);
                  }}
                />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <Grid container spacing={4}>
              {sortedSubcommunities(communityInfo.subcommunities).map(
                (subcommunity: Subcommunity) =>
                  !subcommunity.removed && (
                    <Preview
                      key={subcommunity.id}
                      title={subcommunity.name}
                      subtitle={subcommunity.numberOfJoined + " Users Joined"}
                      description=""
                      image={subcommunity.themeImage}
                      defaultImg={DEFAULT_SUBCOMMUNITY_IMG}
                      onClick={() => {
                        history.push(
                          "/dashboard/communities/" + subcommunity.id
                        );
                      }}
                    />
                  )
              )}
            </Grid>
          </TabPanel>
        </main>
      </Container>
      <CopyrightWrapper>
        <Copyright />
      </CopyrightWrapper>
    </React.Fragment>
  );
};

const CopyrightWrapper = styled.div`
  margin: 30px;
`;

export const Community = withGlobalContext(
  withIdentity(withRouter(_Community))
);
