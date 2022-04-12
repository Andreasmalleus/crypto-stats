import { NextPage } from "next";
import { Layout } from "../components/Layout";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";
import { FormInput } from "../components/FormInput";
import { FormEvent, useState } from "react";
import { FieldError } from "../types";

const AccountPage: NextPage = () => {
  const { data, error } = useQuery(ME_QUERY);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [fieldError, setFieldError] = useState<FieldError>(null);

  if (error || !data) {
    return (
      <Layout>
        <div className="h-full w-full flex justify-center items-center">
          Something went wrong...
        </div>
      </Layout>
    );
  }

  const { username, email } = data?.me;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Layout>
      <div className="h-full flex flex-col items-center justify-center">
        <Image src="/icons/user.svg" width={100} height={100} />
        <div className="text-lg font-headings mb-8">{username}</div>
        <form onSubmit={(e) => handleSubmit(e)} className="w-1/4">
          <div className="mb-1 text-sm">Username</div>
          <FormInput
            value={username}
            setValue={setNewUsername}
            error={fieldError}
            field="username"
          />
          <div className="mb-1 text-sm">Email</div>
          <FormInput
            value={email}
            setValue={setNewEmail}
            error={fieldError}
            field="email"
          />
          <button className="btn-primary mt-1 shadow-md">Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default AccountPage;
