import React, { CSSProperties, PropsWithChildren } from "react";
import cx from "classnames";

import classes from "./button.module.css";

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  frontStyle?: CSSProperties;
  customStyle?: CSSProperties;
  title: string;
  type?: "button" | "reset" | "submit";

  onClick?: () => void;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  disabled,
  frontStyle,
  customStyle,
  title,
  onClick,
  type = "button",
}) => {
  const buttonStyle: CSSProperties = {
    backgroundColor: "transparent",
    pointerEvents: disabled ? "none" : "auto",
  };

  return (
    <button
      className={cx(classes["pushable"], className, {
        disabled,
      })}
      disabled={disabled}
      style={Object.assign(buttonStyle, customStyle || {})}
      tabIndex={-1}
      title={title}
      type={type}
      onClick={() => {
        if (disabled) {
          return;
        }

        onClick && onClick();
      }}
    >
      <div className={classes["pushable-front"]} style={frontStyle}>
        {children}
      </div>
    </button>
  );
};
