import React from "react";
import { withGlobalContext } from "../../contexts/GlobalContext";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { UsernameText } from "../UsernameText";

const DEFAULT_AVATAR =
  "https://project-bes.s3.ca-central-1.amazonaws.com/test/noavatar-png-6.png";

const _ProfileHeading = ({ globalContext, history }: any) => {
  const { identity } = globalContext.state;
  return (
    <ProfileHeadingContainer
      onClick={() => {
        history.push("/dashboard/profile");
      }}
    >
      <ProfileInfoWrapper>
        <AvatarWrapper>
          <img
            alt=""
            style={avatarImageStyle}
            src={identity.profileImage ? identity.profileImage : ""}
          />
        </AvatarWrapper>
        {identity ? (
          <ProfileDetailedInfoWrapper>
            <UserName>
              <UsernameText username={identity.username} isPro={true} />
            </UserName>
            <UserEmail>{identity.email}</UserEmail>
          </ProfileDetailedInfoWrapper>
        ) : (
          <ProfileDetailedInfoWrapper>
            <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true" />
          </ProfileDetailedInfoWrapper>
        )}
      </ProfileInfoWrapper>
    </ProfileHeadingContainer>
  );
};

const ProfileInfoWrapper = styled.div``;

const AvatarWrapper = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  background-image: url(${DEFAULT_AVATAR});
  background-size: cover;
  background-position: center;
  border-radius: 100px;
  vertical-align: middle;
`;

const avatarImageStyle = {
  width: "100%",
  height: "100%",
  objectPosition: "center",
  objectFit: "cover" as "cover"
};

const ProfileDetailedInfoWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
`;

const ProfileHeadingContainer = styled.div`
  padding: 10px 20px 10px 20px;
  border-bottom: #dfdfdf 1px solid;
  transition: all ease 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #dfdfdf;
    transition: all ease 0.3s;
  }
`;

const UserName = styled.div`
  font-size: 18px;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: #878787;
`;

export const ProfileHeading = withGlobalContext(withRouter(_ProfileHeading));
