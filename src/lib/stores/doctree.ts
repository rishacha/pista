import { get, writable } from "svelte/store";
import { graphPath, fetchGraphDetails } from "./graph";

export interface FileNode {
  name: string;
  type: "file" | "folder";
  isOpen: boolean;
  children?: FileNode[];
}

export const treeData = writable<FileNode[]>([]);

export async function loadMarkdownStructure() {
  try {
    if (get(graphPath).path.length == 0) {
      await fetchGraphDetails();
    }
    treeData.set(
      (await window.api.invoke(
        "load-doc-tree",
        get(graphPath).path
      )) as FileNode[]
    );
  } catch (error) {
    console.error("Error loading document tree", error);
  }
}
export const toggleNodeOpen = (targetName: string) => {
  console.log("In tree data toggle")
  treeData.update((nodes) => {
    const toggleNode = (node: FileNode) => {
      if (node.name === targetName && node.type === "folder") {
        node.isOpen = !node.isOpen;
      }
      if (node.children) {
        node.children.forEach(toggleNode);
      }
    };

    nodes.forEach(toggleNode);
    return nodes;
  });
};
