"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
    toast.success('welcome')
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6 max-w-2xl mx-auto border mt-30">
      <Surface className="w-full">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Signup</Fieldset.Legend>
            <Description>Create your account</Description>
            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Button type="submit" className={"w-full"}>
              Signin
            </Button>
          </Fieldset>
        </Form>
         <div className="flex justify-center my-3">
                <h2>don`t have an Account? <Link href={'/signup'}><span className="text-blue-400 hover:underline">signup instead</span></Link></h2>
              </div>
      </Surface>
    </div>
  );
}
