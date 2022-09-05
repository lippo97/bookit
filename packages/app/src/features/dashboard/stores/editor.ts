import create from 'zustand';
import { NamedSet } from 'zustand/middleware';

export type Tool = 'select' | 'add' | 'remove';

type Size = { x: number; y: number };
type EditorState = {
  scale: number;
  selectedTool: Tool;
  roomName: string;
  size: Size;
  isSizeModalOpen: boolean;
  setScale(scale: number): void;
  setSelectedTool(tool: Tool): void;
  setRoomName(roomName: string): void;
  setSize(size: Size): Promise<void>;
  setSizeModalOpen(isSizeModalOpen: boolean): void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editorState = (set: NamedSet<EditorState>): EditorState => ({
  scale: 1,
  selectedTool: 'select',
  roomName: '',
  size: { x: 0, y: 0 },
  isSizeModalOpen: false,
  setScale: (scale) => {
    set({ scale });
  },
  setSelectedTool: (selectedTool) => {
    set({ selectedTool });
  },
  async setSize(size) {
    set({ size });
  },
  setRoomName(roomName) {
    set({ roomName });
  },
  setSizeModalOpen(isSizeModalOpen: boolean) {
    set({ isSizeModalOpen });
  },
});

export const useEditor = create<EditorState>(editorState);
