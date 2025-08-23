import React, { memo, Suspense } from "react";
import SignIn from "../../components/client/sign-in";
import SignUp from "../../components/client/sign-up"
import { auth } from "@/auth-server"
import { headers } from "next/headers"
import SignOut from "@/components/client/sign-out";

const Home = async() => {
  const session = await auth.api.getSession({
      headers: await headers()
  })
  
  const Hello = () => {
    return (
      <div>
          { session && <SignOut /> }
          <h1>{session && "Welcome " + session.user.name}</h1>
      </div>
    );

      
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