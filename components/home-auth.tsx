"use client";
import { useRef, useState } from "react"; // Import useRef hook
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../convex/_generated/api";
import { useUser } from "@auth0/nextjs-auth0/client";
import Page from "../app/dashboard/page";
import StudentTable from "@/app/studentList/page";

export default function HomeAuth() {
  const { user } = useUser();
  const router = useRouter();

  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState(false); // State to track if upload is in progress

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const deleteClass = useMutation(api.classes.deleteClass);

  const classes = useQuery(api.classes.get, { userId: user?.email });

  const routeToNavigation = () => {
    router.push("/dashboard");
  };

  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    setIsUploading(false);
    setUploadProgress(0);
    for (const file of uploaded) {
      const response = file.response as any; // Assuming response has the structure we need
      await saveStorageId({
        lectureId: response.storageId,
        userId: user?.email,
      });
    }
  };
  const onUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };
  const onUploadBegin = (fileName: string) => {
    setIsUploading(true);
  };

  const navigateToStudentList = () => {
    router.push("/studentList"); // Trigger click on file input when button is clicked
  };
  const navigateToBreakdown = () => {
    router.push("/breakdown"); // Trigger click on file input when button is clicked
  };
  const logout = () => {
    router.push("/api/auth/logout"); // Trigger click on file input when button is clicked
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {isUploading && (
        <div className="w-full bg-gray-200">
                    
          <div
            className="bg-green-500 text-xs leading-none py-1 text-center text-white"
            style={{ width: `${uploadProgress}%` }}
          >
                        Uploading file...           
          </div>
                  
        </div>
      )}
            
      <main className="flex-1">
                
        <div className="container py-6 px-4 md:py-12 md:px-6">
                    
          <div className="flex items-center gap-4 mb-4">
                        
            <h1
              className="text-3xl font-bold tracking-tighter"
              style={{ marginLeft: "6%" }}
            >
              My Lectures
            </h1>
                        
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={[".pdf", "image/*"]}
              onUploadComplete={saveAfterUpload}
              onUploadBegin={onUploadBegin}
              onUploadProgress={onUploadProgress}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
            <Button size="sm" onClick={navigateToStudentList}>
              Students
            </Button>
            <Button size="sm" onClick={logout}>
              Logout
            </Button>{" "}
                        {/* Hidden file input */}
                              
          </div>
                    
          {classes?.map((classItem, index) => (
            <Card key={index} className="w-4/5 bg-gray-700 mx-auto my-4">
              <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-start "> {/* Updated alignment to start */}
              <div className="flex flex-1 justify-between"> {/* Adjusted for spacing at the ends */} {/* Updated alignment to start */}
                  <div className="flex-1"> {/* Updated alignment to start */}
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        Lecture {index + 1}
                      </h2>
                      <p className="text-white mt-0">
                        {formatDate(classItem._creationTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center"> {/* Updated to include spacer */}
                    <div className="ml-10 flex-end"> {/* Added horizontal spacing before the View slides button */}
                      <Button size="sm" className="bg-gray-800 text-white">
                        Slides
                      </Button>
                    </div>
                    <Button size="sm" className="bg-orange-500 text-white" onClick={navigateToBreakdown}>
                      Breakdown
                    </Button>

                    <Button
                      size="sm"
                      className="bg-red-500 text-white"
                      onClick={async () =>
                        await deleteClass({
                          taskId: classItem._id,
                          storageId: classItem.lectureId,
                        })
                      }
                    >
                      Delete
                    </Button>
                                  
                  </div>
                             
                </div>
                       
              </CardContent>
                   
            </Card>
          ))}
        </div>

        <div>
          <Page/>
        </div>
        <div>
          <StudentTable/>
        </div>
      </main>



      <div className="fixed bottom-0 right-0 m-4">
        <Button
          size="sm"
          onClick={logout}
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            color: "rgba(255, 255, 255, 1)",
            borderRadius: "8px",
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

// <p>
// <strong>Students:</strong> {classItem.students}
// </p>
