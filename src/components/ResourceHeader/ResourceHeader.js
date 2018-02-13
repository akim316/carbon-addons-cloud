import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'carbon-components-react';

export class ResourceHeader extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.array,
  };

  renderActionButtons(type) {
    const { renderStop, renderReboot, renderMaintenance } = this.props;
    const reboot = (
      <svg
        className="bx--resource-header__button--icon"
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fillRule="evenodd">
        <path d="M12.2 4.6L12 4V0H8v4l-.2.6C3.4 5.6.2 9.5.2 14.2.2 19.7 4.6 24 10 24s9.8-4.4 9.8-9.8c0-4.7-3.3-8.6-7.6-9.6zM10 21.8c-4.3 0-7.6-3.4-7.6-7.6 0-3.5 2.2-6.3 5.5-7.3L8 7v7h4V7l.2-.1c3.3 1 5.5 3.8 5.5 7.3-.1 4.2-3.4 7.6-7.7 7.6z" />
      </svg>
    );

    const maintenance = (
      <svg className="bx--resource-header__button--icon" width="16" height="16">
        <path d="M0 0h16v2H0z" />
        <path d="M10.5 7.5c-.3.3-.7.3-1 0-.3-.3-.3-.7 0-1l1.3-1.3c-.4-.1-.7-.2-1.1-.2-1.2 0-2.2 1-2.2 2.3 0 .2 0 .4.1.6l-3.3 3.3c-.4.4-.4 1.1 0 1.5.4.4 1.1.4 1.5 0l3.3-3.3c.2.1.4.1.6.1 1.2 0 2.3-1 2.3-2.3 0-.4-.1-.7-.2-1l-1.3 1.3z" />
        <path d="M14 4v10H2V4h12m2-2H0v14h16V2z" />
      </svg>
    );

    let svg;
    if (type === 'Stop') {
      svg = stop;
      return (
        <Button
          className="bx--resource-header__button"
          onClick={renderStop}
          small
          icon="stop--glyph"
          kind="ghost">
          {type}
        </Button>
      );
    } else if (type === 'Reboot') {
      svg = reboot;
      return (
        <Button
          className="bx--resource-header__button"
          onClick={renderReboot}
          icon="power--glyph"
          small
          kind="ghost">
          {type}
        </Button>
      );
    } else if (type === 'Maintenance') {
      svg = maintenance;
      return (
        <Button
          className="bx--resource-header__button"
          onClick={renderMaintenance}
          small
          kind="ghost">
          {type}
          {svg}
        </Button>
      );
    }
  }

  renderTitleStatus() {
    return (
      <div className="bx--resource-header__status-item bx--resource-header__status-item--active">
        Active
      </div>
    );
  }

  renderStatus(isTitleStatus) {
    const { className, status } = this.props;

    return status.map((item, i) => {
      const statusClasses = classNames(
        {
          'bx--resource-header__status-item--active': item.isTrue,
        },
        'bx--resource-header__status-item',
        className
      );

      return (
        <div key={i} className={statusClasses}>
          {item.text}
        </div>
      );
    });
  }

  render() {
    const {
      className,
      icon,
      isActive,
      renderActions,
      renderBreadcrumbs,
      renderMaintenance,
      renderReboot,
      renderStop,
      status,
      subtitle,
      title,
    } = this.props;

    const resourceHeaderClasses = classNames('bx--resource-header', className);

    return (
      <header className={resourceHeaderClasses}>
        <section className="bx--resource-header__container">
          <div className="bx--resource-header__container--left">
            {renderBreadcrumbs && renderBreadcrumbs()}
            <div className="bx--resource-header__content-container">
              {icon && <div className="bx--resource-header__icon">{icon}</div>}
              <div className="bx--resource-header__content">
                {title && (
                  <div className="bx--resource-header__title">
                    <h3>{title}</h3>
                    {isActive && (
                      <div className="bx--resource-header__status-item bx--resource-header__status-item--active">
                        Active
                      </div>
                    )}
                  </div>
                )}
                <div className="bx--resource-header__subtitle">
                  {subtitle &&
                    subtitle.map((item, key) => (
                      <span key={key}>{item} &nbsp;</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bx--resource-header__container--right">
            <div className="bx--resource-header__status">
              {status && this.renderStatus()}
            </div>
            <div className="bx--resource-header__actions">
              {renderStop && this.renderActionButtons('Stop')}
              {renderReboot && this.renderActionButtons('Reboot')}
              {renderMaintenance && this.renderActionButtons('Maintenance')}
              {renderActions && renderActions()}
            </div>
          </div>
        </section>
      </header>
    );
  }
}
