// src/components/settings/EditProfile.tsx
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useForm } from "../../hooks/useForm";
import { useNotificationContext } from "../../components/providers/NotificationProvider";
import { isValidEmail } from "../../utils/validators";
import Input from "../common/Input";
import Button from "../common/Button";
import * as React from "react";
import Avatar from "../common/Avatar";

const EditProfile: React.FC = () => {
  const { profile, updateProfile, isLoading } = useUserStore();
  const { addNotification } = useNotificationContext();

  // Initialize form with validation rules
  const form = useForm({
    name: {
      initialValue: profile?.name || "",
      validations: { required: true },
    },
    email: {
      initialValue: profile?.email || "",
      validations: {
        required: true,
        validate: (value) =>
          isValidEmail(value) || "Please enter a valid email",
      },
    },
    username: {
      initialValue: profile?.username || "",
      validations: { required: true },
    },
    dob: {
      initialValue: profile?.dob || "",
      validations: {},
    },
    presentAddress: {
      initialValue: profile?.presentAddress || "",
      validations: {},
    },
    permanentAddress: {
      initialValue: profile?.permanentAddress || "",
      validations: {},
    },
    city: {
      initialValue: profile?.city || "",
      validations: {},
    },
    postalCode: {
      initialValue: profile?.postalCode || "",
      validations: {},
    },
    country: {
      initialValue: profile?.country || "",
      validations: {},
    },
  });

  // Update form values when profile changes
  useEffect(() => {
    if (profile) {
      form.values.name = profile.name;
      form.values.email = profile.email;
      form.values.username = profile.username;
      form.values.dob = profile.dob || "";
      form.values.presentAddress = profile.presentAddress;
      form.values.permanentAddress = profile.permanentAddress || "";
      form.values.city = profile.city;
      form.values.postalCode = profile.postalCode || "";
      form.values.country = profile.country;
    }
  }, [profile, form.values]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await updateProfile(values);
      addNotification("success", "Profile updated successfully!");
    } catch (error) {
      addNotification("error", "Failed to update profile");
    }
  });

  // Handle image upload
  const [imagePreview, setImagePreview] = useState(profile?.profileImage || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Custom DateInput component with dropdown icon
  const DateInput = ({ label, name, value, onChange, onBlur, error }: any) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`block rounded-xl border text-sm ${
              error ? "border-red-500" : "border-gray-300"
            } 
              focus:ring-blue-500 focus:border-blue-500 w-full pl-3 pr-10 py-2 text-[#718EBF]`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Profile Image */}
      <div className="flex items-start mb-8">
        <div className="relative mr-8">
          <img
            src={imagePreview || profile?.profileImage}
            alt={profile?.name}
            className="w-[98px] h-[91px] rounded-full object-cover"
          />
          <label
            htmlFor="profile-image"
            className="absolute -right-1 bottom-0 bg-black text-white p-1 rounded-full cursor-pointer hover:bg-blue-700"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        {/* Form Fields in Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
          {/* Your Name */}
          <Input
            fullWidth
            label="Your Name"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.name ? form.errors.name : undefined}
          />
          {/* User Name */}
          <Input
            fullWidth
            label="Username"
            name="username"
            value={form.values.username}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.username ? form.errors.username : undefined}
          />
          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.email ? form.errors.email : undefined}
          />
          {/* Password */}
          <Input
            label="Password"
            type="password"
            value="**********"
            disabled={true}
            readOnly={true}
            hint="You can change your password in the Security tab"
          />
          {/* Date of Birth - with dropdown icon */}
          <DateInput
            label="Date of Birth"
            name="dob"
            value={form.values.dob}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.dob ? form.errors.dob : undefined}
          />
          {/* Present Address */}
          <Input
            label="Present Address"
            name="presentAddress"
            value={form.values.presentAddress}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={
              form.touched.presentAddress
                ? form.errors.presentAddress
                : undefined
            }
          />
          {/* Permanent Address */}
          <Input
            label="Permanent Address"
            name="permanentAddress"
            value={form.values.permanentAddress}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={
              form.touched.permanentAddress
                ? form.errors.permanentAddress
                : undefined
            }
          />
          {/* City */}
          <Input
            label="City"
            name="city"
            value={form.values.city}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.city ? form.errors.city : undefined}
          />
          {/* Postal Code */}
          <Input
            label="Postal Code"
            name="postalCode"
            value={form.values.postalCode}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.postalCode ? form.errors.postalCode : undefined}
          />
          {/* Country */}
          <Input
            label="Country"
            name="country"
            value={form.values.country}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.country ? form.errors.country : undefined}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
          className="bg-black text-white py-3 px-10 rounded-lg text-base font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
