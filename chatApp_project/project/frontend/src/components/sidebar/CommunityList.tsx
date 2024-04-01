import React, { useEffect } from "react";
import { withGlobalContext } from "../../contexts/GlobalContext";
import { SidebarListItem } from "./SidebarListItem";
import {
  fetchAllCommunities,
  fetchJoinedCommunities
} from "../../contexts/actions/community";
import { getCommunityById } from "../../utilities/getCommunityById";
import { withRouter } from "react-router-dom";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";

const _CommunityList = ({ globalContext, history, location }: any) => {
  useEffect(() => {
    globalContext.dispatch(fetchAllCommunities, {});
    globalContext.dispatch(fetchJoinedCommunities, {});
  }, []);

  const { joinedCommunities } = globalContext.state;

  const getCommunityName = (id: number) => {
    const community = getCommunityById(
      globalContext.state.communities || [],
      id
    );
    if (!community) {
      return id + " loading...";
    } else {
      return community.name;
    }
  };

  const isCurrentCommunity = (communityId: string) => {
    return location.pathname.match(
      "^/dashboard/communities/" + communityId + "$"
    );
  };

  return (
    <div>
      {(joinedCommunities || []).map((community: any) => {
        return (
          <SidebarListItem
            key={community.communityId}
            active={isCurrentCommunity(community.communityId)}
            onClick={() => {
              history.push("/dashboard/communities/" + community.communityId);
            }}
          >
            <LabelImportantIcon
              style={{ verticalAlign: "bottom" }}
              fontSize="small"
              color="secondary"
            />{" "}
            {getCommunityName(community.communityId)}
          </SidebarListItem>
        );
      })}
    </div>
  );
};

export const CommunityList = withGlobalContext(withRouter(_CommunityList));
