import type { FC, AnimationEventHandler, MouseEventHandler } from "react";
import { useState } from "react";

import { mergeClassNames } from "../helpers/merge-class-names";
import { IconCheck } from "../icons";

import styles from "./CheckButton.module.scss";

const { root, check, uncheck, mark, unmark } = styles;

const CheckButton: FC<CheckButtonProps> = ({
  type = "button",
  checked,
  keepChecked = true,
  className,
  onChange,
  ...rest
}) => {
  const [_checked, setChecked] = useState(checked);
  const [unchecking, setUnchecking] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.button !== 0) return;
    if (keepChecked) {
      setChecked((status) => !status);
      onChange?.();
    }
    if (!keepChecked && !_checked) setChecked(true);
  };

  const handleAnimationEnd: AnimationEventHandler<SVGSVGElement> = (event) => {
    const { animationName } = event;
    if (animationName === mark) setUnchecking(true);
    if (animationName === unmark) {
      setChecked(false);
      setUnchecking(false);
    }
  };

  return (
    <button
      type={type}
      className={mergeClassNames([root, className])}
      onClick={handleClick}
      {...rest}
    >
      {_checked && (
        <IconCheck
          className={mergeClassNames({
            [check]: !keepChecked && _checked,
            [uncheck]: !keepChecked && unchecking,
          })}
          onAnimationEnd={handleAnimationEnd}
        />
      )}
    </button>
  );
};

export default CheckButton;
