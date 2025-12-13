import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import ReadyMadeCake from "./components/ReadyMadeCake/ReadyMadeCake";
import ReadyMadeCakeDetails from "./components/ReadyMadeCake/ReadyMadeCakeDetails";
import ReadyMadeCakeCheckout from "./components/ReadyMadeCake/ReadyMadeCakeCheckout";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Authentication/Login/Login";
import Signup from "./components/Authentication/Signup/Signup";
import PasswordReset from "./components/Authentication/PasswordReset/PasswordReset";
import ProfilePage from "./components/Profile/ProfilePage/ProfilePage";
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import CustomCake from "./components/CustomCake/CustomCake";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import AdminCakeGallery from "./components/Admin/AdminCakeGallery/AdminCakeGallery";
import AdminAddCake from "./components/Admin/AdminCakeGallery/AdminAddCake";
import AdminDeletedCakes from "./components/Admin/AdminCakeGallery/AdminDeletedCakes";
import AdminOrderHistory from "./components/Admin/AdminOrderHistory/AdminOrderHistory";
import AdminReadyMadeCakes from "./components/Admin/AdminReadyMadeCakes/AdminReadyMadeCakes";
import AdminAddReadyMadeCake from "./components/Admin/AdminReadyMadeCakes/AdminAddReadyMadeCake";
import AdminDeletedReadyMadeCakes from "./components/Admin/AdminReadyMadeCakes/AdminDeletedReadyMadeCakes";
import AdminCustomerUploads from "./components/Admin/AdminCustomerUploads/AdminCustomerUploads";
import AdminCakeReview from "./components/Admin/AdminCustomerUploads/AdminCakeReview";
import AdminDeleteCustomerUploads from "./components/Admin/AdminCustomerUploads/AdminDeleteCustomerUploads";
import ReviewOrder from "./components/Profile/OrderHistory/ReviewOrder";
import OrderHistory from "./components/Profile/OrderHistory/OrderHistory";
import ViewReview from "./components/Profile/OrderHistory/ViewReview";
import AddReview from "./components/Profile/OrderHistory/AddReview";
import ReorderPrevious from "./components/Profile/OrderHistory/ReorderPrevious";
import EditAndReorder from "./components/Profile/OrderHistory/EditAndReorder";
import ModifyCake from "./components/ModifyCake/ModifyCake";
import ModifyCakeConfirm from "./components/ModifyCake/ModifyCakeConfirm";
import ModifyCakeCustomize from "./components/ModifyCake/ModifyCakeCustomize";
import ModifyCakeCheckout from "./components/ModifyCake/ModifyCakeCheckout";

const App = () => {
  const location = useLocation();
  const hideNavRoutes = ["/login", "/signup", "/passwordReset", "/admin"];
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster
        position="top-center"
        gutter={16}
        toastOptions={{
          duration: 5000,
          success: { duration: 5000 },
          error: { duration: 6000 },
          loading: { duration: Infinity },
        }}
      />
      {!hideNavRoutes.includes(location.pathname) && !isAdminRoute && (
        <NavBar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readymade-cake" element={<ReadyMadeCake />} />
        <Route path="/readymade-cake/:id" element={<ReadyMadeCakeDetails />} />
        <Route
          path="/readymade-cake/:id/checkout"
          element={<ReadyMadeCakeCheckout />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/customize-cake" element={<CustomCake />} />

        <Route path="/modify-cake" element={<ModifyCake />} />
        <Route
          path="/modify-cake/:id/confirm"
          element={<ModifyCakeConfirm />}
        />
        <Route
          path="/modify-cake/:id/customize"
          element={<ModifyCakeCustomize />}
        />
        <Route
          path="/modify-cake/:id/checkout"
          element={<ModifyCakeCheckout />}
        />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/cake-gallery" element={<AdminCakeGallery />} />
        <Route path="/admin/cake-gallery/add" element={<AdminAddCake />} />
        <Route
          path="/admin/cake-gallery/deleted"
          element={<AdminDeletedCakes />}
        />
        <Route path="/admin/order-history" element={<AdminOrderHistory />} />
        <Route
          path="/admin/ready-made-cakes"
          element={<AdminReadyMadeCakes />}
        />
        <Route
          path="/admin/ready-made-cakes/add"
          element={<AdminAddReadyMadeCake />}
        />
        <Route
          path="/admin/ready-made-cakes/deleted"
          element={<AdminDeletedReadyMadeCakes />}
        />
        <Route
          path="/admin/customer-uploads"
          element={<AdminCustomerUploads />}
        />
        <Route
          path="/admin/customer-uploads/review"
          element={<AdminCakeReview />}
        />
        <Route
          path="/admin/customer-uploads/deleted"
          element={<AdminDeleteCustomerUploads />}
        />

        <Route path="/review-order" element={<ReviewOrder />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/review/:id" element={<ViewReview />} />
        <Route path="/add-review/:id" element={<AddReview />} />
        <Route path="/reorder-previous-order" element={<ReorderPrevious />} />
        <Route path="/edit-and-reorder/:id" element={<EditAndReorder />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
