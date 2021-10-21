import create, { GetState } from 'zustand';
import { NamedSet } from 'zustand/middleware';

export type Tool = 'select' | 'add' | 'remove';

type EditorState = {
  selectedTool: Tool;
  setSelectedTool(tool: Tool): void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editorState = (set: NamedSet<EditorState>): EditorState => ({
  selectedTool: 'select',
  setSelectedTool: (selectedTool) => {
    set({ selectedTool });
  },
});

export const useEditor = create<EditorState>(editorState);
