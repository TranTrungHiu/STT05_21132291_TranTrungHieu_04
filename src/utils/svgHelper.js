/**
 * Utility functions to help with SVG rendering in the app
 */

/**
 * Loads an SVG file and injects it directly into the DOM
 * This helps with rendering issues in some browsers
 * @param {string} iconPath - Path to the SVG file
 * @param {string} className - CSS class name to apply to the SVG
 * @param {object} props - Additional properties to apply to the SVG
 * @returns {Promise<SVGElement>} - The created SVG element
 */
export const loadSvgAsInline = async (iconPath, className, props = {}) => {
  try {
    const response = await fetch(iconPath);
    const svgText = await response.text();
    
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = svgText;
    
    // Get the SVG element
    const svgElement = container.querySelector('svg');
    
    // Apply class name
    if (className) {
      svgElement.classList.add(...className.split(' '));
    }
    
    // Apply additional properties
    Object.entries(props).forEach(([key, value]) => {
      svgElement.setAttribute(key, value);
    });
    
    return svgElement;
  } catch (error) {
    console.error('Error loading SVG:', error);
    return null;
  }
};

/**
 * Preloads SVG icons for faster rendering
 * @param {Array<string>} iconPaths - Array of paths to SVG files
 * @returns {Promise<void>}
 */
export const preloadSvgIcons = async (iconPaths) => {
  try {
    const promises = iconPaths.map(path => fetch(path));
    await Promise.all(promises);
    console.log('SVG icons preloaded successfully');
  } catch (error) {
    console.error('Error preloading SVG icons:', error);
  }
};
