"use client";
import React, { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
}

function getServerSnapshot() {
  return "";
}

export default function DateDisplay({ className = "" }) {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <time className={className} suppressHydrationWarning>
      {date}
    </time>
  );
}
