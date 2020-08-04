import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const cartItemsVar = ["SAMPLE ITEM"];
const cache = new InMemoryCache({
  typePolicies: {
    AllUsers: {
      fields: {
        handsome: {
          read() {
            return "YES";
          },
        },
      },
    },
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar;
          },
        },
      },
    },
  },
});
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // uri: "http://133.186.241.220:7000/",
  cache,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
