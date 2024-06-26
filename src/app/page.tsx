"use client"
import React, { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import Calendar from "./ui/Calender/Calender";
import Loading from "./loading";
import { redirect, useRouter } from "next/navigation";
import {signout} from "./auth/signout/action";

export default async function Home(){
    const [loading, setLoading] = useState(true);

    const supabase = createClient();
    const router = useRouter();
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      console.error(error);
      router.push('/signin');
    }

    return (
      <div>
        <div className="flex">
        <div>
          <form>
            <button formAction={signout}
             className="bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded-lg">
              サインアウト
            </button>
          </form>
        </div>
        </div>
        <Calendar user={data.user}/>
      </div>
    );

}