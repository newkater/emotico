import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LOGIN_PATH } from "../../routes";
import { Title } from "@/components/title";
import { getToken, getUser } from "@/lib/auth";
import { ProfileCandidate } from "@/components/profile-candidate";
import { ProfileRecruiter } from "@/components/profile-recruiter";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = async () => {
  const token = await getToken();
  if (!token) {
    return redirect(LOGIN_PATH);
  }

  const user = await getUser();

  if (!user) {
    notFound();
  }

  return (
    <div>
      <Title className="text-3xl mt-10 mb-5 justify-center flex">
        <h2>Profile</h2>
      </Title>
      {user.role === "candidate" ? (
        <ProfileCandidate />
      ) : user.role === "recruiter" ? (
        <ProfileRecruiter userId={user.user_public_id}/>
      ) : (
        <div>Role not nound</div>
      )}
    </div>
  );
};

export default Profile;
