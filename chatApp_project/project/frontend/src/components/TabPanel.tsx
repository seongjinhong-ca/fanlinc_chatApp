import React from "react";

type TabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index
}) => {
  return <div hidden={value !== index}>{children}</div>;
};
