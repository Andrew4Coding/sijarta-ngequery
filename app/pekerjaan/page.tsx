import React, { Suspense } from "react";
import { PekerjaanModule } from "@/modules/PekerjaanModule";

const page = () => {
  return (
    <Suspense fallback={<div> Loading... </div>}>
      <PekerjaanModule />
    </Suspense>
  );
};

export default page;
