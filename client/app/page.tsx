import buildClient from "@/api/build-client";

type currentUserBodyResponse = {
  currentUser: CurrentUser | null;
};

type CurrentUser = {
  id: string;
  email: string;
  iat: number;
};

//di next js componentny biso async, gk kyk react yg gk biso
export default async function Home() {
  //helper function utk cek user login apa gk
  //next js nge fetch data ini di server side, bukan di browser
  const currentUser = (await buildClient().get<currentUserBodyResponse>("/api/users/currentuser"))
    .data.currentUser;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {currentUser ? (
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">You are signed in</div>
          <div className="text-2xl font-bold">Email: {currentUser.email}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">not logged in</div>
      )}
    </main>
  );
}
