import { useState } from "react";
import ProfileSection, { IUserProfile } from "./Components/Profile";
import SecuritySection, { IUserSecurity } from "./Components/Security";
import NotificationsSection, {
  IUserNotifications,
} from "./Components/Notifications";
import PrivacySection, { IUserPrivacy } from "./Components/Privacy";
import DeleteAccountSection, {
  IUserDeleteAccount,
} from "./Components/DeleteAccount";
import PreferencesSection, { IUserPreferences } from "./Components/Preferences";

import work from "../../assets/work.jpg";
import Sidebar from "@/Layout/SideBar";
import { Header } from "@/Layout/Header";

type SettingsSection =
  | "profile"
  | "security"
  | "preferences"
  | "notifications"
  | "privacy"
  | "delete-account";

export interface IUserInformation {
  profile: IUserProfile;
  security: IUserSecurity;
  preferences: IUserPreferences;
  notifications: IUserNotifications;
  privacy: IUserPrivacy;
  deleteAccount: IUserDeleteAccount;
}

const userInformation: IUserInformation = {
  profile: {
    avatar: work,
    firstName: "Laura",
    lastName: "Fagundes",
    displayName: "Laura Fagundes",
    email: "laurafagundes@exemplo.com",
    phone: "5561999999999",
    jobTitle: "Desenvolvedora Full-Stack",
    bio: "Desenvolvedora Full-Stack com mais de 8 anos de experiência em aplicações web escaláveis utilizando React, Node.js e .NET. Apaixonada por tecnologia, liderança técnica e boas práticas de desenvolvimento.",
  },

  security: {
    hasTwoFactorEnabled: true,
    lastPasswordChange: "15/05/2026",
    activeSessions: [
      {
        id: "session-1",
        device: "Desktop",
        browser: "Google Chrome 138",
        location: "Brasília, DF",
        lastAccess: "21/06/2026 10:45",
      },
      {
        id: "session-2",
        device: "iPhone 15",
        browser: "Safari",
        location: "Brasília, DF",
        lastAccess: "20/06/2026 18:20",
      },
    ],
  },

  preferences: {
    theme: "dark",
    language: "pt-BR",
  },

  notifications: {
    emailNotifications: {
      taskAssigned: true,
      taskUpdated: true,
      taskDueSoon: true,
      projectInvitation: true,
      commentMention: true,
      weeklySummary: false,
    },

    pushNotifications: {
      taskAssigned: true,
      taskUpdated: true,
      commentMention: true,
    },
  },

  privacy: {
    showEmailToTeamMembers: true,
    allowMentions: true,
    allowProjectInvitations: true,
    profileVisibility: "team",
  },

  deleteAccount: {
    confirmationRequired: true,
    warningMessage:
      "Ao excluir sua conta, todos os seus dados pessoais serão removidos permanentemente. Esta ação não poderá ser desfeita.",
  },
};

const SettingsPage = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  return (
    <div className="relative flex flex-col w-screen">
      <Sidebar />
      <Header />

      <section className="flex flex-col p-6">
        <h1 className="text-2xl font-semibold">Configurações</h1>

        <div className="flex flex-row md:flex-col gap-3">
          <nav className="flex flex-col md:flex-row justify-between gap-2 border border-sky-600 p-2 rounded-md">
            <MenuItem
              active={activeSection === "profile"}
              onClick={() => setActiveSection("profile")}
            >
              Perfil
            </MenuItem>

            <MenuItem
              active={activeSection === "security"}
              onClick={() => setActiveSection("security")}
            >
              Segurança
            </MenuItem>

            <MenuItem
              active={activeSection === "preferences"}
              onClick={() => setActiveSection("preferences")}
            >
              Preferências
            </MenuItem>

            <MenuItem
              active={activeSection === "notifications"}
              onClick={() => setActiveSection("notifications")}
            >
              Notificações
            </MenuItem>

            <MenuItem
              active={activeSection === "privacy"}
              onClick={() => setActiveSection("privacy")}
            >
              Privacidade
            </MenuItem>

            <MenuItem
              active={activeSection === "delete-account"}
              onClick={() => setActiveSection("delete-account")}
              danger
            >
              Excluir Conta
            </MenuItem>
          </nav>
          {/* Content */}
          <main className="flex-1 rounded-xl border border-sky-600 p-6 shadow-sm">
            {activeSection === "profile" && (
              <ProfileSection profile={userInformation.profile} />
            )}
            {activeSection === "security" && (
              <SecuritySection security={userInformation.security} />
            )}
            {activeSection === "preferences" && (
              <PreferencesSection preferences={userInformation.preferences} />
            )}
            {activeSection === "notifications" && (
              <NotificationsSection
                notification={userInformation.notifications}
              />
            )}
            {activeSection === "privacy" && (
              <PrivacySection privacy={userInformation.privacy} />
            )}
            {activeSection === "delete-account" && (
              <DeleteAccountSection account={userInformation.deleteAccount} />
            )}
          </main>
        </div>
      </section>
    </div>
  );
};

interface MenuItemProps {
  children: React.ReactNode;
  active: boolean;
  danger?: boolean;
  onClick: () => void;
}

const MenuItem = ({ children, active, danger, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={`
      rounded-lg px-4 py-2  transition w-full overflow-hidden break-words
      ${active ? "bg-blue-100 font-medium text-blue-700" : ""}
      ${danger ? "text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}
    `}
  >
    {children}
  </button>
);

export default SettingsPage;
