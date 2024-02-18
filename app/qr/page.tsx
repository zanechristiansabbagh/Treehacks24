import React from "react";
import { QRCode } from "@/components/qrcode"; // Assuming the path is correct based on the provided context

export default function QRPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <QRCode />
    </div>
  );
}
