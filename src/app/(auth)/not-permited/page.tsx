import React from "react";
import { ShieldAlert } from "lucide-react";
import GlowButton from "@/components/shared/GlowButton";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md text-center border border-red-200 dark:border-red-700">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          You are not permitted to log in to this website.
          <br />
          <span className="font-medium text-red-500">Only admin access allowed.</span>
        </p>
        <div  className="mt-5">
          <GlowButton href="/" className="text-xs">
          Back to home
        </GlowButton>
        </div>
      </div>
    </div>
  );
}
