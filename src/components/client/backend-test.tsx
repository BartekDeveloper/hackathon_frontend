"use client";
import { useBackend } from "@/hooks/useBackend";
import React, { useEffect, useState } from "react";
import { DisplayObject } from "../server/Utils";

const BackendTest = () => {
    const { data, loading, error } = useBackend("/backend/");

    return (
        <>
            { loading && <div>Loading...</div>}
            { error && <div>Error! {error} </div> }
            <DisplayObject
                data={data?.data}
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