import React from "react";
import './furniture-customization.css';
import { ApplicationProvider } from "../../state/application-context";
import { ToolsPanel } from "../tools-panel";
import { Viewer } from "../viewer";

export const FurnitureCustomization: React.FC = () => {

  return (
    <ApplicationProvider>
      <div className='furniture-customization'>
        <Viewer />
        <ToolsPanel />
      </div>
    </ApplicationProvider>
  );
};