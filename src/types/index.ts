export interface RobloxUser {
  id: number;
  name: string;
  displayName: string;
  avatarUrl?: string;
}

export interface Friend {
  id: number;
  name: string;
  displayName: string;
  avatarUrl?: string;
}

export interface Settings {
  username: string;
  robuxBalance: number;
  friends: Friend[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}
