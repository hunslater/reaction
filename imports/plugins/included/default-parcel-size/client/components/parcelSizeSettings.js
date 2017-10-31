import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { Components } from "@reactioncommerce/reaction-components";

class ParcelDimensionSettings extends Component {
  static propTypes = {
    saveDefaultSize: PropTypes.func,
    size: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      isSaving: false
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStateChange(event) {
    const { size } = this.state;
    const value = event.target.value;
    size[event.target.name] = parseInt(value, 10);
    this.setState({ size });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { size } = this.state;
    size._id = Reaction.getShopId();
    this.setState({ isSaving: true });
    this.props.saveDefaultSize(size, () => {
      this.setState({ isSaving: false });
    });
  }

  render() {
    const { isSaving, size } = this.state;
    return (
      <Components.CardGroup>
        <Components.Card>
          <Components.CardBody expandable={true}>
            <form onSubmit={this.handleSubmit}>
              <Components.TextField
                label="Weight"
                type="number"
                i18nKeyLabel="admin.parcelDimensionSettings.weight"
                name="weight"
                value={size.weight}
                onChange={this.handleStateChange}
              />
              <Components.TextField
                label="Height"
                type="number"
                i18nKeyLabel="admin.parcelDimensionSettings.height"
                name="height"
                value={size.height}
                onChange={this.handleStateChange}
              />
              <Components.TextField
                label="Width"
                type="number"
                i18nKeyLabel="admin.parcelDimensionSettings.width"
                name="width"
                value={size.width}
                onChange={this.handleStateChange}
              />
              <Components.TextField
                label="Length"
                type="number"
                i18nKeyLabel="admin.parcelDimensionSettings.length"
                name="length"
                value={size.length}
                onChange={this.handleStateChange}
              />
              <Components.Button
                bezelStyle="solid"
                status="primary"
                className="pull-right"
                type="submit" disabled={isSaving}
              >
                {isSaving ?
                  <i className="fa fa-refresh fa-spin"/>
                  : <span data-i18n="app.save">Save</span>}
              </Components.Button>
            </form>
          </Components.CardBody>
        </Components.Card>
      </Components.CardGroup>
    );
  }
}

export default ParcelDimensionSettings;
