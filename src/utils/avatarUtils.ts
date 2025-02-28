// src/utils/avatarUtils.ts

/**
 * Generate an SVG data URL with user initial for avatar fallback
 * @param name - User's name
 * @returns SVG data URL
 */
export const generateInitialAvatar = (name: string): string => {
    // Use first letter of name, default to '?' if name is empty
    const initial = name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
    
    // Get a consistent background color for this name
    const bgColor = getColorForName(name);
    
    // Create an SVG for the avatar
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="${bgColor}" />
        <text 
          x="50" 
          y="50" 
          font-family="Arial, sans-serif" 
          font-size="40" 
          font-weight="bold" 
          fill="white" 
          text-anchor="middle" 
          dominant-baseline="central"
        >${initial}</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };
  
  /**
   * Get a consistent color for a name (excluding white)
   * @param name - Name to generate color for
   * @returns Hex color code
   */
  export const getColorForName = (name: string): string => {
    // Vibrant colors excluding any light/white shades
    const colors = [
      '#3B82F6', // blue-500
      '#F59E0B', // amber-500
      '#10B981', // emerald-500
      '#EF4444', // red-500
      '#8B5CF6', // violet-500
      '#EC4899', // pink-500
      '#14B8A6', // teal-500
      '#F97316', // orange-500
      '#6366F1', // indigo-500
      '#06B6D4', // cyan-500
      '#84CC16', // lime-500
      '#D946EF', // fuchsia-500
      '#7C3AED', // purple-500
    ];
    
    // If name is empty, return a default color
    if (!name || name.trim() === '') {
      return colors[0];
    }
    
    // Create a hash of the name to get a consistent index
    const hash = name.split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
    // Use modulo to get a color from the array
    return colors[hash % colors.length];
  };