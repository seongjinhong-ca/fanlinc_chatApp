import React, { useEffect, useState } from "react";
import { EventModal } from "../components/event/EventModal";
import { ButtonToolbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserProfileService from "../services/UserProfileService";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { trackPromise } from "react-promise-tracker";
import moment from "moment";
import "moment-precise-range-plugin";
import { ThemeImage } from "../components/ThemeImage";
import EventService from "../services/EventService";
import { Divider } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import EventIcon from "@material-ui/icons/Event";
import { PostData } from "../components/post/PostViewModal";
import { PostGallery } from "../components/post/PostGallery";
import { PostCreateModal } from "../components/post/PostCreateModal";
import { withGlobalContext } from "../contexts/GlobalContext";
import { withIdentity } from "../hocs/RequireIdentity";

const DATE_FORMAT = "dddd, MMMM Do YYYY, h:mm:ss a";
const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  importantInfo: {
    marginTop: theme.spacing(3)
  },
  details: {
    margin: theme.spacing(2, 2)
  },
  gallery: {
    overflow: "hidden",
    marginBottom: theme.spacing(4)
  },
  galleryTitle: {
    justifyContent: "space-between"
  },
  createPost: {
    margin: "auto 0"
  },
  icon: {
    verticalAlign: "bottom"
  }
}));

export type EventData = {
  communityId: string;
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  themeImage: string;
  attendingUsers: Array<string>;
  hostingUsers: Array<string>;
  posts: Array<PostData>;
};

const _Event = ({ globalContext }: any) => {
  const { eventId } = useParams();
  const { identity } = globalContext.state;
  const [eventInfo, setEventInfo]: [EventData | undefined, any] = useState();
  const [editEventModalShow, setEditEventModalShow] = useState(false);
  const [createPostModalShow, setCreatePostModalShow] = useState(false);
  const [updateTracker, setUpdateTracker] = useState(false);
  const [hostingEvent, setHostingEvent] = useState(false);
  const [attendingEvent, setAttendingEvent] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const getEventInfo = async () => {
      const info: EventData = (await EventService.getEvent(eventId)).data;
      setAttendingEvent(info.attendingUsers.includes(identity.uid));
      setEventInfo(info);
      setHostingEvent(info.hostingUsers.includes(identity.uid));
    };
    trackPromise(getEventInfo()).then(() => {});
  }, [updateTracker, attendingEvent, eventId]);

  const attendEvent = async () => {
    try {
      await UserProfileService.attendEvent(identity.uid, eventId);
      setAttendingEvent(true);
    } catch (e) {
      console.error(e);
    }
  };

  const unattendEvent = async () => {
    try {
      await UserProfileService.unattendEvent(identity.uid, eventId);
      setAttendingEvent(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getDuration = (start: string, end: string) => {
    return moment.preciseDiff(moment(end), moment(start));
  };

  return !eventInfo ? null : (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          {hostingEvent ? (
            <ButtonToolbar>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => setEditEventModalShow(true)}
              >
                Edit
              </Button>
              <EventModal
                show={editEventModalShow}
                onHide={() => setEditEventModalShow(false)}
                communityId={eventInfo.communityId}
                uid={identity.uid}
                savedIndicator={updateTracker}
                setIndicator={setUpdateTracker}
                eventInfo={eventInfo}
              />
            </ButtonToolbar>
          ) : attendingEvent ? (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={unattendEvent}
            >
              Not Attending
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={attendEvent}
            >
              Attending
            </Button>
          )}
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {eventInfo.name}
          </Typography>
          <Button variant="outlined" size="small">
            {eventInfo.attendingUsers.length} Going
          </Button>
        </Toolbar>
        <ThemeImage imageLink={eventInfo.themeImage} />
        <main>
          <Grid container className={classes.importantInfo}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                <EventIcon fontSize="large" className={classes.icon} />{" "}
                {moment(eventInfo.startDate).format(DATE_FORMAT)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                <HourglassEmptyIcon fontSize="large" className={classes.icon} />{" "}
                {getDuration(eventInfo.startDate, eventInfo.endDate)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                <LocationOnIcon fontSize="large" className={classes.icon} />{" "}
                {eventInfo.location}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container className={classes.details}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                About
              </Typography>
              <Typography>{eventInfo.description}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container className={classes.gallery}>
            <Grid container item className={classes.galleryTitle}>
              <Grid item>
                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.details}
                >
                  Posts
                </Typography>
              </Grid>
              <Grid hidden={!hostingEvent} item className={classes.createPost}>
                <ButtonToolbar>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => setCreatePostModalShow(true)}
                  >
                    Add Post
                  </Button>
                  <PostCreateModal
                    show={createPostModalShow}
                    onHide={() => setCreatePostModalShow(false)}
                    eventId={eventId}
                    uid={identity.uid}
                    createdIndicator={updateTracker}
                    setIndicator={setUpdateTracker}
                  />
                </ButtonToolbar>
              </Grid>
            </Grid>
            <PostGallery
              posts={eventInfo.posts}
              changedIndicator={updateTracker}
              setIndicator={setUpdateTracker}
            />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
};

export const Event = withGlobalContext(withIdentity(_Event));
