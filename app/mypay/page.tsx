import React from "react";
import { MyPayModule } from "@/modules/MyPayModule";
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";
import { redirect } from "next/navigation";

const page = async () => {
  const token = await cookies().then((cookie) => cookie.get("sessionToken")?.value);
  !token && redirect("/login");

  const decoded = decode(token!);
  console.log(decoded)


  return <MyPayModule />;
};

export default page;
