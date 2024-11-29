import React from "react";
import { MyPayModule } from "@/modules/MyPayModule";
import { cookies } from "next/headers";
import { decode, JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

const page = async () => {
  const token = await cookies().then(
    (cookie) => cookie.get("sessionToken")?.value
  );
  !token && redirect("/login");

  const decoded = decode(token!);

  return (
    <MyPayModule
      userData={{
        id: (decoded as JwtPayload).data.id,
        role: (decoded as JwtPayload).role,
      }}
    />
  );
};

export default page;
