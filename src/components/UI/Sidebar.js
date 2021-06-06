import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";

const MenuExpander = (props) => {
  return (
    <div className="sidebar-expander">
      <Button disableRipple>
        <MenuIcon fontSize="large" onClick={props.toggleLabels} />
      </Button>
    </div>
  );
};

const BackButton = (props) => {
  const history = useHistory();

  return (
    <div className="sidebar-expander">
      <Button disableRipple>
        <ArrowBackIosRoundedIcon
          fontSize="large"
          onClick={() => {
            // history.goBack();
            history.push(props.destination)
          }}
        />
      </Button>
    </div>
  );
};

const SidebarItem = ({
  depthStep = 10,
  depth = 0,
  expanded,
  item,
  hideLabel = false,
  active,
  noHistory,
  ...rest
}) => {
  const { label, items, Icon, onClick: onClickProp } = item;

  // ** collapse logic before was set to auto expand when based on active **
  // const [collapsed, setCollapsed] = useState(true);
  // const toggleCollapse = () => {
  //   setCollapsed((prevValue) => !prevValue);
  // };

  const onClick = (e) => {
    // if (Array.isArray(items)) {
    //   toggleCollapse();
    // }
    if (onClickProp) {
      onClickProp(e, item);
    }
  };

  // **Expand Icons:**
  // let expandIcon;
  // if (Array.isArray(items) && items.length) {
  //   expandIcon = !collapsed ? (
  //     <ExpandLessIcon
  //       className={
  //         "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
  //       }
  //     />
  //   ) : (
  //     <ExpandMoreIcon className="sidebar-item-expand-arrow" />
  //   );
  // }

  const history = useHistory();

  return (
    <>
      <ListItem
        className="sidebar-item"
        // onClick={onClick}
        onClick={onClick}
        button
        dense
        component={item.static ? null : Link}
        to={item.route}
        disableTouchRipple={active}
        {...rest}
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className={`sidebar-item-content ${
            active ? "sidebar-item-active" : ""
          } ${depth > 0 ? "sidebar-child-item" : ""}`}
        >
          {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
          {hideLabel ? "" : <div className="sidebar-item-text">{label}</div>}
        </div>
        {/* {expandIcon} */}
      </ListItem>
      <Collapse in={active} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  <SidebarItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                    hideLabel={hideLabel}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
};

const Sidebar = ({
  items,
  depthStep,
  depth,
  expanded,
  backButton,
  backButtonDest,
  toggleLabels,
  hideLabels,
  activePath,
}) => {
  return (
    <div className={`sidebar ${hideLabels ? "" : "sidebar-full-width"}`}>
      {/* Top button (either menu expander or back button) */}
      {backButton ? (
        <BackButton destination={backButtonDest} />
      ) : (
        <MenuExpander toggleLabels={toggleLabels} />
      )}

      {/* Menu list */}
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
              <SidebarItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={sidebarItem}
                hideLabel={hideLabels}
                active={sidebarItem.route === activePath}
                noHistory={backButton}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
