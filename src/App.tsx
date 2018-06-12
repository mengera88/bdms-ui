/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:42:37 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-12 15:48:17
 */
import React, { Component } from 'react';

// import { Cartesian, Detail, Example, Library } from "@compositor/kit";
import classNames from 'classnames/bind';
import styles from './App.scss';
import Button from './components/button/index';
import Checkbox from './components/checkbox/index';
import { Col, Grid, Row } from './components/grid';
import Icon from './components/icon';
import Layout from './components/layout';
import Switch from './components/switch';
import Tag from './components/tag';

const cx = classNames.bind(styles);

const icons = [
  'file-mini',
  'order-down',
  'order-up',
  'choose',
  'choose-cancle',
  'stop',
  'log-big',
  'more',
  'notebook',
  'query',
  'sidebar-up',
  'sidebar-down',
  'format2',
  'fullscreen',
  'run2',
  'save2',
  'download',
  'light-off',
  'light-on',
  'rerun',
  'cancel',
  'disable',
  'result',
  'info',
  'release',
  'project',
  'project-open',
  'folder-closed',
  'folder-open',
  'taskflows',
  'node',
  'database',
  'table',
  'waiting',
  'ok',
  'warning',
  'error',
  'script',
  'loaddata',
  'top',
  'save',
  'format',
  'package',
  'run',
  'refresh',
  'setting',
  'preparing',
  'running',
  'killed',
  'paused',
  'succeeded',
  'failed',
  'field',
  'statistics',
  'instance',
  'tasklist',
  'projectcenter',
  'zoomin',
  'zoomout',
  'original',
  'search',
  'back',
  'add',
  'close-circle',
  'filter',
  'close',
  'chevron-down',
  'chevron-up',
  'caret-down',
  'message',
  'calendar',
  'time',
  'log',
  'copy',
  'delete',
  'edit',
  'view',
  'right',
  'left',
  'arrow'
];

class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      checboxCheck: false
    };
    this.checkChange = this.checkChange.bind(this);
  }

  public clickButton(e) {
    console.log('button click', e);
  }

  public checkChange(e) {
    const { checboxCheck } = this.state;
    this.setState({
      checboxCheck: !checboxCheck
    });
  }

  public checkGroupChange(checkLists: object[]) {
    console.log(checkLists);
  }

  public render() {
    const { checboxCheck } = this.state;
    return (
      <Layout>
        <Grid fluid={true}>
          <Row>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button>按钮s</Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button href="www.baidu.com" icon="add">
                  链接
                </Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button type="primary" icon="table">
                  primary
                </Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button type="default" icon="table">
                  default
                </Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button type="text">text</Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button type="primary" size="small" icon="table">
                  primary-small
                </Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button type="default" size="normal" icon="table">
                  default-normal
                </Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Button type="text" size="normal">
                  text
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={cx('item')}>
                <Button.Group>
                  <Button onClick={this.clickButton}>默认文字2</Button>
                  <Button onClick={this.clickButton}>默认文字2</Button>
                  <Button onClick={this.clickButton}>默认文字1</Button>
                </Button.Group>
              </div>
            </Col>
          </Row>
          <Row>
            {icons.map((icon, iconIndex) => (
              <Col xs={2} key={iconIndex}>
                <div className={cx('item')}>
                  <Icon name={icon} />
                </div>
              </Col>
            ))}
          </Row>
          <Row>
            <Col xs={2}>
              <div className={cx('item')}>
                <Checkbox value="haha" checked={checboxCheck} onChange={this.checkChange}>
                  哈哈
                </Checkbox>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <div className={cx('item')}>
                <Checkbox.Group
                  data={[{ value: 'en', checked: false }, { value: 'check-2', checked: true }]}
                  onChange={this.checkGroupChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <div className={cx('item')}>
                <Tag>你好</Tag>
                <Tag>你好hsh</Tag>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <div className={cx('item')}>
                <Switch />
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Switch open={true} />
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Switch open={true} disabled={true} />
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Switch disabled={true} />
              </div>
            </Col>
          </Row>
        </Grid>
      </Layout>
    );
  }
}

export default App;
