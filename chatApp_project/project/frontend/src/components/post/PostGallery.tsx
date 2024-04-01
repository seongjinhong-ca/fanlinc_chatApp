import React, { useEffect, useState } from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core";
import { PostData, PostViewModal } from "./PostViewModal";
import moment from "moment";
import { handleImageError } from "../../utilities/imageErrorHandle";

const useStyles = makeStyles(() => ({
  postImage: {
    cursor: "pointer",
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
}));

type PostGalleryProps = {
  posts: Array<PostData>;
  changedIndicator: boolean;
  setIndicator: (changed: boolean) => void;
};

const DEFAULT_IMAGE_LINK =
  "https://project-bes.s3.ca-central-1.amazonaws.com/image-not-available.png";

export const PostGallery: React.FC<PostGalleryProps> = ({
  posts,
  changedIndicator,
  setIndicator
}) => {
  const classes = useStyles();
  const [clickedPostIndex, setClickedPostIndex] = useState(0);
  const [showPostModal, setShowPostModal] = useState(false);
  const [sortedPosts, setSortedPosts]: [Array<PostData>, any] = useState(posts);

  useEffect(() => {
    setSortedPosts(sortPosts(posts));
  }, [posts]);

  const handlePostImageClick = (index: number) => {
    setClickedPostIndex(index);
    setShowPostModal(true);
  };

  const sortPosts = (posts: Array<PostData>) => {
    return posts.sort((p1, p2) =>
      moment(p2.postedDate).diff(moment(p1.postedDate))
    );
  };

  return (
    <GridList cellHeight={225} cols={4}>
      {posts.map((post, index) => (
        <GridListTile key={post.id}>
          <img
            alt=""
            className={classes.postImage}
            src={post.imageLink}
            onClick={() => handlePostImageClick(index)}
            onError={e => handleImageError(e, DEFAULT_IMAGE_LINK)}
          />
        </GridListTile>
      ))}
      <PostViewModal
        postList={sortedPosts}
        currentPostIndex={clickedPostIndex}
        setCurrentPostIndex={setClickedPostIndex}
        show={showPostModal}
        onHide={() => setShowPostModal(false)}
        setIndicator={setIndicator}
        changedIndicator={changedIndicator}
      />
    </GridList>
  );
};
