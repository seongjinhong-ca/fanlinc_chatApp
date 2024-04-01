import React from "react";

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  default_image_link: string
) => {
  e.currentTarget.src = default_image_link;
};
