import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_PADDINGS_CLASS_NAME } from "../constants";
import tr from "../Utils/translationHelper";
import AppHeader from "../UI/AppHeader";
import "./AdminLayout.css";

const AdminLayout = props => {
  const { children } = props;
  return (
    <div className="App-admin">
      <AppHeader appName={tr("AdminHeader", "Admin")} />
      <div className={`App-admin-main ${DEFAULT_PADDINGS_CLASS_NAME}`}>
        {children}
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminLayout;
