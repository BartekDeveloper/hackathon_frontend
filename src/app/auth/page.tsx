import React, { memo, Suspense } from "react";
import SignIn from "../../components/client/sign-in";
import SignUp from "../../components/client/sign-up"
import { auth } from "@/auth-server"
import { headers } from "next/headers"

const Home = async() => {
  const session = await auth.api.getSession({
      headers: await headers()
  })
  
  const Hello = () => {
    if(session) {
      return (
        <div>
            <h1>Welcome {session.user.name}</h1>
        </div>
      );
    }

    return (<></>);
  }

  const Login = memo(() => {
    "use client;"
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SignIn />
        <SignUp />
      </Suspense>
    );
  });

  return (
    <>
      <Hello />
      <Login />
    </>
  );
}
export default Home;