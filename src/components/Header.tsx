import { useEffect, useState } from "react";

import { useTheme } from "../hooks";
import { IconMoon, IconSun } from "../icons";

import styles from "./Header.module.scss";

const { root, title, theme_button } = styles;

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [resolvedTheme, toggleTheme] = useTheme();

  useEffect(() => setLoading(false), []);

  return (
    <header className={root}>
      <h1 className={title}>Todo</h1>

      {!loading && (
        <button
          className={theme_button}
          aria-label={`Change theme to ${
            resolvedTheme === "light" ? "dark" : "light"
          } mode`}
          onClick={toggleTheme}
        >
          {resolvedTheme === "light" ? <IconMoon /> : <IconSun />}
        </button>
      )}
    </header>
  );
};

export default Header;
