import { Pekerjaan } from "./sections/Pekerjaan";
import Image from "next/image";
import { cookies } from "next/headers";
import { decode, JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export const PekerjaanModule = async () => {
  const token = await cookies().then(
    (cookie) => cookie.get("sessionToken")?.value
  );
  !token && redirect("/login");

  const decoded = decode(token!);
  return (
    <main className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 z-10">
      <div className="absolute top-0 w-full left-0 h-full z-[1]">
        <Image src="/images/PekerjaanBG.png" alt="Pekerjaan" fill className="" />
      </div>
      <h1 className="header text-[60px] mt-[70px] font-newake text-green-500 text-center z-10">
        Pekerjaan
      </h1>
      <Pekerjaan userId={(decoded as JwtPayload).data.id} />
    </main>
  );
};
