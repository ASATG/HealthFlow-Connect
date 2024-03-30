import React from "react";

export const Personal_Info_Component = (props) => {
  const properties_to_exclude = ["_id", "__v", ...props["explicit_keys_to_exclude"]];
  const obj = props["record"];
  
  const listItems = [];

  for (const key in obj) {
    if (!properties_to_exclude.includes(key)) {
      listItems.push(<li key={key}><strong>{key}:</strong> {obj[key]}</li>);
    }
  }

  return (
    <ul>
      {listItems}
    </ul>
  );
};
