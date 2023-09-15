"use client"
import { useSession } from "next-auth/react";
import Common from "../../../components/common";
export default function page(){
    const {data:session} = useSession();
    console.log(session);
    if(!session){
        return '';
    }
    const userImage = session?.user?.image;
    const userName = session?.user?.name;
    return (
        <Common><div className="flex items-center justify-between">
            <div>Hello {userName} , How are you ? </div> <div className="flex items-center justify-center gap-x-4"><div>{userName}</div> <img className="rounded-lg" src={userImage} width={'40px'}></img> </div>
            </div></Common>
    )
}