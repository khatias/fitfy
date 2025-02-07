import ProfileEditor from "@/components/profile/ProfileEditor";
import { getProfile } from "@/utils/profile/getProfile";

export default async function ProfileClient() {
  const profile = await getProfile();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto max-w-[1300px] px-4  dark:text-white pt-8">
        <ProfileEditor profile={profile} />
      </div>
    </div>
  );
}
