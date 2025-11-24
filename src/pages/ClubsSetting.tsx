import axios from "axios";
import { useParams } from "react-router-dom";

function ClubsSetting() {
  const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
const { id: clubId } = useParams(); // Lấy clubId từ URL
  const handleDeleteClub = async () => {
  if (!window.confirm("Bạn có chắc chắn muốn xóa câu lạc bộ này?")) {
    return;
  }

  try {
    await axios.delete(`http://localhost:8000/api/clubs/${clubId}`, {
      data: { user_id: userId }
    });

    alert("Xóa câu lạc bộ thành công!");
    window.location.href = "/userClubs"; // quay về danh sách CLB
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Lỗi khi xóa câu lạc bộ.");
  }
};

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Club Settings
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage your club's information, members, and settings.
        </p>
      </div>
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
            General Information
          </h2>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                for="club-name"
              >
                Club Name
              </label>
              <input
                className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                id="club-name"
                type="text"
                value="Sports Club"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                for="club-description"
              >
                Club Description
              </label>
              <textarea
                className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                id="club-description"
                rows="4"
              >
                A place for all sports enthusiasts to discuss recent games,
                share news, and organize events.
              </textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Club Logo
              </label>
              <div className="flex items-center gap-4">
                <img
                  alt="Current club logo"
                  className="w-20 h-20 rounded-lg object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg1ysDLeqQmZhMcBlOsrXAOoJFHynWgLfRzJhSkrAX7hiX_Fd7jcVN2QinP8-WfcvfqXrDKTf4niHPBhgpkvquKxXFfjf2puvv436M-MNp8_jOrb0519a2xvlL21HPPcQ33MV9FfvOXbfh13GR2_M5j-Z-Te9VlPlIUoGGT9Ah8Z9GGElf2zzcFLsdU3nQydmZ9jxKiQfwATK9DTuichXl4gTzbRrZZn-mFFRzlYjtUsSljBze2qoNANJq7xQo4oMmLAb_kVejgpM"
                />
                <div>
                  <input className="hidden" id="logo-upload" type="file" />
                  <label
                    className="cursor-pointer px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                    for="logo-upload"
                  >
                    Change Logo
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    PNG, JPG, GIF up to 5MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
            Membership Management
          </h2>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                for="invite-member"
              >
                Invite New Member
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-grow bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  id="invite-member"
                  placeholder="Enter user's email"
                  type="email"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-blue-700">
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  New Posts
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Notify me when a new post is created in the club.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked=""
                  className="sr-only peer"
                  type="checkbox"
                  value=""
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  New Comments
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Notify me about new comments on posts I follow.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked=""
                  className="sr-only peer"
                  type="checkbox"
                  value=""
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Mentions
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Notify me when someone @mentions me.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" value="" />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-danger border-b border-danger/30 pb-3 mb-6">
            Danger Zone
          </h2>
          <div className="bg-danger-light dark:bg-danger-dark/20 border border-danger/30 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Delete this club
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  Once you delete a club, there is no going back. All posts,
                  comments, and member data will be permanently removed. Please
                  be certain.
                </p>
              </div>
              <button
                onClick={handleDeleteClub}
                className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700"
              >
                Delete Club
              </button>
            </div>
          </div>
        </section>
        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
          <button className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
            Cancel
          </button>
          <button className="ml-3 px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
export default ClubsSetting;
