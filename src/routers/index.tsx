import CreateClub from "../pages/CreateClub";
import CreateEven from "../pages/CreateEven";
import CreateTopic from "../pages/CreateTopic";
import DetailEven from "../pages/DetailEven";
import DetailPost from "../pages/DetailPost";
import DiscussClub from "../pages/DiscussClub";
import EditProfile from "../pages/EditProfile";
import EvenClub from "../pages/EvenClub";
import GeneralDiscussion from "../pages/GeneralDiscussion";
import Home from "../pages/Home";
import HomeClub from "../pages/HomeClub";
import Login from "../pages/Login";
import MemberClubs from "../pages/MemberClubs";
import MyProfile from "../pages/MyProfile";
import Notification from "../pages/Notification";
import Register from "../pages/Register";
import UserClubs from "../pages/UserClubs";
import ClubNotification from "../pages/ClubNotification";
import MyPostClub from "../pages/MyPostClub";
import ClubsSetting from "../pages/ClubsSetting";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/createClub", component: CreateClub },
  { path: "/userClubs", component: UserClubs },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/homeClub/:id", component: HomeClub, layout: "navbarClub" },
  {
    path: "/homeClub/generalDiscussion",
    component: GeneralDiscussion,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/createTopic",
    component: CreateTopic,
    layout: "navbarClub",
  },
  { path: "/my-profile", component: MyProfile },
  { path: "/my-profile/edit-profile", component: EditProfile },
  {
    path: "/homeClub/:id/memberclub",
    component: MemberClubs,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/:id/even-club",
    component: EvenClub,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/:id/even-club/create-event",
    component: CreateEven,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/:id/even-club/detail-event/:eventId",
    component: DetailEven,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/:id/discuss-Club",
    component: DiscussClub,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/:id/discuss-Club/create-topic",
    component: CreateTopic,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/:id/discuss-Club/post/:postId",
    component: DetailPost,
    layout: "navbarClub",
  },
  { path: "/notification", component: Notification },
  {
    path: "/homeClub/:id/notification",
    component: ClubNotification,
    layout: "navbarClub",
  },
    {
    path: "/homeClub/:id/my-post-club",
    component: MyPostClub,
    layout: "navbarClub",
  },
  {
    path: "/homeClub/:id/club-settings",
    component: ClubsSetting,
    layout: "navbarClub",
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
