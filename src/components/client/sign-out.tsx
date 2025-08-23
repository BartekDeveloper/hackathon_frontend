"use client";
import { authClient } from "@/auth-client";

export default function SignOut() {
    return(
        <button
            onClick={() => {
                authClient.signOut();
                setInterval(() => window.location.reload(), 2500);
            }}
            className="m-2 px-8 py-2 bg-blue-900 rounded-2xl hover:bg-blue-950 focus:bg-blue-950 active:bg-blue-600"
        >
            Sign Out
        </button>
    );
}
