import * as React from "react"
import { theme } from "../theme"
import styled from "styled-components"

// Types
export type Props = {
  /** Optional string that can be used to set the button value */
  text?: string

  /** Make button grow to 100% */
  fluid?: boolean

  /** Disable button */
  disabled?: boolean

  /** Button kind */
  kind?: "default" | "primary" | "danger"
}

// Component
export const Button2: React.FC<Props> = ({
  text,
  fluid,
  disabled,
  children,
  kind
}) => (
  <StyledButton
    className={`${fluid ? "fluid" : ""} ${disabled ? "disabled" : ""} ${
      kind ? kind : ""
    }`}
  >
    {text || children}
  </StyledButton>
)

// Styles
const StyledButton = styled.button2`
  background: ${theme.color.paneBg};
  border-radius: 4px;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  color: ${theme.color.body};
  font-family: ${theme.font};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 1.1;
  margin: 0;
  padding: ${theme.space[3]};
  text-align: center;
  &:hover {
    color: ${theme.color.bodyLight};
    transition: box-shadow 0.2s, color 0.2s, background-color 0.2s;
    box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1),
      0px 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
  &:active {
    transition: none;
    color: ${theme.color.bodyLighter};
    background-color: ${theme.color.paneBgDark};
    box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.05),
      inset 0px 0px 0px 1px hsla(0, 0%, 0%, 0.05);
  }
  &.fluid {
    width: 100%;
  }
  &.disabled {
    color: ${theme.color.bodyLightest};
    pointer-events: none;
  }

  /* Primary styles */
  &.primary {
    background: ${theme.color.primary};
    color: #fff;
  }
  &.primary:hover {
    color: rgba(255, 255, 255, 0.8);
    box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.15);
  }
  &.primary:active {
    color: rgba(255, 255, 255, 0.7);
    background: ${theme.color.primaryDark};
    box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
      inset 0px 0px 0px 1px hsla(0, 0%, 0%, 0.05);
  }

  /* Danger styles */
  &.danger {
    background: ${theme.color.danger};
    color: #fff;
  }
  &.danger:hover {
    color: rgba(255, 255, 255, 0.8);
    box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.15);
  }
  &.danger:active {
    color: rgba(255, 255, 255, 0.6);
    background: ${theme.color.dangerDark};
    box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
      inset 0px 0px 0px 1px hsla(0, 0%, 0%, 0.05);
  }
`
