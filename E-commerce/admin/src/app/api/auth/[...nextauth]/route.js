// "use client"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../../../lib/mongoAdapter"
// const {data:session} = useSession();
// console.log('THE SESSION OBJECT INSIDE AUTH ROUTE',session);

const isAdmin = ['manushresth.official24669@gmail.com'];
const authOptions =  {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret : process.env.GITHUB_CLIENT_SECRET
    })
  ],
  adapter : MongoDBAdapter(clientPromise),
  callbacks : {
    
    session : ({session,token,user}) => {
      
      console.log('THE SESSION INFO IS  : ',session);
      console.log('THE USER EMAIL IS : ',session?.user?.email)
      if(isAdmin.includes(session?.user?.email)){
        return session;
        
      }else{
        
        return null;
      }
    }
  }
}

export const isAdminCheck = async() => {
  try{
    const session = await getServerSession(authOptions);
    console.log('THE IS ADMIN CHECK SESSION IS : ',session);
    if(!isAdmin.includes(session?.user?.email)){
      throw 'not admin';
    }
  }catch(err){
    // console.log('THE ERROR IS : ',err);
    return true;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

