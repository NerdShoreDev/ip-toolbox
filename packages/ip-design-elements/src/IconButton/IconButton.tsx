import * as React from 'react';

import { Ripple } from '../Ripple/Ripple';

import './IconButton.css';

export interface IconButtonProps {
  /** what the icon the button is to show  */
  icon: string;
  /** additional classNames provided by the parent  */
  classNames?: any;
  /** what the button will do  */
  onClick?: () => void;
  /** what type the button is supposed to be  */
  type?: 'flat' | 'simple';
  /** the theme of the icon and the ripple  */
  color?: 'accent' | 'success' | 'warning' | 'danger';
  /** whether the button is clickable  */
  disabled?: boolean;
  /** whether the button is filled with the chosen color  */
  filled?: boolean;
  /** optional parameter to adjust inline style  */
  style?: any;
  /** optional parameter handle touch start event  */
  onTouchStart?: (e: any) => void;
  /** optional parameter handle mouse enter event  */
  onMouseEnter?: (e: any) => void;
  /** optional parameter handle touch end event */
  onTouchEnd?: (e: any) => void;
  /** optional parameter handle mouse leave event  */
  onMouseLeave?: (e: any) => void;
}

export interface IconButtonState {
  cursorPos: {
    top: number;
    left: number;
    time: number;
  };
  parent: any;
}

export class IconButton extends React.Component<IconButtonProps, IconButtonState> {
  public static defaultProps: Partial<IconButtonProps> = {
    disabled: false,
    type: 'flat',
  };

  public constructor(props: IconButtonProps) {
    super(props);

    this.state = {
      cursorPos: {
        top: 0,
        left: 0,
        time: Date.now(),
      },
      parent: null,
    };
  }

  public handleClick = (e: any) => {
    // Get Cursor Position
    const cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now()
    };
    const parent = e.target;
    this.setState({ cursorPos: cursorPos, parent });
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  public render() {
    const {
      classNames,
      color,
      disabled,
      filled,
      icon,
      type,
      style,
      onMouseEnter,
      onMouseLeave,
      onTouchEnd,
      onTouchStart
    } = this.props;
    const { cursorPos, parent } = this.state;
    const modColor = color === 'success' ? 'icon-button--success' :
      color === 'danger' ? 'icon-button--danger' :
      color === 'accent' ? 'icon-button--accent' :
      color === 'warning' ? 'icon-button--warning' : '';
    const modType = type === 'flat' ? '' :
      type === 'simple' ? 'icon-button--simple' : '';
    let inlineStyle = {};
    if (style) {
      inlineStyle = {
        ...style
      };
    }
    return (
      <button
        className={`
          ${classNames ? classNames : ''}
          icon-button
          ${color ? modColor : ''}
          ${type ? modType : ''}
          ${filled ? 'icon-button--filled' : ''}
        `}
        style={inlineStyle}
        disabled={disabled}
        onClick={this.handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        <i className={`material-icons`}>{icon}</i>
        <Ripple cursorPos={cursorPos} parent={parent} classNames="icon-button_ripple"/>
      </button>
    );
  }
}
