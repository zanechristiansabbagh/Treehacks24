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
import Image from "next/image";

export default function HomeAuth() {
  const { user } = useUser();
  const router = useRouter();

  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState(false); // State to track if upload is in progress
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility

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
    setShowOverlay(false); // Hide overlay after upload
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

  return (
    <div className="w-full min-h-screen flex flex-col">
      {showOverlay && (
        <OverlayComponent
          generateUploadUrl={generateUploadUrl}
          onUploadBegin={onUploadBegin}
          onUploadProgress={onUploadProgress}
          saveAfterUpload={saveAfterUpload}
        />
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
        <div className="container py-6 px-4 md:py-12 md:px-6">
          <div className="flex items-center gap-4 mb-4">
            <h1
              className="text-3xl font-bold tracking-tighter"
              style={{ marginLeft: "6%" }}
            >
              Lectures
            </h1>
            <div className="bg-gray-200 p-2 rounded">
              <Button size="sm" onClick={toggleOverlay} className="text-black">
                Add lecture
              </Button>
            </div>
            <Button size="sm" onClick={navigateToQR}>
              Display QR
            </Button>
          </div>
          {classes?.map((classItem, index) => (
            <LectureCard
              key={index}
              index={index}
              classItem={classItem}
              formatDate={formatDate}
              deleteClass={deleteClass}
              navigateToBreakdown={navigateToBreakdown}
            />
          ))}
        </div>
        <h1
          className="text-3xl font-bold tracking-tighter"
          style={{ marginLeft: "12%" }}
        >
          Students
        </h1>
        <div>
          <StudentTable />
        </div>
        <h1
          className="text-3xl font-bold tracking-tighter"
          style={{ marginLeft: "12%", marginBottom: "2%" }}
        >
          Dashboard
        </h1>
        <div>
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
}) {
  return (
    <Card className="w-4/5 bg-gray-700 mx-auto my-4">
      <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-start ">
        <div className="flex flex-1 justify-between">
          <div className="flex-1">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Lecture {index + 1}
              </h2>
              <p className="text-white mt-0">
                {formatDate(classItem._creationTime)}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="ml-10 flex-end">
              <Button size="sm" className="bg-gray-800 text-white">
                Slides
              </Button>
            </div>
            <Button
              size="sm"
              className="bg-orange-500 text-white"
              onClick={() => navigateToBreakdown(classItem.lectureId)}
            >
              Breakdown
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
