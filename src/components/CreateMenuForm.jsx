import React, { useState } from "react";
import CustomMenu from "./CustomMenu";

function CreateMenuForm() {
  const [menu, setMenu] = useState({});
  const [menuData, setMenuData] = useState([]);
  const onInputChange = (e) => {
    setMenu((prev) => ({ ...prev, menuName: e.target.value }));
  };
  const onSelectChange = (e) => {
    const parentIndex = e.target.value;
    const selectedIndex = e.nativeEvent.target.selectedIndex;
    const levelIndex =
      e.nativeEvent.target[selectedIndex].getAttribute("levelIndex");

    setMenu((prev) => ({
      ...prev,
      parentIndex: parseInt(parentIndex),
      levelIndex: parseInt(levelIndex),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let menuDataInstance = menuData;
    if (menu.parentIndex >= 0) {
      if (menuDataInstance[menu.levelIndex + 1] == undefined) {
        menuDataInstance[menu.levelIndex + 1] = [];
      }
      menuDataInstance[menu.levelIndex + 1].push({
        parentIndex: menu.parentIndex,
        levelIndex: menu.levelIndex,
        menuName: menu.menuName,
      });
    } else {
      if (menuDataInstance[0] == undefined) {
        menuDataInstance[0] = [];
      }
      menuDataInstance[0].push({ menuName: menu.menuName });
    }
    setMenuData([...menuDataInstance]);
    setMenu({});
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <div>
          <select onChange={onSelectChange} name="parentmenu">
            <option selected={true} disabled={true}>
              Choose Parent Menu
            </option>
            {menuData.map((data, levelIndex) =>
              data.map((parent, parentIndex) => (
                <option
                  key={parentIndex}
                  value={parentIndex}
                  levelindex={levelIndex}
                >
                  {parent.menuName}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <input
            placeholder="Enter Menu name"
            type="text"
            onChange={onInputChange}
            value={menu.menuName}
          />
        </div>
        <input type="submit" value="submit" />
      </form>
      <CustomMenu
        menuData={menuData}
        levelIndex={0}
        currentMenuData={menuData[0]}
      />
    </div>
  );
}

export default CreateMenuForm;
