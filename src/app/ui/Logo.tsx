"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { handleGenerateLogo } from "@/app/actions";

export default function Logo() {
  const [blobUrl, setBlobUrl] = useState("");

  useEffect(() => {
    const fetchLogo = async () => {
      const { success, imageBase64 } = await handleGenerateLogo();
      if (success) setBlobUrl(imageBase64);
    };
    fetchLogo();
  }, []);

  if (!blobUrl) return null;
  return <Image width={200} height={200} src={blobUrl} alt="Logo" />;
}
