import React, { memo, Suspense } from "react";
import BackendTest from "@/components/client/backend-test";

const Home = () => {
  return (
    <>
      <a className="text-blue-500" href="auth">Auth (W.I.P)</a>
      
      <Suspense fallback={<div>Loading...</div>}>
        <BackendTest />
      </Suspense>
    </>
  );
}
export default Home;