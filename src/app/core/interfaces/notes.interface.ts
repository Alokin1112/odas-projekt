export interface Note {
  id: number;
  title: string;
  text: string;
  isEncrypted: boolean;
  isPublic: boolean;
  username: string;
}

export interface NoteGetterDto {
  id: number;
  password?: string;
}

export interface NoteDto {
  title: string,
  text: string,
  isEncrypted: boolean,
  isPublic: boolean,
  password: string,
  allowedUsers: string[],
}