import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  defaultThemeImg: {
    position: "relative",
    width: "100%",
    height: 400,
    marginBottom: theme.spacing(2),
    backgroundImage:
      "url(https://project-bes.s3.ca-central-1.amazonaws.com/solid-gray-background-8438-4.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  themeImg: {
    width: "100%",
    objectFit: "cover",
    height: "100%"
  }
}));

type ThemeImageProps = {
  imageLink?: string;
};

export const ThemeImage: React.FC<ThemeImageProps> = ({ imageLink }) => {
  const classes = useStyles();

  return (
    <div className={classes.defaultThemeImg}>
      <img src={imageLink} className={classes.themeImg} alt="" />
    </div>
  );
};
