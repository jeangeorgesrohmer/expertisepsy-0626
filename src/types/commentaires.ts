export interface CommentEntry {
  has: boolean;
  text: string;
}

export type CommentsData = Record<string, CommentEntry>;

export const DEFAULT_COMMENT: CommentEntry = { has: false, text: '' };
