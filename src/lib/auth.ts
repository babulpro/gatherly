import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
 

const mongodbUrl = process.env.MONGODB_URI;

 

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not defined");
}

const client = new MongoClient(mongodbUrl);
const db = client.db();

export const auth = betterAuth({
   baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: { 
          enabled: true, 
                 }, 
      
      socialProviders: {
        facebook: { 
            clientId: process.env.FACEBOOK_CLIENT_ID as string, 
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRECT as string, 
        }, 
         
    },
      database: mongodbAdapter(db, {
        client,
      }),
});  