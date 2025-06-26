import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, User, Mail, Phone, Save, Edit3 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from "@/redux/features/auth/authSlice";
import ChurchForm from "./components/church-form";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/user/userApiSlice";
import moment from "moment";
import toast from "react-hot-toast";

const Profile = () => {
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  const { data: userData, refetch } = useGetUserProfileQuery({});

  const [updateUser, { isLoading: updatingUser }] =
    useUpdateUserProfileMutation();

  const [profileData, setProfileData] = useState({
    name: userData?.name ?? user?.name ?? "",
    email: userData?.email ?? user?.email ?? "",
    phone: userData?.phone ?? user?.phone ?? "",
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLogo(file);
      const localUrl = URL.createObjectURL(file);
      setImageSrc(localUrl);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEdit = (field: "name" | "email") => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser({
        email: profileData?.email,
        name: profileData?.name,
        phone: profileData?.phone,
      })
        .then((res) => {
          if (res?.data) {
            refetch();
            dispatch(setCredentials({ user: res.data, token: token }));

            toast(
              JSON.stringify({
                type: "success",
                title: `Profile updated successfully`,
              })
            );
          }
        })
        .catch((e) => {
          toast(
            JSON.stringify({
              type: "error",
              title: "An error occurred while updating profile",
            })
          );
        });
    } catch (error) {}

    setIsEditing({ name: false, email: false });

    console.log("Saving profile data:", { profileData, selectedLogo });
  };

  return (
    <div className=" bg-gradient-to-br py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg overflow-hidden"
        >
          {/* Profile Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-300 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Upload Button Overlay */}
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
                <p className="text-blue-100 mb-1">{profileData.email}</p>
                <p className="text-blue-200 text-sm">
                  Member since {moment(user?.created_at).format("LL")}
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-4 lg:p-8">
            <div className="space-y-5">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <label className="font-normal text-xs">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onFocus={() => toggleEdit("name")}
                    onBlur={() => toggleEdit("name")}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none transition-all duration-200 text-gray-900 font-medium"
                    placeholder="Enter your full name"
                  />
                  {isEditing.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <Edit3 className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-1"
              >
                <label className="font-normal text-xs">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => toggleEdit("email")}
                    onBlur={() => toggleEdit("email")}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none transition-all duration-200 text-gray-900"
                    placeholder="Enter your email address"
                  />
                  {isEditing.email && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <Edit3 className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Phone (Disabled) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="font-normal text-xs">
                  Phone Number
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    Contact Support to Change
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-300" />
                  </div>
                  <input
                    type="tel"
                    value={profileData.phone}
                    disabled
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed font-medium"
                  />
                </div>
                <p className="text-sm text-gray-500 ml-1">
                  For security reasons, phone number changes require
                  verification. Please contact support.
                </p>
              </motion.div>
            </div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-end"
            >
              <button
                onClick={handleSave}
                disabled={updatingUser}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-300 text-white rounded-md hover:from-primary-700 hover:to-purple-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {updatingUser ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3" />
                    Save Changes
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 bg-white rounded-lg p-4 lg:p-6"
        >
          {/* Form Section */}
          <ChurchForm />
        </motion.div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 bg-white rounded-lg  p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Account Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Phone Verification</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Verified
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
