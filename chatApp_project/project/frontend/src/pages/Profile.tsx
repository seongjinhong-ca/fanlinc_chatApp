import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IdentityService from "../services/IdentityService";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { TextInput } from "../components/TextInput";
import { withGlobalContext } from "../contexts/GlobalContext";
import { withIdentity } from "../hocs/RequireIdentity";
import CardMedia from "@material-ui/core/CardMedia";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Switch from "@material-ui/core/Switch";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useAlert } from "react-alert";
import { setIdentity } from "../contexts/actions/login";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    card: {
      maxWidth: 500,
      margin: "auto"
    },
    media: {
      height: 200
    }
  })
);
export const _Profile = ({ globalContext }: any) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [edit, setEditOpen] = useState(false);
  const [privacy, setPrivacyOpen] = useState(false);
  const [privateFields, setPrivateFields] = useState({
    name: false,
    username: false
  });
  const [image, setImage]: [File | undefined, any] = useState(undefined);
  const uid = globalContext.state.identity.uid;
  const alert = useAlert();
  const classes = useStyles();

  useEffect(() => {
    getUserInfo();
  }, []);

  const editOpen = () => {
    setPrivacyOpen(false);
    setEditOpen(true);
  };

  const editClose = () => {
    setEditOpen(false);
  };

  const privacyOpen = () => {
    setEditOpen(false);
    setPrivacyOpen(true);
  };

  const privacyClose = async () => {
    setPrivacyOpen(false);
    let status = await IdentityService.setPrivateFields(uid, privateFields);
    if (status === -1) {
      alert.error("Failed to update privacy settings");
    }
  };

  const handleChange = (name: any) => (event: any) => {
    setPrivateFields({ ...privateFields, [name]: event.target.checked });
  };

  const submitButtonOnClickHandler = async () => {
    let status = await IdentityService.setName(uid, fullName);
    if (status === -1) {
      alert.error("Failed to update name.");
    }
    status = await IdentityService.setUsername(uid, username);
    if (status === -1) {
      alert.error("Failed to update username.");
    }
    if (!!image) {
      let res: any = await IdentityService.setProfilePicture(image, uid);
      setProfilePic(res.image);
    }
    setEditOpen(false);
    const identity = await IdentityService.getIdentity();
    await globalContext.dispatch(setIdentity, { identity });
  };

  const getUserInfo = async () => {
    const userInfo = await IdentityService.getUserInfo(uid);
    setUsername(userInfo.username);
    setFullName(userInfo.name);
    setProfilePic(userInfo["profile-picture"]);
    userInfo.privateFields &&
      Object.keys(userInfo.private_fields).forEach(function(key) {
        if (key in privateFields) {
          setPrivateFields({
            ...privateFields,
            [key]: userInfo.private_fields[key]
          });
        }
      });
  };

  const onChangeHandler = (event: any) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={profilePic}
            title={fullName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Username: {username}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton onClick={editOpen}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={privacyOpen}>
            <VisibilityIcon />
          </IconButton>
          <br />
        </CardActions>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={edit}
        onClose={editClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={edit}>
          <div className={classes.paper}>
            <TextInput
              placeholder={"Name"}
              text={fullName}
              onTextChange={setFullName}
            />
            <br />
            <TextInput
              placeholder={"Username"}
              text={username}
              onTextChange={setUsername}
            />
            <br />
            <input type="file" name="file" onChange={onChangeHandler} />
            <br />
            <Button onClick={submitButtonOnClickHandler}> Submit </Button>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={privacy}
        onClose={privacyClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={privacy}>
          <div className={classes.paper}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Private Information</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={privateFields.name}
                      onChange={handleChange("name")}
                      value="name"
                    />
                  }
                  label="Name"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={privateFields.username}
                      onChange={handleChange("username")}
                      value="username"
                    />
                  }
                  label="Username"
                />
              </FormGroup>
              <FormHelperText>
                Selected Information will be private
              </FormHelperText>
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export const Profile = withGlobalContext(withIdentity(_Profile));
