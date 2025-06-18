import React from "react";

/**
 * ScreenSize component displays the current screen dimensions and size category.
 * It updates the dimensions on window resize and shows them in a fixed position.
 *
 * @returns {JSX.Element} The rendered component with screen dimensions and size category.
 */
export const ScreenSize = () => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { width, height } = dimensions;

  return (
    <div className="fixed right-5 bottom-5 flex items-center gap-2 rounded-full bg-black px-2.5 py-1 font-medium font-mono text-white text-xs">
      <span>
        {width.toLocaleString()} x {height.toLocaleString()}
      </span>
      <div className="h-4 w-px bg-gray-800" />
      <span className="sm:hidden">XS</span>
      <span className="hidden sm:inline md:hidden">SM</span>
      <span className="hidden md:inline lg:hidden">MD</span>
      <span className="hidden lg:inline xl:hidden">LG</span>
      <span className="hidden xl:inline 2xl:hidden">XL</span>
      <span className="hidden 2xl:inline">2XL</span>
    </div>
  );
};

/**
 * Example usage of the ScreenSize component.
 * This component demonstrates how to use ScreenSize to display current screen dimensions.
 */
const _ExampleUsage = () => {
  return (
    <div className="size-screen">
      <ScreenSize />
      <div className="p-4">
        Resize the window to see the screen size update.
      </div>
    </div>
  );
};
