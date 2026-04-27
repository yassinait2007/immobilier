import React from "react";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import OtpForm from "../components/OtpForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const AuthModalContainer: React.FC = () => {
  const { isOpen, modalType, closeAuthModal, switchModalType } = useAuthModal();

  const handleClose = () => {
    closeAuthModal();
  };

  const getModalContent = () => {
    switch (modalType) {
      case "login":
      case "register":
        return (
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Bienvenue chez Crystalimmo Agadir
              </CardTitle>
              <CardDescription className="text-gray-600">
                Trouvez votre propriété de rêve au Maroc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={modalType} onValueChange={(value) => switchModalType(value as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger 
                    value="login" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    Se connecter
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    S'inscrire
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="mt-0">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register" className="mt-0">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      
      case "forgotPassword":
        return (
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                Mot de passe oublié
              </CardTitle>
              <CardDescription>
                Entrez votre email pour recevoir un code de réinitialisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForgotPasswordForm />
            </CardContent>
          </Card>
        );
      
      case "otp":
        return (
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                Vérification
              </CardTitle>
              <CardDescription>
                Entrez le code reçu par email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OtpForm />
            </CardContent>
          </Card>
        );
      
      case "resetPassword":
        return (
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                Nouveau mot de passe
              </CardTitle>
              <CardDescription>
                Créez un nouveau mot de passe sécurisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm />
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg w-full bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Authentification</DialogTitle>
        </DialogHeader>
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <DialogClose className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full" />
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary-light/5 to-primary/5 opacity-50" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-primary-light/20 rounded-full blur-2xl transform -translate-x-12 translate-y-12" />
        
        <DialogBody className="relative p-4 flex-1 overflow-y-auto scrollbar-hide">
          {getModalContent()}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModalContainer;
