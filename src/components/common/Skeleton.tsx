// src/components/common/Skeleton.tsx
interface SkeletonProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = '1rem',
  width = '100%',
  borderRadius = '0.25rem',
  className = '',
  animation = 'pulse',
}) => {
  const animationClass = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: '',
  };

  return (
    <div
      className={`bg-gray-200 ${animationClass[animation]} ${className}`}
      style={{ height, width, borderRadius }}
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  spacing?: string;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  spacing = '0.5rem',
  className = '',
  animation = 'pulse',
}) => {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton 
          key={i} 
          width={i === lines - 1 ? '70%' : '100%'} // Last line is shorter
          animation={animation}
        />
      ))}
    </div>
  );
};

export default Skeleton;