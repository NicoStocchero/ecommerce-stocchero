/**
 * @fileoverview Authentication button component with loading states and accessibility.
 * Uses the modern Button component with Nike-inspired design.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { Button } from "../UI";

/**
 * AuthButton component props
 * @typedef {Object} AuthButtonProps
 * @property {string} title - Button text to display
 * @property {function} onPress - Callback function when button is pressed
 * @property {boolean} [loading=false] - Whether to show loading spinner
 * @property {boolean} [disabled=false] - Whether the button is disabled
 */

/**
 * Authentication button component using modern Button design
 * @param {AuthButtonProps} props - Component props
 * @returns {React.JSX.Element} Rendered authentication button
 */
const AuthButton = ({ title, onPress, loading, disabled }) => (
  <Button
    title={title}
    onPress={onPress}
    variant="primary"
    size="large"
    loading={loading}
    disabled={disabled}
    style={{ marginTop: 8 }}
  />
);

export default AuthButton;
