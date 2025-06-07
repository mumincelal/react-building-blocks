import React from "react";

type RenderIfProps<T> = {
  when: T | undefined | null | false;
  fallback?: React.ReactNode;
  children: React.ReactNode | ((item: T) => React.ReactNode);
};

/**
 * RenderIf component conditionally renders its children based on the `when` prop.
 * If `when` is truthy, it renders the children; otherwise, it renders the fallback.
 *
 * @param {RenderIfProps<T>} props - The properties for the RenderIf component.
 * @returns {React.ReactNode} The rendered children or fallback.
 */
export const RenderIf = <T,>({
  when,
  fallback = null,
  children
}: RenderIfProps<T>): React.ReactNode => {
  if (when) {
    if (typeof children === "function") {
      return children(when);
    }

    return children;
  }

  return fallback;
};

/**
 * Example usage of the RenderIf component.
 * This component demonstrates how to use RenderIf to conditionally render content.
 */
const _ExampleUsage = () => {
  const data = { name: "John Doe" };

  return (
    <RenderIf when={data} fallback={<div>No Data</div>}>
      <div>{data.name}</div>
    </RenderIf>
  );
};
