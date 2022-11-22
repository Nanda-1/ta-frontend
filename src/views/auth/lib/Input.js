import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const inputDefaultStyles = {
  width: 32,
  height: 32,
  textAlign: "center",
  marginRight: 20,
};

/**
 * This is react stateless component
 * Renders an input box
 * @param {Object} {
 *   focus,
 *   autoFocus,
 *   disabled,
 *   value,
 *   secure,
 *   ...rest
 * }
 * @returns
 */
const Input = ({
  focus,
  autoFocus,
  disabled,
  value,
  onInputFocus,
  index,
  secure,
  inputStyles,
  otpType,
  ...rest
}) => {
  const input = useRef(null);
  const componentMounted = useRef(false);
  useEffect(() => {
    // When component mounts
    if (autoFocus && focus) {
      input.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When component focus updates
    if (componentMounted.current && focus) {
      input.current.focus();
    }
    componentMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  const handelInputFocus = (event) => onInputFocus(index, event);
  let inputType = "text";
  if (secure) {
    inputType = "password";
  } else if (otpType === "number") {
    inputType = "tel";
  }
  return (
    <input
      className="mx-auto ml-4"
      style={{
        ...inputDefaultStyles,
        ...inputStyles,
        border: "solid",
        borderWidth: 1,
        color: "#338afc",
        borderRadius: 7,
        width: 45,
        height: 45,
      }}
      type={inputType}
      maxLength="1"
      ref={input}
      disabled={disabled}
      onFocus={handelInputFocus}
      value={value || ""}
      {...rest}
    />
  );
};

Input.propTypes = {
  focus: PropTypes.bool,
  autoFocus: PropTypes.bool,
  numInputs: PropTypes.number,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  secure: PropTypes.bool,
  inputStyles: PropTypes.object,
  otpType: PropTypes.oneOf(["number", "alpha", "alphanumeric", "any"]),
};

export default React.memo(Input);
