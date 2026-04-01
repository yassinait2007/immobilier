import App from "@/App";
import CategoriesPage from "@/features/category/CategoriesPage";
import CheckoutPage from "@/features/checkout/CheckoutPage";
import HomePage from "@/features/home/HomePage";
import MyBookingsPage from "@/features/client-booking/MyBookingPage";
import BecomeHostPage from "@/features/become-host/BecomeHostPage";
import PropertyDetailsPage from "@/features/listing-details/PropertyDetailsPage";
import { HostSpacePage, AddPropertyPage, EditPropertyPage } from "@/features/host-space";
import { ClientProfilePage } from "@/features/client-profile/ClientProfilePage";
import { HostProfilePage } from "@/features/host-profile/HostProfilePage";
import { MyProfilePage } from "@/features/my-profile/MyProfilePage";
import { EmailVerificationPage } from "@/features/email-verification";
import { InboxPage } from "@/features/inbox/InboxPage";
import { ContactPage } from "@/features/contact";
import { FavoritesPage } from "@/features/favorites";
import { AproposPage } from "@/features/apropos";
import { PrivacyPolicyPage, TermsOfServicePage, LegalMentionsPage } from "@/features/legal";
import PrivateRoute from "@/components/PrivateRoute";
import RoleGuard from "@/components/RoleGuard";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about-us", element: <AproposPage /> },
      { path: "privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "terms-of-service", element: <TermsOfServicePage /> },
      { path: "legal-mentions", element: <LegalMentionsPage /> },
      { path: "property/:id", element: <PropertyDetailsPage /> },
      { path: "client/profile/:id", element: <ClientProfilePage /> },
      { path: "host/profile/:id", element: <HostProfilePage /> },
      { path: "verify-email", element: <EmailVerificationPage /> },
      { 
        path: "become-host", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['client']} redirectTo="/host-space">
              <BecomeHostPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      { 
        path: "my-profile", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['client', 'host']}>
              <MyProfilePage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      { 
        path: "client/bookings", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['client', 'host']}>
              <MyBookingsPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      { 
        path: "checkout/:id", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['client', 'host']}>
              <CheckoutPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['client', 'host']}>
              <FavoritesPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      
      { 
        path: "host-space", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['host']} redirectTo="/become-host">
              <HostSpacePage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      { 
        path: "host/add-property", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['host']} redirectTo="/become-host">
              <AddPropertyPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      { 
        path: "host/edit-property/:id", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['host']} redirectTo="/become-host">
              <EditPropertyPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      
      { 
        path: "inbox", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['client', 'host']}>
              <InboxPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      { 
        path: "inbox/:userId", 
        element: (
          <PrivateRoute>
            <RoleGuard allowedRoles={['client', 'host']}>
              <InboxPage />
            </RoleGuard>
          </PrivateRoute>
        )
      },
      
      { path: "*", element: <HomePage /> },
    ],
  },
]);

export default router;