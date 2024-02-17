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

export default function HomeAuth() {
  const { user } = useUser();
  const router = useRouter();

  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState(false); // State to track if upload is in progress

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);

  const classes = useQuery(api.classes.get, { userId: user?.email });

  const routeToNavigation=()=>{
    router.push("/dashboard")
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file.name); // Just logging the file name for demonstration
      startUploadProgress(); // Start the upload progress
    }
  }
      
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
  const logout = () => {
    router.push("/api/auth/logout"); // Trigger click on file input when button is clicked
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
                        
            <h1 className="text-3xl font-bold tracking-tighter">My Lectures</h1>
                        
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
            <Button size="sm" onClick={routeToNavigation}>
              See Dashboard
            </Button>
                        {/* Hidden file input */}
                              
          </div>
                    
          <Card>
                        
            <CardContent className="p-4 md:p-6">
                            
              <div className="flex items-center gap-4">
                                
                <div className="flex-1">
                                    
                  <h2 className="text-xl font-semibold">
                    Introduction to Computer Science
                  </h2>
                                    
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    January 28th
                  </p>
                                  
                </div>
                                
                <div className="flex flex-col items-end text-right">
                                    
                  <div className="text-sm">
                                        <strong>Students:</strong>
                                        32                   
                  </div>
                                    
                  <div className="space-x-2 mt-2">
                                        <Button size="sm">View Slides</Button>
                                        
                    <Button size="sm" variant="outline">
                                            View Responses                     
                    </Button>
                                      
                  </div>
                                  
                </div>
                              
              </div>
                          
            </CardContent>
                      
          </Card>
          {classes?.map((classItem, index) => (
            <Card key={index}>
              {" "}
              {/* Fixed: Added "key" prop here */}
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl font-semibold">Class 2</h2>

                <div className="mt-4">
                  <p>
                    <strong>Lecture ID:</strong> {classItem.lectureId}
                  </p>
                  <p>
                    <strong>Creation Time:</strong>{" "}
                    {new Date(classItem._creationTime).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Students:</strong> {classItem.students}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <div className="fixed bottom-0 right-0 m-4">
        <Button size="sm" onClick={logout} style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)', color: 'rgba(255, 255, 255, 1)', borderRadius: '8px' }}>
          Logout
        </Button>
      </div>
    </div>
  )
}