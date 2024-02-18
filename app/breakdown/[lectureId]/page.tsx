"use client";
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/router";

export default function QuestionBreakdown({ params }) {
  const { user } = useUser();
  // const router = useRouter();
  console.log(params.lectureId);
  const data = useQuery(api.studentResponses.getResponseScore, {
    lectureId: params.lectureId,
  });
  console.log(data);

  // const data = [
  //   {
  //     question:
  //       "Lorem ipsum dolor sit amet, consectetur and the winner of the award is ",
  //     percentage: "%",
  //   },
  //   { question: "adipiscing elit, sed do eiusmod tempor", percentage: "60%" },
  //   {
  //     question: "incididunt ut labore et dolore magna aliqua",
  //     percentage: "90%",
  //   },
  //   { question: "Ut enim ad minim veniam, quis nostrud", percentage: "75%" },
  //   { question: "exercitation ullamco laboris nisi ut", percentage: "85%" },
  //   { question: "aliquip ex ea commodo consequat", percentage: "70%" },
  // ];

  // Initialize visibility states for n cards
  const initialVisibilityStates = Array(data?.length ?? 0).fill(true);
  const [cardVisibilities, setCardVisibilities] = useState(
    initialVisibilityStates
  );

  const toggleCardVisibility = (index: number) => {
    // Added type annotation for index
    const newVisibilities = [...cardVisibilities];
    newVisibilities[index] = !newVisibilities[index];
    setCardVisibilities(newVisibilities);
  };

  return (
    <div style={{ marginLeft: "5%" }}>
      {" "}
      {/* Added left margin to the entire page */}
      <div style={{ marginTop: "10%", marginBottom: "20%" }}>
        {" "}
        {/* Added vertical margin before the first question */}
        <h1
          style={{
            fontSize: "2em",
            marginLeft: "20%",
            marginBottom: "0.5em",
            fontWeight: "bold",
          }}
        >
          Questions from Lecture 1
        </h1>{" "}
        {/* Made title larger, bold, and horizontally in line with Questions */}
        {Array.from({ length: data?.length ?? 0 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-start"
            style={{ width: "60%", margin: "0 auto" }}
          >
            {" "}
            {/* Adjusted width to 60% and centered */}
            <div
              className="cursor-pointer p-4 text-xl font-semibold flex items-center"
              onClick={() => toggleCardVisibility(index)}
            >
              {cardVisibilities[index] ? (
                <span style={{ fontSize: "0.75em" }}>&#9660;</span>
              ) : (
                <span style={{ fontSize: "0.75em" }}>&#9654;</span>
              )}{" "}
              {/* Toggle arrow direction and reduced size */}
              {data && (
                <span className="ml-2">
                  Question {index + 1}: {data[index][0].questionText}
                </span>
              )}
            </div>
            {cardVisibilities[index] && data?.[index] && (
              <Card>
                <div className="flex items-center justify-start">
                  <div className="w-full flex justify-start">
                    <div className="w-full">
                      {" "}
                      {/* Adjusted width to full to utilize Card's width */}
                      <Table className="w-full mx-auto">
                        {" "}
                        {/* Adjusted Table width to full to match the new Card width */}
                        <TableBody className="divide-y">
                          {data[index].map((item, itemIndex) => (
                            <TableRow key={itemIndex} className="text-sm">
                              <TableCell className="w-3/4">
                                {item.responseText}
                              </TableCell>
                              <TableCell>{item.score}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
