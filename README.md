# 🧱 react-building-blocks

**Simple, reusable, and effective UI logic components and hooks for React.**

A collection of minimalist, logic-focused React components and hooks that serve as foundational building blocks for building clean, composable user interfaces.

---

## ✨ Features

- 🧩 **Composable** – Designed to be used together or standalone.
- ⚡ **Lightweight** – No dependencies, just plain React.
- 🔁 **Reusable** – Common UI logic patterns like conditional rendering, toggles, and guards.
- 💡 **Declarative** – Keeps your JSX expressive and maintainable.
- ❤️ **Zero Installation** – No setup required, just import and use.

---

## 📚 Table of Contents

- [📘 Components](#-components)
  - [`RenderIf`](#renderif)
  - [`ScreenSize`](#screensize)

- [🔧 Hooks](#-hooks)
  - [`useCopyToClipboard`](#usecopytoclipboard)
  - [`useMountEffect`](#usemounteffect)
  - [`useUnMountEffect`](#useunmounteffect)
  - [`useDebounce`](#usedebounce)

---

## 📘 Components

### `RenderIf`

A lightweight conditional rendering component that renders its children when a condition is truthy. You can provide a fallback to render when the condition is falsy.

#### ✅ Props

| Name       | Type                                     | Description                                                                 |
|------------|------------------------------------------|-----------------------------------------------------------------------------|
| `when`     | `T \| undefined \| null \| false`         | The condition to determine whether to render the children.                 |
| `children` | `ReactNode \| ((item: T) => ReactNode)`   | The content to render when `when` is truthy. Can be a render function.     |
| `fallback` | `ReactNode`                              | *(Optional)* Fallback to render when `when` is falsy. Default is `null`.   |

#### 📝 Usage Example

```tsx
import { RenderIf } from "@components";

const Example = () => {
  const user = { name: "John Doe" };

  return (
    <RenderIf when={user} fallback={<div>No User Found</div>}>
      <div>Hello, {user.name}!</div>
    </RenderIf>
  );
};
```

### `ScreenSize`

A developer utility component that displays the current screen width, height, and Tailwind-style screen size label (e.g., `SM`, `MD`, `LG`, etc.). It updates live on window resize and renders as a fixed element on the screen.

> Useful during development to quickly inspect responsive breakpoints in real-time.

#### 🧰 Features

- Shows current screen `width x height`
- Displays responsive label: `XS`, `SM`, `MD`, `LG`, `XL`, `2XL`
- Auto-updates on window resize
- Tailwind CSS-based visibility logic

#### 📝 Usage Example

```tsx
import { ScreenSize } from "@components";

const App = () => {
  return (
    <div>
      <ScreenSize />
      <p>Resize the window to see dimensions and breakpoint label update.</p>
    </div>
  );
};
```

## 🔧 Hooks

### `useCopyToClipboard`

A custom hook that provides a function to copy text to the clipboard and manages the copy state.

#### 📝 Usage Example

```tsx
import { useCopyToClipboard } from "@hooks";

const App = () => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div>
      <button onClick={() => copyToClipboard("Hello, World!")}>
        Copy to Clipboard
      </button>
      {isCopied && <span>Copied!</span>}
    </div>
  );
};
```

### `useMountEffect`

A custom hook that runs a function when the component mounts. It is useful for performing side effects like data fetching or subscriptions.

#### 📝 Usage Example

```tsx
import { useMountEffect } from "@hooks";

const App = () => {
  useMountEffect(() => {
    console.log("Component mounted");
  });

  return <div>Hello, World!</div>;
};
```

### `useUnMountEffect`

A custom hook that runs a function when the component unmounts. It is useful for cleanup tasks like unsubscribing from events or cancelling requests.

#### 📝 Usage Example

```tsx
import { useUnMountEffect } from "@hooks";

const App = () => {
  useUnMountEffect(() => {
    console.log("Component unmounted");
  });

  return <div>Hello, World!</div>;
};
```

### `useDebounce`

A custom hook that debounces a value, returning the debounced value after a specified delay. This is useful for optimizing performance in scenarios like search inputs or live updates.

#### 📝 Usage Example

```tsx
import { useDebounce } from "@hooks";

const App = () => {
  const { value, debouncedValue, setValue } = useDebounce(inputValue, 500);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};
```
