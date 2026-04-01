import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PageLoading } from "@/components/ui/loading";
import { ProfileHeader } from "./components/ProfileHeader";
import BasicInfoForm from "./components/basic-info/BasicInfoForm";
import { PasswordForm } from "./components/PasswordForm";
import { ProfileImageForm } from "./components/ProfileImageForm";
import IdentityForm from "./components/identity/IdentityForm";
import { EmailVerification } from "./components/EmailVerification";
import { ProfileError } from "./components/ProfileError";
import { ProfileTabNavigation } from "./components/ProfileTabNavigation";
import { ProfileQuickActions } from "./components/ProfileQuickActions";
import { useProfile, useProfileUpdates, useProfileTabs } from "./hooks";

export const MyProfilePage: React.FC = () => {
  const { user, loading, error, refreshUser } = useProfile();
  const { activeTab, setActiveTab } = useProfileTabs();
  
  const profileUpdates = useProfileUpdates({
    onUserUpdate: refreshUser,
    onTabChange: setActiveTab,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVerificationEmailSent = () => {
    refreshUser();
  };

  if (loading) {
    return <PageLoading />;
  }

  if (error || !user) {
    return <ProfileError error={error} onRetry={refreshUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
          >
            <ChevronLeft size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
            <p className="text-gray-600">
              Gérez vos informations personnelles et préférences de compte
            </p>
          </div>

          <EmailVerification
            email={user.email}
            isEmailVerified={user.isEmailVerified}
            onVerificationSent={handleVerificationEmailSent}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <ProfileTabNavigation
              user={user}
            />

            <TabsContent value="view" className="space-y-6">
              <ProfileHeader 
                user={user}
                onEditProfile={() => setActiveTab("photo")}
                onEditIdentity={() => setActiveTab("identity")}
              />
              
              <ProfileQuickActions
                user={user}
                onActionClick={setActiveTab}
              />
            </TabsContent>

            <TabsContent value="basic">
              <BasicInfoForm
                user={user}
                onSave={profileUpdates.updateBasicInfo}
                onCancel={() => setActiveTab("view")}
                isLoading={profileUpdates.loading}
              />
            </TabsContent>

            <TabsContent value="password">
              <PasswordForm
                onSave={profileUpdates.updatePassword}
                onCancel={() => setActiveTab("view")}
                isLoading={profileUpdates.loading}
              />
            </TabsContent>

            <TabsContent value="photo">
              <ProfileImageForm
                user={user}
                onSave={profileUpdates.updateProfileImage}
                onCancel={() => setActiveTab("view")}
                isLoading={profileUpdates.loading}
              />
            </TabsContent>

            {user.type === "host" && (
              <TabsContent value="identity">
                <IdentityForm
                  user={user}
                  onSave={profileUpdates.updateIdentityDocuments}
                  onCancel={() => setActiveTab("view")}
                  isLoading={profileUpdates.loading}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
