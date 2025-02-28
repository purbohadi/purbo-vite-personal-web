// src/components/settings/EditProfile.tsx
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useForm } from "../../hooks/useForm";
import { useNotificationContext } from "../../components/providers/NotificationProvider";
import { isValidEmail } from "../../utils/validators";
import Input from "../common/Input";
import Button from "../common/Button";
import * as React from "react";
import { useIsMobile } from "../../hooks/useMediaQuery";
// import Avatar from "../common/Avatar";

const EditProfile: React.FC = () => {
  const { profile, updateProfile, isLoading } = useUserStore();
  const { addNotification } = useNotificationContext();
  const isMobile = useIsMobile();

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

  // Mobile layout
  if (isMobile) {
    return (
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 pb-24">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={imagePreview || profile?.profileImage}
                alt={profile?.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="profile-image"
              className="absolute bottom-1 right-1 bg-gray-800 rounded-full p-1.5 cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className={`w-full p-3 border rounded-md ${
                form.touched.name && form.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {form.touched.name && form.errors.name && (
              <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              type="text"
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className={`w-full p-3 border rounded-md ${
                form.touched.username && form.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {form.touched.username && form.errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {form.errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className={`w-full p-3 border rounded-md ${
                form.touched.email && form.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {form.touched.email && form.errors.email && (
              <p className="mt-1 text-xs text-red-500">{form.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value="**********"
              disabled
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="text"
                name="dob"
                value={form.values.dob}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className="w-full p-3 border border-gray-300 rounded-md pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Present Address
            </label>
            <input
              type="text"
              name="presentAddress"
              value={form.values.presentAddress}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permanent Address
            </label>
            <input
              type="text"
              name="permanentAddress"
              value={form.values.permanentAddress}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={form.values.city}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={form.values.postalCode}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={form.values.country}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Save Button - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md">
          <button
            type="submit"
            disabled={isLoading || form.isSubmitting || !form.isValid}
            className="w-full py-3 bg-black text-white rounded-lg font-medium"
          >
            {isLoading || form.isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    );
  }

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
          className="bg-black text-white min-w-48 py-3 px-10 rounded-lg text-base font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
