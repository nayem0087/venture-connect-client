"use client";

import { Spinner } from "@heroui/react";


export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
        <Spinner />
    </div>
  );
}