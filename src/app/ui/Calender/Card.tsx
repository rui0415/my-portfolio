"use client"

import React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { type User } from '@supabase/supabase-js'
import { createClient } from '../../../../utils/supabase/client';

type CardProps = {
    day: number,
    weekday: number,
    todayFlag: boolean,
    user: User | null,
}

const ToolTip = (props:{day:number, weekday:number, user:User | null}) => {
    let classname;
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
  
    const getProfile = useCallback(async () => {
        try {
          setLoading(true)
    
          const { data, error, status } = await supabase
            .from('schedule')
            .select('*')
            .eq('user_id', props.user?.id)
    
          if (error && status !== 406) {
            console.log(error)
            throw error
          }
    
          if (data) {
            console.log(data)
            // setFullname(data.full_name)
            // setUsername(data.username)
            // setWebsite(data.website)
            // setAvatarUrl(data.avatar_url)
          }
        } catch (error) {
          alert('Error loading user data!')
        } finally {
          setLoading(false)
        }
      }, [props.user, supabase])
    
      useEffect(() => {
        getProfile()
      }, [props.user, getProfile])
    
    //   async function updateProfile({
    //     username,
    //     website,
    //     avatar_url,
    //   }: {
    //     username: string | null
    //     fullname: string | null
    //     website: string | null
    //     avatar_url: string | null
    //   }) {
    //     try {
    //       setLoading(true)
    
    //       const { error } = await supabase.from('profiles').upsert({
    //         id: props.user?.id as string,
    //         full_name: fullname,
    //         username,
    //         website,
    //         avatar_url,
    //         updated_at: new Date().toISOString(),
    //       })
    //       if (error) throw error
    //       alert('Profile updated!')
    //     } catch (error) {
    //       alert('Error updating the data!')
    //     } finally {
    //       setLoading(false)
    //     }
    //   }

    switch (props.weekday) {
        case 0:
            classname = "translate-x-20";
            break;
        case 1:
            classname = "translate-x-20";
            break;
        case 2:
            classname = "translate-x-20";
            break;
        case 3:
            classname = "translate-x-20";
            break;
        case 4:
            classname = "-translate-x-24";
            break;
        case 5:
            classname = "-translate-x-24";
            break;
        case 6:
            classname = "-translate-x-24";
            break;
        default:
            classname = ''; // Handle any other cases    
    }

    return (
        <div
        className={`rounded transition duration-500 bg-cyan-300 text-gray-800 z-50 px-2 py-1 absolute pointer-events-none opacity-0 group-hover:opacity-100 -top-1/2 ${classname}`}>
            <span className='whitespace-nowrap font-semibold'>
                <span className='font-extrabold p-1'>{props.day}</span>日の予定
            </span>
            <div className='whitespace-normal '>
                <p>{loading}</p>
            </div>
        </div>
    )
}

const Card:React.FC<CardProps> = ({ day, weekday, todayFlag, user }) => {
    return (
        <span className='relative group'>
            <ToolTip  day={day} weekday={weekday} user={user}/>
            <div className={`${todayFlag ? 'bg-green-200' :'bg-white'} rounded-sm border border-black p-1`}>
            <span className={`font-extrabold block text-center border-b-2 border-black ${weekday === 0 ? "text-red-500":''} ${weekday === 6 ? "text-blue-600":''} ${weekday !== 0 && weekday !== 6 ? "text-black":''}`}>
                {day}
            </span>
            </div>
        </span>
        
    );
}

export default Card;