import * as React from 'react';

import { JSONViewer } from './JSONViewer';

export interface ObjectProps {
  data: any;
  name: string;
  collapsed: boolean;
}

export interface ObjectState {
  error: boolean | string;
  collapsed: boolean;
  size: number;
}

export class ObjectType extends React.Component<ObjectProps, ObjectState> {
  public constructor(props: ObjectProps) {
    super(props);

    this.state = {
      error: false,
      collapsed: props.collapsed,
      size: 0,
    };

    this.validateInput();
  }

  public validateInput = () => {
    const { data } = this.props;
    if (!(data as any instanceof Object)) {
      this.setState({ error: 'ERROR' });
    }
  }

  public generateObject = (data: any) => {
    return (
      <div className="pushed-content object-container">
        <div className="object-content">
          <JSONViewer data={data} curDepth={1} />
        </div>
      </div>
    );
  }

  public getEllipsis = () => {
    const { size } = this.state;

    if (size === 0) {
      return null;
    } else {
      return (
        <div className="render-json_node-ellipsis" onClick={this.toggleCollapsed}>...</div>
      );
    }
  }

  public toggleCollapsed = () => this.setState({ collapsed: !this.state.collapsed });

  public render() {
    const { name, data } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="render-json--flex render-json_object">
        <div className="render-json_label">{name}: </div>
        <div className="render-json_data">
          {
            collapsed ?
              <div className="clickable" onClick={this.toggleCollapsed}>
                <span>{`{ ... }`}</span>
                <span className="render-json_array_count">{Object.keys(data).length}</span>
                <span className="render-json_array_count">items</span>
              </div> :
              <div className="render-json_array-content">
                <div className="clickable" onClick={this.toggleCollapsed}>
                  <span>{`{`}</span>
                  <span className="render-json_array_count">{Object.keys(data).length}</span>
                  <span className="render-json_array_count">items</span>
                </div>
                {this.generateObject(data)}
                <div>{`}`}</div>
              </div>
          }
        </div>
      </div>
    );
  }
}
