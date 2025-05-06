import { writable, get } from "svelte/store";
import { throttle } from "lodash-es";

// Single Drawer Store
function createDrawerStore(
  initialWidth: number,
  minWidth: number,
  maxWidth: number,
  opposite: boolean = false, 
  isExpanded: boolean = true
) {
  const state = writable({
    width: initialWidth,
    lastWidth: 220,
    minWidth,
    maxWidth,
    isExpanded: isExpanded,
    isResizing: false,
  });
  let startX: number;
  let currentWidth: number;
  function startResizing(event: MouseEvent) {
    state.update((drawer) => {
      document.body.style.cursor = "ew-resize";
      drawer.isResizing = true;
      return drawer;
    });
    startX = event.clientX;
    currentWidth = get(state).width;

    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("mouseup", stopResizing);
  }
  const throttledMouseMove = throttle((e) => {
    if (!get(state).isResizing) return;

    let deltaX = e.clientX - startX;
    // console.log(" Resizing now", deltaX);
    let newWidth;
    if (opposite) {
      newWidth = currentWidth - deltaX;
    } else {
      newWidth = currentWidth + deltaX;
    }

    state.update((drawer) => {
      if (newWidth >= drawer.minWidth && newWidth <= drawer.maxWidth) {
        drawer.width = newWidth;
      }
      return drawer;
    });
  }, 32);
  function stopResizing() {
    state.update((drawer) => {
      document.body.style.cursor = "";
      drawer.isResizing = false;
      return drawer;
    });
    window.removeEventListener("mousemove", throttledMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  }

  function toggle() {
    state.update((drawer) => {
      if (drawer.isExpanded) {
        drawer.lastWidth = drawer.width;
        drawer.width = 0; // Collapse completely
      } else {
        drawer.width = drawer.lastWidth; // Restore to last width on expand
      }
      drawer.isExpanded = !drawer.isExpanded;

      return drawer;
    });
  }

  return {
    subscribe: state.subscribe,
    startResizing,
    stopResizing,
    toggle,
  };
}

// Example Usage: Create a single drawer store
export const leftDrawer = createDrawerStore(220, 150, 300);
export const rightDrawer = createDrawerStore(0, 150, 300, true, false);
