import create, { GetState } from 'zustand';
import { NamedSet } from 'zustand/middleware';
import { Vector2 } from '@asw-project/shared/util/vector'

type EditorState = {
    size: Vector2,
    tool: 'example' | 'field' | 'todo' | 'yet',
    setSize(updated: Vector2): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editorState = (set: NamedSet<EditorState>, get: GetState<EditorState>):  EditorState => ({
    size: [10, 5],
    tool: 'field',
    setSize: (updated) => ({
        size: updated
    })
})

export const useEditor = create<EditorState>(editorState)
