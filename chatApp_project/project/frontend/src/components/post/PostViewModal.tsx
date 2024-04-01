import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { SettingsMenu } from "../SettingsMenu";
import Textarea from "react-expanding-textarea";
import Button from "@material-ui/core/Button";
import UserProfileService from "../../services/UserProfileService";
import { confirm } from "../../utilities/confirm";
import { asyncDelay } from "../../utilities/asyncDelay";
import { withGlobalContext } from "../../contexts/GlobalContext";
import IdentityService from "../../services/IdentityService";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    minHeight: 350,
    maxHeight: 500
  },
  cardDetails: {
    flex: 1,
    wordBreak: "break-all"
  },
  cardHeader: {
    padding: "0 0 16px 0"
  },
  cardMedia: {
    width: "60%"
  },
  postImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  description: {
    border: "none",
    width: "100%",
    outline: "none",
    resize: "none"
  },
  outlined: {
    outline: "1px solid #4db8ff"
  },
  saveButton: {
    float: "right"
  },
  cancelButton: {
    float: "right",
    marginRight: 5
  },
  arrow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto 0",
    color: "floralwhite",
    fontSize: "4.5rem",
    cursor: "pointer"
  },
  nextArrow: {
    right: "-9vw"
  },
  prevArrow: {
    left: "-9vw"
  },
  hidden: {
    display: "none"
  }
}));

export type PostData = {
  userUid: string;
  id: string;
  description: string;
  postedDate: string;
  imageLink: string;
};

type PostModalProps = {
  postList: Array<PostData>;
  currentPostIndex: number;
  setCurrentPostIndex: (index: number) => void;
  show: boolean;
  onHide: () => void;
  changedIndicator: boolean;
  setIndicator: (changed: boolean) => void;
  globalContext: any;
};

const DEFAULT_IMAGE_LINK =
  "https://project-bes.s3.ca-central-1.amazonaws.com/image-not-available.png";
const DEFAULT_AVATAR =
  "https://project-bes.s3.ca-central-1.amazonaws.com/test/noavatar-png-6.png";

const DATE_FORMAT = "LL";

export const _PostViewModal: React.FC<PostModalProps> = ({
  postList,
  currentPostIndex,
  setCurrentPostIndex,
  show,
  onHide,
  changedIndicator,
  setIndicator,
  globalContext
}) => {
  const { uid } = globalContext.state.identity;
  const classes = useStyles();
  const [curPostIndex, setCurPostIndex] = useState(currentPostIndex);
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [isPostPoster, setIsPostPoster] = useState();
  const [loading, setLoading] = useState(false);
  const [posterInfo, setPosterInfo] = useState();
  const curPostInfo: PostData | null =
    postList.length !== 0 ? postList[curPostIndex] : null;
  const hasNext = postList.length - 1 > curPostIndex;
  const hasPrev = curPostIndex > 0;

  useEffect(() => {
    const getPosterInfo = async () => {
      if (postList.length > 0 && currentPostIndex < postList.length) {
        const posterUid = postList[currentPostIndex].userUid;
        setIsPostPoster(posterUid === uid);
        setCurPostIndex(currentPostIndex);
        setPosterInfo(await IdentityService.getInfo(posterUid));
      }
    };

    getPosterInfo().then(() => {});
  }, [currentPostIndex, postList, uid]);

  const handleDelete = async (postId: string) => {
    confirm("Are you sure you delete this Post?").then(
      async () => {
        await UserProfileService.deletePost(uid, postId);
        setCurPostIndex(0);
        setIndicator(!changedIndicator);
        onHide();
      },
      () => {}
    );
  };

  const handleSave = async (postId: string) => {
    setLoading(true);
    await UserProfileService.editPost(uid, postId, editedDescription);
    setIndicator(!changedIndicator);
    await asyncDelay(100);
    setLoading(false);
    setEditMode(false);
  };

  const customHide = () => {
    setEditMode(false);
    onHide();
  };

  const handleEdit = () => {
    curPostInfo && setEditedDescription(curPostInfo.description);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return !curPostInfo || !posterInfo ? null : (
    <Modal size="lg" show={show} onHide={customHide} centered>
      <Modal.Body>
        <Grid item key={curPostInfo.id}>
          <Card className={classes.card}>
            <CardMedia className={classes.cardMedia} image={DEFAULT_IMAGE_LINK}>
              <img
                alt=""
                src={curPostInfo.imageLink}
                className={classes.postImg}
              />
            </CardMedia>
            <CardContent className={classes.cardDetails}>
              <CardHeader
                className={classes.cardHeader}
                avatar={
                  <Avatar
                    aria-label="recipe"
                    src={
                      posterInfo["profile-picture"]
                        ? posterInfo["profile-picture"]
                        : DEFAULT_AVATAR
                    }
                    alt=""
                  />
                }
                action={
                  <SettingsMenu
                    hidden={!isPostPoster}
                    handleEdit={handleEdit}
                    handleDelete={() => handleDelete(curPostInfo.id)}
                  />
                }
                title={posterInfo.username}
                subheader={moment(curPostInfo.postedDate).format(DATE_FORMAT)}
              />
              <Textarea
                readOnly={!editMode}
                id="description"
                className={
                  editMode
                    ? `${classes.outlined} ${classes.description}`
                    : classes.description
                }
                maxLength="3000"
                placeholder={editMode ? "Enter Description" : ""}
                value={editMode ? editedDescription : curPostInfo.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditedDescription(e.currentTarget.value)
                }
              />
              <Button
                disabled={loading}
                hidden={!editMode}
                variant="contained"
                size="small"
                color="primary"
                className={classes.saveButton}
                onClick={() => handleSave(curPostInfo.id)}
              >
                Save
              </Button>
              <Button
                disabled={loading}
                hidden={!editMode}
                variant="contained"
                size="small"
                className={classes.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Modal.Body>
      <NavigateBeforeIcon
        className={
          hasPrev ? `${classes.arrow} ${classes.prevArrow}` : classes.hidden
        }
        onClick={() => {
          handleCancel();
          setCurrentPostIndex(curPostIndex - 1);
        }}
      />
      <NavigateNextIcon
        className={
          hasNext ? `${classes.arrow} ${classes.nextArrow}` : classes.hidden
        }
        onClick={() => {
          handleCancel();
          setCurrentPostIndex(curPostIndex + 1);
        }}
      />
    </Modal>
  );
};

export const PostViewModal = withGlobalContext(_PostViewModal);
