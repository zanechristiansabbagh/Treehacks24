"use client";
import { useRef, useState } from "react"; // Import useRef hook
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import {
  UploadButton,
  UploadDropzone,
  UploadFileResponse,
} from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../convex/_generated/api";
import { useUser } from "@auth0/nextjs-auth0/client";
import Page from "../app/dashboard/page";
import StudentTable from "@/app/studentList/page";
import { useAction } from "convex/react";

export default function HomeAuth() {
  const { user } = useUser();
  const router = useRouter();

  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState(false); // State to track if upload is in progress
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const deleteClass = useMutation(api.classes.deleteClass);
  const getClassesByEmail = useQuery(api.classes.getClassesByEmail, {
    email: user?.email,
  })
  const fetchEmbeddings = useAction(api.embed.getEmbeddings);
  const createNewClass = useMutation(api.classes.createNewClass);

  const classes = useQuery(api.classes.get, { userId: user?.email });

  const routeToSearch = () => {
    router.push("/search");
  };

  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    setIsUploading(false);
    setUploadProgress(0);
    setShowOverlay(false); // Hide overlay after upload
    for (const file of uploaded) {
      const response = file.response as any; // Assuming response has the structure we need
      await saveStorageId({
        lectureId: response.storageId,
        userId: user?.email,
      });
      if(getClassesByEmail.length == 0){
        createNewClass({teacherEmail: user?.email});
      }

      navigateToBreakdown(response.storageId);
    }
  };
  const onUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };
  const onUploadBegin = (fileName: string) => {
    setIsUploading(true);
  };

  const navigateToSearch = () => {
    router.push("/search");
  };

  const navigateToStudentList = () => {
    router.push("/studentList");
  };
  const navigateToBreakdown = (lectureId: string) => {
    router.push(`/breakdown/${lectureId}`);
  };
  const navigateToQR = () => {
    router.push("/qr");
  };
  const logout = () => {
    router.push("/api/auth/logout");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US");
  };

  const toggleOverlay = () => setShowOverlay(!showOverlay);
  console.log(showOverlay)

  return (
    <div className="w-full min-h-screen flex flex-col">
      {showOverlay && (
        <div className="relative inset-0 z-50">
          <button onClick={toggleOverlay} className="absolute right-0 top-0 m-4 text-4xl text-white z-50">&times;</button>
          <OverlayComponent
            generateUploadUrl={generateUploadUrl}
            onUploadBegin={onUploadBegin}
            onUploadProgress={onUploadProgress}
            saveAfterUpload={saveAfterUpload}
          />
        </div>
      )}
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
        <div className="container py-6 px-4 md:py-12 md:px-6 mx-auto">
          <div className="flex justify-between items-center mb-4 w-full">
            <h1 className="text-5xl font-bold tracking-tighter">Lectures</h1>
            <div className="flex gap-4 items-center justify-center">
              <div className="flex items-center justify-center">
                <Button size="sm" onClick={navigateToQR}>
                  <img src="/qr.png" alt="QR Code" width="100" height="100" />
                </Button>
              </div>
              <Button size="sm" onClick={navigateToSearch} className="m-0 p-0">
                  <img src="/search.png" alt="Search" width="80" height="100" className="m-0 p-0" />
                </Button>
              <div className="bg-orange-500 p-2 rounded-full m-0">
                <Button
                  size="sm"
                  onClick={toggleOverlay}
                  className="text-white flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m-8-8h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-0">
            {classes?.map((classItem, index) => (
              <LectureCard
                key={index}
                index={index}
                classItem={classItem}
                formatDate={formatDate}
                deleteClass={deleteClass}
                navigateToBreakdown={navigateToBreakdown}
                fetchEmbeddings={fetchEmbeddings}
              />
            ))}
          </div>
        </div>
        <div className="container py-6 px-4 md:py-12 md:px-6 mx-auto">
          <div className="flex justify-between items-center mb-4 w-full">
            <h1 className="text-3xl font-bold tracking-tighter">
              Students <span style={{ color: "gray" }}>(5)</span>
            </h1>
          </div>
          <StudentTable />
        </div>
        <div className="container py-6 px-4 md:py-12 md:px-6 mx-auto">
          <h1
            className="text-3xl font-bold tracking-tighter"
            style={{ marginBottom: "2%" }}
          >
            Dashboard
          </h1>
          <Page />
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

function OverlayComponent({
  generateUploadUrl,
  onUploadBegin,
  onUploadProgress,
  saveAfterUpload,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <UploadDropzone
          uploadUrl={generateUploadUrl}
          fileTypes={[".pdf"]}
          onUploadComplete={saveAfterUpload}
          onUploadBegin={onUploadBegin}
          onUploadProgress={onUploadProgress}
          onUploadError={(error: unknown) => {
            alert(`ERROR! ${error}`);
          }}
        />
      </div>
    </div>
  );
}

function LectureCard({
  index,
  classItem,
  formatDate,
  deleteClass,
  navigateToBreakdown,
  fetchEmbeddings,
}) {
  const createProblemSet = useMutation(api.problemSets.createProblemSet);
  const { user } = useUser();
  const handleClick = async () => {
    const result = await fetchEmbeddings({
      file: classItem.url,
      collection_id: user?.email,
    });
    await createProblemSet({
      teacher: user.email,
      qaPairs: result.qa_pairs,
      keyWords: result.feature_names,
      lectureId: classItem.lectureId,
    });
    console.log(result);

    // const data = await fetch("https://d6700028769d.ngrok.app/embed", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     file: classItem.url,
    //     collection_id: classItem.lectureId,
    //   }),
    // });

    // if (!data.ok) {
    //   throw new Error(`HTTP error! status: ${data.status}`);
    // }
    // const result = await data.json();
    // return result;
    // console.log("CHRISTEN");
  };
  return (
    <Card
      className="ml-4 my-6"
      style={{
        width: "100%", // Changed from 25vw to 100% to ensure content fits inside the card
        maxWidth: "100vw", // Added to maintain the original width constraint
        backgroundColor: "#666666",
        border: "2px solid #91BEA3",
      }}
    >
      <CardContent className="p-4 flex flex-col items-start ">
        <div className="flex flex-col flex-1 justify-between">
          <div className="mb-4">
            {" "}
            {/* Removed mr-14 to ensure content fits within the card */}
            <h2 className="text-xl font-semibold text-white">
              Lecture {index + 1}
            </h2>
            <p className="text-white mt-0">
              {formatDate(classItem._creationTime)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-start w-full">
            {" "}
            {/* Changed justify-end to justify-start, added flex-wrap, and ensured it never extends beyond its parent container with w-full */}
            <Button
              size="sm"
              className="bg-gray-800 text-white h-10 flex-grow" // Ensured all buttons are the same height and made the grids longer by adding flex-grow
              onClick={() => window.open(classItem.url, "_blank")}
            >
              Slides
            </Button>
            <Button
              size="sm"
              className="bg-[#91BEA3] text-white h-10 flex-grow" // Ensured all buttons are the same height and made the grids longer by adding flex-grow
              onClick={() => navigateToBreakdown(classItem.lectureId)}
            >
              Breakdown
            </Button>
            <Button
              size="sm"
              className="bg-black text-white h-10 w-full md:w-auto flex-grow" // Ensured all buttons are the same height and made the grids longer by adding flex-grow
              onClick={handleClick}
            >
              Create Questions
            </Button>
            <img
              src="/trash.png"
              alt="Delete"
              className="cursor-pointer"
              width="20"
              height="20"
              onClick={async () =>
                await deleteClass({
                  taskId: classItem._id,
                  storageId: classItem.lectureId,
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
