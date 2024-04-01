import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    height: 210
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: "60%"
  },
  bottomText: {
    position: "absolute",
    bottom: 10
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
}));

type PreviewProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  redirectLink?: string;
  onClick?: any;
  bottomText?: string;
  defaultImg?: string;
};

const DEFAULT_IMAGE_LINK =
  "https://project-bes.s3.ca-central-1.amazonaws.com/image-not-available.png";

export const Preview: React.FC<PreviewProps> = ({
  title,
  subtitle,
  description,
  image,
  onClick,
  bottomText = "Explore",
  defaultImg = DEFAULT_IMAGE_LINK
}) => {
  const classes = useStyles();

  return (
    <Grid item key={title} xs={12} md={6}>
      <CardActionArea onClick={onClick}>
        <Card className={classes.card}>
          <CardContent className={classes.cardDetails}>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {subtitle}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              className={classes.bottomText}
            >
              {bottomText}
            </Typography>
          </CardContent>
          <CardMedia className={classes.cardMedia} image={defaultImg}>
            <img alt="" src={image ? image : ""} className={classes.img} />
          </CardMedia>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
