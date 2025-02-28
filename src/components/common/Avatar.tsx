// src/components/common/Avatar.tsx
import { useState } from "react";
import { generateInitialAvatar } from "../../utils/avatarUtils";
import AvatarCathSrc from "../../assets/avatars/catherine.jpg";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string | null; // Image URL may be optional
  alt: string; // Name (required for fallback)
  size?: AvatarSize;
  className?: string;
  status?: "online" | "offline" | "busy";
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  className = "",
  status,
  onClick,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(src || null);
  const [imageError, setImageError] = useState(false);

  // Size styles
  const sizeStyles = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  // Status indicator colors
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
  };

  // Handle image loading error
  const handleError = () => {
    if (!imageError) {
      setImageSrc(null);
      setImageError(true);
    }
  };

  // Generate the fallback image with initials when needed
  const avatarSrc = imageSrc || generateInitialAvatar(alt);

  return (
    <div
      className={`relative inline-block ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div
        className={`overflow-hidden rounded-full ${sizeStyles[size]} ${className}`}
      >
        <img
          src={avatarSrc}
          alt={alt}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${statusColors[status]}`}
          style={{
            width: "25%",
            height: "25%",
            minWidth: "8px",
            minHeight: "8px",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
