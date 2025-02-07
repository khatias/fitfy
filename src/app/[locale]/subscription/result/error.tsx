"use client";
import React from "react";
export default function Error({ error }: { error: Error }) {
  return <h2>{error.message}</h2>;
}