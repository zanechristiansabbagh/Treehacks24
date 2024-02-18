"use client";
import React, { useEffect, useState } from "react";
import { get } from "../convex/tasks.js";
import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { HomeUnauth } from "@/components/home-unauth";
import HomeAuth from "@/components/home-auth";


export default function Component() {
  const { user, error, isLoading } = useUser();
  const tasksQueryResult = useQuery(api.tasks.get);
  const tasksId = tasksQueryResult ? tasksQueryResult[0]?.id : "";
  // const [profID, setProfID] = useState('');

  // useEffect(() => {
  //   const id = get(); // Assuming getTasks returns profID directly
  //   setProfID(id);
  // }, []);

  return user ? (
    <HomeAuth />
  ) : (
    // <a href="/api/auth/login">login</a>
    <HomeUnauth />
  );
}
