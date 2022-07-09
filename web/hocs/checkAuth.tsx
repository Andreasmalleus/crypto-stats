import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { ME_QUERY } from "../graphql/queries";

const checkAuth =
  (Component: React.FC) =>
  ({ ...props }) => {
    const { data, loading } = useQuery(ME_QUERY);
    const router = useRouter();

    if (data?.me && !loading) {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  };

export default checkAuth;
