import React, {useEffect, useState} from "react";
import CommunityService from "../services/CommunityService"

export const Communities = () => {
  const [allCommunities, setAllCommunities]: [Array<any>, any] = useState([]);

  useEffect(() => {
    getCommunities();
  }, []);

  const getCommunities = async () => {
    try {
      const allComms = await CommunityService.getAllCommunities();
      setAllCommunities(allComms);
    }
    catch(error) {
      console.error(error);
    }
  };

  return (
    <div>
      Communities:
      <ul>
        {allCommunities.map(singleCommunity => {
          return (
            <li>
              {singleCommunity.name}
              <ul>
              {(singleCommunity.subcommunities || []).map((subCommunity: { name: React.ReactNode; subcommunities: any; }) => {
                 return (
                   <li>
                   {subCommunity.name}
                   <ul>
                   {(subCommunity.subcommunities || []).map((lowLevelCommunity: { name: React.ReactNode; }) => {
                      return (
                        <li>
                        {lowLevelCommunity.name}
                        </li>
                        )
                        })}
                   </ul>
                   </li>
                   )
              })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
