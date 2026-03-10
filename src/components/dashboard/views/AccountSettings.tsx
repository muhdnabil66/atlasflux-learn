"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Modal from "@/components/ui/Modal";
import {
  UserIcon,
  LockClosedIcon,
  BellIcon,
  Cog6ToothIcon,
  CameraIcon,
  CheckCircleIcon,
  PhotoIcon,
  TrophyIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Card from "../common/Card";

const colorClasses: Record<string, string> = {
  yellow:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  red: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  email: string;
  avatar_url: string | null;
  equipped_border: string | null;
  settings: any;
}

export default function AccountSettings() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

  const [equippedAvatar, setEquippedAvatar] = useState<string | null>(null);
  const [equippedBorder, setEquippedBorder] = useState<string | null>(null);
  const [showEquipModal, setShowEquipModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: "avatar" | "border";
    id: string;
    name: string;
    image?: string;
    borderClass?: string;
    isEquipped?: boolean;
  } | null>(null);

  // Mock collection (akan digantikan dengan API nanti)
  const [collection, setCollection] = useState({
    avatars: [
      {
        id: "a1",
        name: "Golden Avatar",
        image: "/avatars/golden.png",
        equipped: false,
      },
      {
        id: "a2",
        name: "Elite Avatar",
        image: "/avatars/elite.png",
        equipped: false,
      },
    ],
    borders: [
      {
        id: "b1",
        name: "Champion Border",
        borderClass: "border-4 border-yellow-500",
        equipped: false,
      },
      {
        id: "b2",
        name: "Warrior Border",
        borderClass: "border-4 border-red-500",
        equipped: false,
      },
    ],
    badges: [
      { id: "badge1", name: "First Steps", icon: StarIcon, color: "yellow" },
      { id: "badge2", name: "Code Novice", icon: TrophyIcon, color: "blue" },
    ],
  });

  // Fetch profil dari API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/user/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setNewUsername(data.username || "");
        setEquippedBorder(data.equipped_border);
        // Set avatar dari profile atau Clerk
        if (data.avatar_url) {
          setEquippedAvatar(data.avatar_url);
        } else if (user?.imageUrl) {
          setEquippedAvatar(user.imageUrl);
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]); // tambah user sebagai dependency untuk keselamatan

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setShowAvatarModal(true);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return;
    setIsUploading(true);
    try {
      await user.setProfileImage({ file: avatarFile });
      setSuccessMessage("Avatar updated successfully!");
      setShowSuccessModal(true);
      setShowAvatarModal(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      setEquippedAvatar(user.imageUrl);

      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_url: user.imageUrl }),
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Update username
  const updateUsername = async () => {
    if (!newUsername.trim()) return;
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update username");
      }
      setSuccessMessage("Username updated successfully!");
      setShowSuccessModal(true);
      setShowUsernameModal(false);
      setProfile((prev) => (prev ? { ...prev, username: newUsername } : null));
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to update username",
      );
    }
  };

  // Update password (Clerk)
  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    try {
      await user?.updatePassword({ currentPassword, newPassword });
      setSuccessMessage("Password updated successfully!");
      setShowSuccessModal(true);
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError(
        "Failed to update password. Please check your current password.",
      );
    }
  };

  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
  };

  const handleItemClick = (type: "avatar" | "border", item: any) => {
    const isEquipped =
      (type === "avatar" && equippedAvatar === item.image) ||
      (type === "border" && equippedBorder === item.borderClass);
    setSelectedItem({ ...item, type, isEquipped });
    setShowEquipModal(true);
  };

  const equipItem = async () => {
    if (!selectedItem) return;
    if (selectedItem.type === "avatar") {
      setEquippedAvatar(selectedItem.image || null);
      setCollection((prev) => ({
        ...prev,
        avatars: prev.avatars.map((a) => ({
          ...a,
          equipped: a.id === selectedItem.id,
        })),
      }));
    } else if (selectedItem.type === "border") {
      setEquippedBorder(selectedItem.borderClass || null);
      try {
        await fetch("/api/user/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ equipped_border: selectedItem.borderClass }),
        });
      } catch (error) {
        console.error(error);
        alert("Failed to equip border");
        return;
      }
      setCollection((prev) => ({
        ...prev,
        borders: prev.borders.map((b) => ({
          ...b,
          equipped: b.id === selectedItem.id,
        })),
      }));
    }
    setShowEquipModal(false);
    setSelectedItem(null);
    setSuccessMessage(`${selectedItem.name} equipped!`);
    setShowSuccessModal(true);
  };

  const unequipItem = async () => {
    if (!selectedItem) return;
    if (selectedItem.type === "avatar") {
      setEquippedAvatar(null);
      setCollection((prev) => ({
        ...prev,
        avatars: prev.avatars.map((a) => ({ ...a, equipped: false })),
      }));
    } else if (selectedItem.type === "border") {
      setEquippedBorder(null);
      try {
        await fetch("/api/user/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ equipped_border: null }),
        });
      } catch (error) {
        console.error(error);
        alert("Failed to unequip border");
        return;
      }
      setCollection((prev) => ({
        ...prev,
        borders: prev.borders.map((b) => ({ ...b, equipped: false })),
      }));
    }
    setShowEquipModal(false);
    setSelectedItem(null);
    setSuccessMessage(`${selectedItem.name} unequipped!`);
    setShowSuccessModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage your profile, security, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5" /> Profile Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ${equippedBorder || ""}`}
                >
                  {equippedAvatar ? (
                    <Image
                      src={equippedAvatar}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500 bg-gray-200 dark:bg-gray-700">
                      {user?.fullName?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
                  >
                    <CameraIcon className="h-4 w-4" />
                    Change
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name (Google)
                </label>
                <input
                  type="text"
                  value={user?.fullName || ""}
                  disabled
                  className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.primaryEmailAddress?.emailAddress || ""}
                  disabled
                  className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed. Contact support if you need to update
                  it.
                </p>
              </div>
            </div>
          </Card>

          {/* Username Settings */}
          <Card className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5" /> Username
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              This username will be displayed on leaderboards and in the navbar.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Username
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={profile?.username || ""}
                    readOnly
                    className="flex-1 border rounded-lg p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                  />
                  <button
                    onClick={() => {
                      setNewUsername(profile?.username || "");
                      setShowUsernameModal(true);
                    }}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm whitespace-nowrap"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Change Password */}
          <Card className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LockClosedIcon className="h-5 w-5" /> Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Update Password
              </button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BellIcon className="h-5 w-5" /> Notifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Email Notifications
                </span>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="toggle"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Push Notifications
                </span>
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="toggle"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Weekly Digest
                </span>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="toggle"
                />
              </div>
            </div>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LockClosedIcon className="h-5 w-5" /> Two-Factor Authentication
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Add an extra layer of security to your account.
            </p>
            <button
              onClick={() => setShowTwoFactorModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Enable 2FA
            </button>
          </Card>

          {/* Danger Zone */}
          <Card className="max-w-2xl mx-auto lg:mx-0 border border-red-200 dark:border-red-800">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <Cog6ToothIcon className="h-5 w-5" /> Danger Zone
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowSignOutModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Sign Out
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Signing out will redirect you to the homepage. Your progress is
                saved.
              </p>
            </div>
          </Card>
        </div>

        {/* Right column – Collection */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PhotoIcon className="h-5 w-5" /> My Collection
            </h2>

            {/* Avatars */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                <PhotoIcon className="h-4 w-4" /> Avatars
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {collection.avatars.map((item) => {
                  const isEquipped = equippedAvatar === item.image;
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        handleItemClick("avatar", { ...item, isEquipped })
                      }
                      className={`text-center hover:scale-105 transition-transform ${
                        isEquipped ? "ring-2 ring-accent" : ""
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-blue-300">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs mt-1 truncate">{item.name}</p>
                      {isEquipped && (
                        <span className="text-[10px] text-accent">
                          Equipped
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Borders */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                <StarIcon className="h-4 w-4" /> Borders
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {collection.borders.map((item) => {
                  const isEquipped = equippedBorder === item.borderClass;
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        handleItemClick("border", { ...item, isEquipped })
                      }
                      className={`text-center hover:scale-105 transition-transform ${
                        isEquipped ? "ring-2 ring-accent" : ""
                      }`}
                    >
                      <div
                        className={`w-12 h-12 mx-auto rounded-full ${item.borderClass} flex items-center justify-center`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                      </div>
                      <p className="text-xs mt-1 truncate">{item.name}</p>
                      {isEquipped && (
                        <span className="text-[10px] text-accent">
                          Equipped
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                <TrophyIcon className="h-4 w-4" /> Badges
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {collection.badges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className="text-center">
                      <div
                        className={`w-12 h-12 mx-auto rounded-full ${colorClasses[badge.color]} flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs mt-1 truncate">{badge.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Click on avatars or borders to equip/unequip them.
            </p>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showAvatarModal}
        onClose={() => {
          setShowAvatarModal(false);
          setAvatarFile(null);
          setAvatarPreview(null);
        }}
        title="Change Avatar"
        maxWidth="sm"
      >
        <div className="space-y-4">
          {avatarPreview && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to upload this image as your new avatar?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowAvatarModal(false);
                setAvatarFile(null);
                setAvatarPreview(null);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={uploadAvatar}
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        title="Change Username"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your new username:
          </p>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="New username"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowUsernameModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={updateUsername}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordError("");
        }}
        title="Change Password"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please confirm your new password.
          </p>
          {passwordError && (
            <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded text-sm text-red-600 dark:text-red-400">
              {passwordError}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={updatePassword}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        title="Two-Factor Authentication"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Two-factor authentication is not yet implemented. Stay tuned!
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowTwoFactorModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showEquipModal}
        onClose={() => {
          setShowEquipModal(false);
          setSelectedItem(null);
        }}
        title={selectedItem?.isEquipped ? "Unequip Item" : "Equip Item"}
        maxWidth="sm"
      >
        {selectedItem && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {selectedItem.isEquipped
                ? `Do you want to unequip "${selectedItem.name}"?`
                : `Do you want to equip "${selectedItem.name}"?`}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEquipModal(false);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              >
                Cancel
              </button>
              {selectedItem.isEquipped ? (
                <button
                  onClick={unequipItem}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                >
                  Unequip
                </button>
              ) : (
                <button
                  onClick={equipItem}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                >
                  Equip
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
            <p className="text-gray-700 dark:text-gray-300">{successMessage}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
        title="Sign Out"
        message="Are you sure you want to sign out? Your progress is saved."
        confirmText="Sign Out"
      />
    </div>
  );
}
