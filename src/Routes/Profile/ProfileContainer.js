import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
  query seeUser($name: String!) {
    seeUser(name: $name) {
      id
      avatar
      name
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    console.log(username);
    const { data, loading } = useQuery(GET_USER, {
      variables: { name: username },
    });
    const logOut = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
  }
);
