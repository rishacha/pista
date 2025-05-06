<script>
  import Editor from "./editor/Editor.svelte";
  import NavDrawer from "./leftdrawer/LeftDrawer.svelte";
  import RightDrawer from "./rightdrawer/RightDrawer.svelte";
</script>

<div class="flex flex-row h-full min-w-0">
  <NavDrawer></NavDrawer>
  <Editor></Editor>
  <RightDrawer></RightDrawer>
</div>
