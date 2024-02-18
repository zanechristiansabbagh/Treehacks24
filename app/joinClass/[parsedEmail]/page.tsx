import React from "react";
import { JoinClass } from "@/components/join-class"; // Assuming the path is correct based on the provided context

export default function Page({params}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <JoinClass parsedEmail={params.parsedEmail }/>
    </div>
  );
}
