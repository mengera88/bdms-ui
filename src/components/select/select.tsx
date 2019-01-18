import * as React from 'react';
import SelectOption, { SelectOptionProps } from './option';
import SelectDefault from './default';
import SelectMulti from './multi';
import SelectTag from './tag';
import { Icon } from '../icon';
import { Omit } from '../../lib/type';
import { InputProps } from '../input/Input';
import { DropdownTriggerProps } from '../helpers/DropdownTrigger';

export interface SelectPropsInterface extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue' | 'width'> {
  width?: number;
  disabled?: boolean;
  icon?: Icon;
  dropdownRender?: (options: React.ReactNode) => React.ReactNode;
  hideCaret?: boolean;
  children?: React.ReactElement<SelectOptionProps>[];
  onChange?: (value: string | string[], ...args) => void;
  onShownChange?: (shown: boolean) => void;
  popupProps?: DropdownTriggerProps;
}

interface SelectProps {
  mode?: 'default' | 'multi' | 'tag';
  [propName: string]: any;
}

export class Select extends React.Component<SelectProps> {
  public static Option = SelectOption;

  public static defaultProps: Partial<SelectProps> = {
    mode: 'default',
    width: 180
  };

  public static Components = {
    default: SelectDefault,
    multi: SelectMulti,
    tag: SelectTag
  };

  public render(): React.ReactNode {
    const { mode, ...props } = this.props;
    const SelectComponent = Select.Components[mode!] as React.ReactType;

    return <SelectComponent {...props} />;
  }
}
