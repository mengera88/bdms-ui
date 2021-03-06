import React, { Component, ReactElement } from 'react';
import classNames from 'classnames/bind';

import styles from './menu.scss';
import MenuItem from './menuItem';
import Divider from './divider';
import MenuItemGroup from './menuItemGroup';
import SubMenu from './subMenu';
import { Icon } from '../icon';
import { Provider } from './menuContext';
import { IMenuContextType } from './menuContext';
import { scrollAnimation } from '../../lib/util';

const MAX_HEIGHT = 458;
const SCROLL_UNIT = 200;

interface IMenuProps {
  mode?: 'horizontal' | 'vertical' | 'inline';
  className?: string;
  scrollUnit?: number;
  multiple?: boolean; // 是否多选
  isTick?: boolean; // 是否是打钩选中
  selected?: string | string[]; // 初始化选中的项目
  hasCheckBox?: boolean; // 项目是否含有checkbox选项
  onSelect?: (selected: string | string[], current: string) => void; // 外部通过这个函数获取选中的value值
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
}

interface IMenuState {
  readonly showTopOverflow: boolean; // 出现向上滚动控制条
  readonly showBottomOverflow: boolean; // 出现向下滚动控制条
  readonly value: IMenuContextType;
}

const cx = classNames.bind(styles);

export class Menu extends Component<IMenuProps, IMenuState> {
  public static Item = MenuItem;
  public static Divider = Divider;
  public static ItemGroup = MenuItemGroup;
  public static SubMenu = SubMenu;
  public static defaultProps: Partial<IMenuProps> = {
    mode: 'vertical',
    multiple: false,
    isTick: false,
    scrollUnit: SCROLL_UNIT,
    hasCheckBox: false
  };
  public static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selected && nextProps.selected !== prevState.value.selected) {
      return Object.assign({}, prevState, {value: Object.assign({}, prevState.value, {selected: nextProps.selected})})
    } 
    return null;
  }
  public menuContentDom: React.RefObject<any> = React.createRef<any>();
  public isRootMenu = true;
  public readonly state: Readonly<IMenuState> = {
    showBottomOverflow: false,
    showTopOverflow: false,
    value: {
      clickItem: this.clickItem.bind(this),
      selected: this.props.selected ? this.props.selected : this.props.multiple ? [] : '',
      isTick: this.props.isTick,
      mode: this.props.mode,
      hasCheckBox: this.props.hasCheckBox
    }
  };

  constructor(props: IMenuProps) {
    super(props);
    this.scroll = this.scroll.bind(this);
    this.wheel = this.wheel.bind(this);
    this.clickItem = this.clickItem.bind(this);
    this.clickScrollUp = this.clickScrollUp.bind(this);
    this.clickScrollBottom = this.clickScrollBottom.bind(this);
  }
  

  public clickItem(key) {
    const { multiple, onSelect } = this.props;
    let value;

    if (!multiple) {
      value = Object.assign({}, this.state.value, { selected: key });
    } else {
      const { selected } = Object.assign({}, this.state.value);
      if ((selected as string[]).indexOf(key) === -1) {
        (selected as string[]).push(key);
      } else {
        (selected as string[]).splice((selected as string[]).indexOf(key), 1);
      }
      value = Object.assign({}, this.state.value, { selected });
    }
    this.setState({
      value
    });
    if (onSelect) {
      onSelect(value.selected, key);
    }
  }

  public componentDidMount() {
    const contentDom = this.menuContentDom.current;
    if (contentDom.scrollHeight > MAX_HEIGHT) {
      this.toggleBottomOverflow(true);
    }
  }

  public toggleBottomOverflow(showBottomOverflow) {
    this.setState({
      showBottomOverflow
    });
  }

  public toggleTopOverflow(showTopOverflow) {
    this.setState({
      showTopOverflow
    });
  }

  public scroll(e) {
    const el = this.menuContentDom.current;
    this.scrollControl(el);
  }

  public scrollControl(el) {
    if (el.offsetHeight < el.scrollHeight) {
      this.toggleBottomOverflow(true);
    } else {
      this.toggleBottomOverflow(false);
    }

    if (el.scrollTop === el.scrollHeight - el.offsetHeight) {
      this.toggleBottomOverflow(false);
    }

    if (el.scrollTop > 0) {
      this.toggleTopOverflow(true);
    } else {
      this.toggleTopOverflow(false);
    }
  }

  public clickScrollUp(e) {
    const { scrollUnit } = this.props;
    const el = this.menuContentDom.current;
    let scrollTop = el.scrollTop;
    scrollTop -= scrollUnit!;
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    scrollAnimation(el, 'up', scrollTop);
  }

  public clickScrollBottom(e) {
    const { scrollUnit } = this.props;
    const el = this.menuContentDom.current;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;
    let scrollTop = el.scrollTop;
    scrollTop += scrollUnit!;
    if (scrollTop > scrollHeight - clientHeight) {
      scrollTop = scrollHeight - clientHeight;
    }
    scrollAnimation(el, 'down', scrollTop);
  }

  /**
   * 防止下拉到最低端时页面也随之滚动
   * @param {domEvent} e wheel事件
   */
  public wheel(e) {
    const deltaY = e.deltaY;
    const el = this.menuContentDom.current;
    if (deltaY > 0 && el.scrollTop === el.scrollHeight - el.offsetHeight) {
      e.preventDefault();
    }
  }

  public render() {
    const { className, children, mode } = this.props;
    const { showBottomOverflow, showTopOverflow } = this.state;
    let menuClasses;
    let menuCom;
    if (mode === 'vertical') {
      menuClasses = cx('u-menu', className);
      menuCom = (<div className={menuClasses}>
        {showTopOverflow && (<div className={cx('handle-top')} onClick={this.clickScrollUp}>
          <Icon name="chevron-up"/>
        </div>)}
        <div className={cx('content')} ref={this.menuContentDom} onScroll={this.scroll} onWheel={this.wheel}>
          {React.Children.map(children, (child: ReactElement<any>) => {
            return React.cloneElement(child);
          })}
        </div>
        {showBottomOverflow && (<div className={cx('handle-bottom')} onClick={this.clickScrollBottom}>
          <Icon name="chevron-down"/>
        </div>)}
      </div>);
    } else if (mode === 'horizontal') {
      menuClasses = cx('u-menu-horizontal', className);
      menuCom = (<div className={menuClasses}>
        <div className={cx('content-horizontal')} ref={this.menuContentDom}>
          {React.Children.map(children, (child: ReactElement<any>) => {
            return React.cloneElement(child);
          })}
        </div>
      </div>);
    } else if (mode === 'inline') {
      menuClasses = cx('u-menu-inline', className);
      menuCom = (<div className={menuClasses}>
        <div className={cx('content-inline')} ref={this.menuContentDom}>
          {React.Children.map(children, (child: ReactElement<any>) => {
            return React.cloneElement(child);
          })}
        </div>
      </div>);
    }

    return <Provider value={this.state.value}>{menuCom}</Provider>;
  }
}
