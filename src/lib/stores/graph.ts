import { writable } from "svelte/store";

export interface Graph {
    path:string;
    name: string;
}

// Initialize the store with a default Graph object
export const graphPath = writable<Graph>({ path: '', name: '' });

// Asynchronously fetch the graph details and update the store
export async function fetchGraphDetails() {
  try {
    const graphDetails = await window.api.invoke("get-graph-details") as Graph;
    graphPath.set(graphDetails);
  } catch (error) {
    console.error("Failed to fetch graph details:", error);
  }
}

// Call the function to fetch and update the graph details
fetchGraphDetails();