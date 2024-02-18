"use client";
import React from "react";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"


export default function StudentTable() {

  const studentsData = [
    { name: "Alice", progress: 80, avatar: "/placeholder.svg" }, 
    { name: "Bob", progress: 90, avatar: "/placeholder.svg" },
    { name: "Charlie", progress: 70, avatar: "/placeholder.svg" },
    { name: "Diana", progress: 60, avatar: "/placeholder.svg" },
    { name: "Eve", progress: 75, avatar: "/placeholder.svg" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex justify-start items-center bg-red">
      </div>
      <div className="flex justify-center items-center w-full ">
        <div className="bg-gray-800 rounded-lg shadow p-4 w-full">
          <Table className="mx-auto text-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]" />
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-right">Cumulative questions completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsData.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="32"
                      src={student.avatar}
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-right flex items-center justify-end">
                    <div className="relative mr-2 w-full max-w-[100px] h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-green-600 rounded-full" style={{width: `${student.progress}%`, backgroundColor: `hsl(${student.progress + 100}, 70%, 40%)`}}></div>
                    </div>
                    {student.progress}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
         
        </div>
        
      </div>
      
    </div>
  )
}

