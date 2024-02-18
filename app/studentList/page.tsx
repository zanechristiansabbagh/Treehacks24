"use client";
import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function StudentTable() {
  const { user } = useUser();
  const data = useQuery(api.classes.getStudentInfo, { email: user.email });

  return (
    <>
      {data && (
        <div className="flex justify-between items-center mb-4 w-full">
          <h1 className="text-3xl font-bold tracking-tighter">
            Students <span style={{ color: "gray" }}>{`(${data.length})`}</span>
          </h1>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full flex justify-start items-center bg-red"></div>
        <div className="flex justify-center items-center w-full ">
          <div className="bg-gray-800 rounded-lg shadow p-4 w-full">
            <Table className="mx-auto text-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]" />
                  <TableHead className="text-left">Name</TableHead>
                  <TableHead className="text-right">
                    Cumulative questions completed
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          alt="Avatar"
                          className="rounded-full"
                          height="32"
                          src={"/placeholder.svg"}
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end">
                        <div className="relative mr-2 w-full max-w-[100px] h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
                            style={{
                              width: `${student.cumulativeQuestions * 100}%`,
                              backgroundColor: `hsl(${
                                student.cumulativeQuestions * 100 + 100
                              }, 70%, 40%)`,
                            }}
                          ></div>
                        </div>
                        {Math.round(student.cumulativeQuestions * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
