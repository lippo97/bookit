import create from 'zustand';
import { NamedSet } from 'zustand/middleware';

export type Tool = 'select' | 'add' | 'remove';

type EditorState = {
  scale: number;
  selectedTool: Tool;
  roomName: string;
  isSizeModalOpen: boolean;
  setScale(scale: number): void;
  setSelectedTool(tool: Tool): void;
  setRoomName(roomName: string): void;
  setSizeModalOpen(isSizeModalOpen: boolean): void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editorState = (set: NamedSet<EditorState>): EditorState => ({
  scale: 1,
  selectedTool: 'select',
  roomName: '',
  isSizeModalOpen: false,
  setScale: (scale) => {
    set({ scale });
  },
  setSelectedTool: (selectedTool) => {
    set({ selectedTool });
  },
  setRoomName(roomName) {
    set({ roomName });
  },
  setSizeModalOpen(isSizeModalOpen: boolean) {
    set({ isSizeModalOpen });
  },
});

export const useEditor = create<EditorState>(editorState);
