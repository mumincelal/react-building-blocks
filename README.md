# 🧱 react-building-blocks

**Simple, reusable, and effective UI logic components for React.**

A collection of minimalist, logic-focused React components that serve as foundational building blocks for building clean, composable user interfaces.

---

## ✨ Features

- 🧩 **Composable** – Designed to be used together or standalone.
- ⚡ **Lightweight** – No dependencies, just plain React.
- 🔁 **Reusable** – Common UI logic patterns like conditional rendering, toggles, and guards.
- 💡 **Declarative** – Keeps your JSX expressive and maintainable.

---

## 📚 Table of Contents

- [📘 Components](#-components)
  - [`RenderIf`](#renderif)
  - [`ScreenSize`](#screensize)

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
import { RenderIf } from "react-building-blocks";

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
import { ScreenSize } from "react-building-blocks";

const App = () => {
  return (
    <div>
      <ScreenSize />
      <p>Resize the window to see dimensions and breakpoint label update.</p>
    </div>
  );
};
```
