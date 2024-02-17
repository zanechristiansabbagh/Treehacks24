"use client";
import { useRef, useState } from "react"; // Import useRef hook
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function HomeAuth() {
  const router = useRouter();
  const fileInputRef = useRef(null); // Create a ref for the file input
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState(false); // State to track if upload is in progress

  const handleNewLectureClick = () => {
    fileInputRef.current?.click(); // Trigger click on file input when button is clicked
  };

  const routeToNavigation=()=>{
    router.push("/dashboard")
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file.name); // Just logging the file name for demonstration
      startUploadProgress(); // Start the upload progress
    }
  };

  const startUploadProgress = () => {
    setIsUploading(true); // Set uploading to true
    setUploadProgress(0); // Reset progress to 0
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false); // Set uploading to false once progress reaches 100%
          return 100;
        }
        return prevProgress + 100 / 6; // Increment progress by 1/6th every second
      });
    }, 1000); // Update progress every second
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
                        
            <Button size="sm" onClick={handleNewLectureClick}>
              New Lecture
            </Button>
            <Button size="sm" onClick={routeToNavigation}>
              See Dashboard
            </Button>
                        {/* Hidden file input */}
                        
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".pdf"
              onChange={handleFileChange}
            />
                      
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
                  
        </div>
              
      </main>
          
    </div>
  );
}
