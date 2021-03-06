import * as React from 'react';

import './Checkbox.css';

export interface CheckboxProps {
  id: number | string;
  onChange: (id: number | string, checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  classNames?: any;
  labelBefore?: any;
  labelAfter?: any;
}

export interface CheckboxState {
  checked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps, context: object) {
    super(props, context);
    this.state = {
      checked: this.props.checked || false,
    };
  }

  componentDidUpdate(prevProps: CheckboxProps) {
    if (this.props.checked !== prevProps.checked) {
      this.setState({ checked: this.props.checked || false });
    }
  }

  toggleChecked = () => {
    this.setState(
      {
        checked: !this.state.checked,
      },
      () => this.props.onChange(this.props.id, this.state.checked)
    );
  }

  render() {
    const {
      classNames,
      labelBefore,
      labelAfter,
      disabled,
    } = this.props;
    return (
      <div
        className={`
          ${classNames ? classNames : ''} checkbox
          ${disabled ? 'checkbox--disabled' : ''}
        `}
        onClick={() => this.toggleChecked()}
      >
        {labelBefore ? labelBefore : null}
        <input type="checkbox" checked={this.state.checked} onChange={() => null} />
        {labelAfter ? labelAfter : null}
      </div>
    );
  }
}
