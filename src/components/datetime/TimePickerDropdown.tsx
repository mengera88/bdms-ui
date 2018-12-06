import cnb from 'classnames/bind';
import { padStart } from 'lodash';
import * as React from 'react';
import { smoothScroll } from '../../lib/util';
import styles from './time-picker.scss';

const cx = cnb.bind(styles)

const defaultHourRanger = new Array<number>(24).fill(0).map((_, index) => index)
const defaultMintueRanger = new Array<number>(60).fill(0).map((_, index) => index)
const defaultRanger = [defaultHourRanger, defaultMintueRanger]

function normalizeTime(time: number) {
  if (typeof time !== 'number') {
    return 0
  }

  return time || 0
}

export interface TimePickerDropdownProps {
  time: [number, number],
  ranger?: [number[], number[]],
  onClick?: (values: [number, number]) => void
}

export default class TimePickerDropdown extends React.Component<TimePickerDropdownProps> {
  public moveToTop = (dom?: HTMLDivElement) => {
    if (!dom) { return }
    const parent = dom.parentElement as HTMLDivElement
    const top = dom.offsetTop
    smoothScroll(parent, top)
  }

  public onClick = (time) => {
    if (this.props.onClick) {
      this.props.onClick(time.map(normalizeTime))
    }
  }

  public render() {
    const { time, ranger = defaultRanger } = this.props
    const emptyBlock = new Array(4).fill(0).map((_, index) => (<div key={`empty-${index}`} className={cx('dropdown-option', 'dropdown-option--empty')}/>))
    return (
      <div className={cx('dropdown-content')}>
        {time.map((value, index) => {
          const range = ranger[index] || defaultRanger[index]
          return (
            <div key={index} className={cx('dropdown-select')}>
              {range.map(option => {
                const props: any = { className: cx('dropdown-option') }

                if (option === value) {
                  props.ref = this.moveToTop
                  props.className = cx(props.className, 'dropdown-option--active')
                } else {
                  props.onClick = (e) => {
                    const array = [...time]
                    array[index] = option
                    this.onClick(array)
                  }
                }

                return (
                  <div key={option} {...props}>{padStart(`${option}`, 2, '0')}</div>
                )
              })}
              {emptyBlock}
            </div>
          )
        })}
      </div>
    )
  }
}
