import { betterAuth } from 'better-auth';
import { passkey } from 'better-auth/plugins/passkey';

import {
  createAdapter,
  type AdapterDebugLogs
} from "better-auth/adapters";

interface AdapterConfig {
  debugLogs?: AdapterDebugLogs;
  usePlural?: boolean;
}

const BACKEND_URL = "http://127.0.0.1:8080";
const WEBSITE_URL = process.env.NEXT_PUBLIC_URL || "127.0.0.1:3000";

const makeApiCall = async (endpoint, data) => {
  try {
    const body = JSON.stringify(data);
    // console.log(body);

    const url = `${BACKEND_URL}${endpoint}`;
    // console.log(url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
      redirect: "follow"
    });
    
    const ret = await response.json();

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} - ${response.statusText}:\t${ret?.error || ""}`);
    }

    return ret
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

const goBackendAdapter = () => createAdapter({
  config: {
    supportsBooleans: true,
    supportsJSON: true,
    supportsDates: true,
    supportsNumericIds: true,
    adapterId: "go-adapter",
    adapterName: "Go Backend Adapter"
  },

  adapter: ({}) => {
    return {
      /**
       * Counts the number of documents in a collection based on a query.
       */
      count: async({ model, where, }) => {
        return makeApiCall("/count", { model, where });
      },

      /**
       * Creates a new document in the database.
       */
      create: async({ data, model, select, }) => {
        return makeApiCall("/create", { model, data, select });
      },

      /**
       * Deletes a single document.
       */
      delete: async({ model, where, }) => {
        return makeApiCall("/delete", { model, where });
      },

      /**
       * Deletes multiple documents.
       */
      deleteMany: async({ model, where, }) => {
        return makeApiCall("/delete-many", { model, where });
      },

      /**
       * Finds multiple documents based on a query.
       */
      findMany: async({ model, where, limit, sortBy, offset, }) => {
        return makeApiCall("/find-many", { model, where, limit, sortBy, offset });
      },

      /**
       * Finds a single document based on a query.
       */
      findOne: async({ model, where, select }) => {
        const result = await makeApiCall("/find-one", { model, where, select });
        if (result && result.error === "empty") {
          return null; // Return null if the backend indicates no record found
        }
        return result;
      },

      /**
       * Updates a single document.
       */
      update: async({ model, where, update, }) => {
        return makeApiCall("/update", { model, where, update });
      },

      /**
       * Updates multiple documents.
       */
      updateMany: async({ model, where, update }) => {
        return makeApiCall("/update-many", { model, where, update });
      },

      /**
       * Creates or updates the database schema.
       */
      createSchema: async(props) => {
        return makeApiCall("/create-schema", props);
      },
    }
  }
});

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {}
    },
    socialProviders: {},
    plugins: [
        passkey(),
    ],
    // Corrected line: We call the function with parentheses!
    database: goBackendAdapter(),
});
