import React, { useState } from "react";

function Menu() {
  const [category, setCategory] = useState({});
  const [menuData, setMenuData] = useState([]);
  const onInputChange = (e) => {
    setCategory((prev) => ({ ...prev, categoryName: e.target.value }));
  };
  const onSelectChange = (e) => {
    const parentIndex = e.target.value;
    const selectedIndex = e.nativeEvent.target.selectedIndex;
    const levelIndex =
      e.nativeEvent.target[selectedIndex].getAttribute("levelIndex");

    setCategory((prev) => ({
      ...prev,
      parentIndex: parseInt(parentIndex),
      levelIndex: parseInt(levelIndex),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let menuDataInstance = menuData;
    if (category.parentIndex >= 0) {
      console.log(`parentIndex`);
      if (menuDataInstance[category.levelIndex + 1] == undefined) {
        menuDataInstance[category.levelIndex + 1] = [];
      }
      menuDataInstance[category.levelIndex + 1].push({
        parentIndex: category.parentIndex,
        levelIndex: category.levelIndex,
        categoryName: category.categoryName,
      });
    } else {
      if (menuDataInstance[0] == undefined) {
        menuDataInstance[0] = [];
      }
      menuDataInstance[0].push({ categoryName: category.categoryName });
    }
    setMenuData([...menuDataInstance]);
    setCategory({});
  };
  console.log(`menuData`, menuData);
  console.log(`category`, category);
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <div>
          <select onChange={onSelectChange} name="parentCategory">
            <option selected={true} disabled={true}>
              Choose Tagging
            </option>
            {menuData.map((data, levelIndex) =>
              data.map((parent, parentIndex) => (
                <option
                  key={parentIndex}
                  value={parentIndex}
                  levelindex={levelIndex}
                >
                  {parent.categoryName}
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
            value={category.categoryName}
          />
        </div>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Menu;
