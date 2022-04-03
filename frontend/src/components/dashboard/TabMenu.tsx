import React, { ReactElement } from "react";
import { DashboardTab } from "../../interfaces";

interface TabMenuProps {
  openTab: DashboardTab;
  children: ReactElement[];
  onChange: (value: string) => void;
}

export default function TabMenu({ openTab, children, onChange }: TabMenuProps) {
  return (
    <div className="flex flex-col gap-y-1">
      {React.Children.map(children, (child: ReactElement) =>
        React.cloneElement(child, {
          selected: openTab === child.props.id,
          onChange,
        })
      )}
    </div>
  );
}
