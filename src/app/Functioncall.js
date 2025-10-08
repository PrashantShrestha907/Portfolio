const handleDragEnd = (e, draggedItem, fromKey, divRefs) => {
  // console.log(fromKey)
  e.preventDefault();
  const x = e.clientX;
  const y = e.clientY;
  const elemUnderMouse = document.elementFromPoint(x, y); // kun element vitra xa tha hunxa
  console.log("Element under mouse:", elemUnderMouse); // ADD THIS
  console.log("Element class:", elemUnderMouse?.className); // ADD THIS
  console.log("Element tag:", elemUnderMouse?.tagName); 
  if (!elemUnderMouse) {
    console.log("No element found under mouse");
    return;
  }
  const availableKeys = Object.keys(divRefs.current); // current kun kun refs xa present
  console.log(availableKeys);
  let targetKey = null;

  for (const key of availableKeys) {
    const container = divRefs.current[key];
     console.log(`Checking container: ${key}`, container); // ADD THIS
    console.log(key);
    if (!container) {
      // unmount huda can make available keys null or undefined when unmount
      continue;
    }
    let currentElement = elemUnderMouse;
    
    while (currentElement) {
      console.log(`  Checking element:`, currentElement.className); // ADD THIS
      if (currentElement === container) {
        targetKey = key;
        console.log(`Item dropped inside container: ${key}`);
        break;
      }
      currentElement = currentElement.parentElement;
    }

    if (targetKey) break; // Found the target, stop searching
  }

  if (!targetKey) {
    console.log("No target container found");
    return;
  }

  if (targetKey === fromKey) {
    console.log("Dropped in same container, no action needed");
    return;
  }

  try {
    const sourceData = JSON.parse(localStorage.getItem(fromKey) || "[]");
    const targetData = JSON.parse(localStorage.getItem(targetKey) || "[]");
    const newSourceData = sourceData.filter(
      (item) => item.name !== draggedItem.name
    );
    const updatedDraggedItem = { ...draggedItem, parentName: targetKey };
    const newTargetData = [...targetData, updatedDraggedItem];
    localStorage.setItem(fromKey, JSON.stringify(newSourceData));
    localStorage.setItem(targetKey, JSON.stringify(newTargetData));
    window.location.reload();
  } catch (error) {
    console.error(error.message);
  }
};

export default handleDragEnd;
