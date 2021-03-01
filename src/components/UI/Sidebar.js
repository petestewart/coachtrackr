import React, { useState } from "react";
import { Link } from "react-router-dom";

import Settings from "../Settings"

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";

const MenuExpander = () => {
  return (
    <div className="sidebar-expander">
      <Button disableRipple >
        <MenuIcon
          fontSize="large"
          onClick={() => {
            console.log("clicked");
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
  ...rest
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const { label, items, Icon, onClick: onClickProp } = item;

  const toggleCollapse = () => {
    setCollapsed((prevValue) => !prevValue);
  };

  const onClick = (e) => {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
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

  return (
    <>

      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button
        dense
        component={Link} to={item.route}
        {...rest}
        >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className="sidebar-item-content"
          >
          {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
          <div className="sidebar-item-text">{label}</div>
        </div>
        {/* {expandIcon} */}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
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

const Sidebar = ({ items, depthStep, depth, expanded }) => (
  <div className="sidebar">
    <MenuExpander />
    {/* <Divider style={{ margin: "6px 0" }} /> */}
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
            />
          )}
        </React.Fragment>
      ))}
    </List>
  </div>
);

export default Sidebar;
