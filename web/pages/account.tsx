import { NextPage } from "next";
import { Layout } from "../components/Layout";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";
import { FormInput } from "../components/FormInput";
import { FormEvent, useEffect, useState } from "react";
import { FieldError } from "../types";
import { UPDATE_USER_MUTATION } from "../graphql/mutations";

const AccountPage: NextPage = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [fieldError, setFieldError] = useState<FieldError>(null);
  const { data, error } = useQuery(ME_QUERY);
  const [updateUsernameOrEmail] = useMutation(UPDATE_USER_MUTATION);

  useEffect(() => {
    if (data) {
      setNewUsername(data.me.username);
      setNewEmail(data.me.email);
    }
  }, [data]);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUsername === "" && newEmail === "") {
      setFieldError({
        field: "username",
        message: "Please fill in atleast one field",
      });
    }
    if (newUsername === username && newEmail === email) {
      setFieldError({
        field: "username",
        message: "You have not changed anything",
      });
    }
    const response = await updateUsernameOrEmail({
      variables: {
        options: {
          username: newUsername,
          email: newEmail,
        },
      },
    });
    const { error } = response.data.updateUsernameOrEmail;
    if (error) {
      setFieldError(response.data.updateUsernameOrEmail.error);
    }
  };

  return (
    <Layout>
      <div className="h-full flex flex-col items-center justify-center">
        <Image src="/icons/user.svg" width={100} height={100} />
        <div className="text-lg font-headings mb-8">{username}</div>
        <form onSubmit={(e) => handleSubmit(e)} className="w-1/4">
          <div className="mb-1 text-sm">Username</div>
          <FormInput
            value={newUsername}
            setValue={setNewUsername}
            error={fieldError}
            field="username"
          />
          <div className="mb-1 text-sm">Email</div>
          <FormInput
            value={newEmail}
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
