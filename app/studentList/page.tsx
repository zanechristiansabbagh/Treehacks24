"use client";
import React, { useEffect, useState } from "react";
import { get } from "../convex/tasks.js";
import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { HomeUnauth } from "@/components/home-unauth";
import HomeAuth from "@/components/home-auth";
import { QRCode } from "@/components/qrcode";

export default function Component() {
  const { user, error, isLoading } = useUser();

  return QRCode;
}
