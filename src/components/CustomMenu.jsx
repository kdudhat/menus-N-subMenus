import React from "react";

function CustomMenu({ menuData, levelIndex, currentMenuData }) {
  return (
    <>
      <ul>
        {currentMenuData?.map((item, index) => {
          const subMenu = menuData[levelIndex + 1]?.filter(
            (childItem) => childItem.parentIndex == index
          );
          return (
            <>
              <li>{item.menuName}</li>
              <CustomMenu
                menuData={menuData}
                levelIndex={levelIndex + 1}
                currentMenuData={subMenu}
              />
            </>
          );
        })}
      </ul>
    </>
  );
}

export default CustomMenu;
