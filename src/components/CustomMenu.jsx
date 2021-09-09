import React from "react";
import "../css/menu.css";
function CustomMenu({ menuData, levelIndex, currentMenuData }) {
  return (
    <>
      <ul className={levelIndex == 0 && "nav"}>
        {currentMenuData?.map((item, index) => {
          const subMenu = menuData[levelIndex + 1]?.filter(
            (childItem) => childItem.parentIndex == index
          );
          return (
            <>
              <li>
                <a>{item.menuName}</a>

                <CustomMenu
                  menuData={menuData}
                  levelIndex={levelIndex + 1}
                  currentMenuData={subMenu}
                />
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default CustomMenu;
