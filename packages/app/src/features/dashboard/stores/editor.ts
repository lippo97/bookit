import create from 'zustand';
import { NamedSet } from 'zustand/middleware';

export type Tool = 'select' | 'add' | 'remove';

type EditorState = {
  scale: number;
  selectedTool: Tool;
  setScale(scale: number): void;
  setSelectedTool(tool: Tool): void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editorState = (set: NamedSet<EditorState>): EditorState => ({
  scale: 1.5,
  selectedTool: 'select',
  setScale: (scale) => {
    set({ scale });
  },
  setSelectedTool: (selectedTool) => {
    set({ selectedTool });
  },
});

export const useEditor = create<EditorState>(editorState);
