"use client";
import { useBackend } from "@/hooks/useBackend";
import React, { useEffect, useState } from "react";
import { DisplayObject } from "../server/Utils";

const BackendTest = () => {
    const {
        data:    testData,
        loading: testLoad,
        error:   testError
    } = useBackend("/backend/");

    return (
        <>
            { testLoad && <div>Loading...</div>}
            { testError && <div>Error! {testError} </div> }
            <DisplayObject
                data={testData?.data}
                Out={({d, i}) => (
                    <div>
                        {i}{" "}
                        {d.name}{" "}
                        {d.date_created}{" "}
                    </div>
                )}
            />
        </>
    );
};

export default BackendTest;