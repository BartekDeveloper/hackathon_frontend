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

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI ?? "127.0.0.1:8080";

const makeApiCall = async (endpoint, data) => {
  try {
    const response = await fetch(`http://${BACKEND_URI}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed: ${response.status} - ${errorText}`);
    }
    return await response.json();
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
        return makeApiCall("/deleteMany", { model, where });
      },

      /**
       * Finds multiple documents based on a query.
       */
      findMany: async({ model, where, limit, sortBy, offset, }) => {
        return makeApiCall("/findMany", { model, where, limit, sortBy, offset });
      },

      /**
       * Finds a single document based on a query.
       */
      findOne: async({ model, where, select, }) => {
        console.log("~-~ Find One ~-~");
        console.log("Model:", model);
        console.log("Where:", where);
        console.log("Select:", select);
        return makeApiCall("/findOne", { model, where, select });
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
        return makeApiCall("/updateMany", { model, where, update });
      },

      /**
       * Creates or updates the database schema.
       */
      createSchema: async(props) => {
        return makeApiCall("/createSchema", props);
      },
    }
  }
});

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {}
    },
    socialProviders: {
        linkedin: {
            clientId:     process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        },
        microsoft: {
            clientId:     process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET
        }
    },
    plugins: [
        passkey(),
    ],
    // Corrected line: We call the function with parentheses!
    database: goBackendAdapter(),
});
