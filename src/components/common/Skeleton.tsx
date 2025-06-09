// src/components/common/Skeleton.tsx
interface SkeletonProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
  'data-testid'?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = '1rem',
  width = '100%',
  borderRadius = '0.25rem',
  className = '',
  animation = 'pulse',
  'data-testid': dataTestId,
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
      data-testid={dataTestId}
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  spacing?: string;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
  'data-testid'?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  spacing = '0.5rem',
  className = '',
  animation = 'pulse',
  'data-testid': dataTestId,
}) => {
  // Ensure lines is a valid positive integer
  const validLines = Math.max(0, Math.floor(lines));
  
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: spacing }} data-testid={dataTestId}>
      {[...Array(validLines)].map((_, i) => (
        <Skeleton 
          key={i} 
          width={i === validLines - 1 ? '70%' : '100%'} // Last line is shorter
          animation={animation}
        />
      ))}
    </div>
  );
};

export default Skeleton;