export type RoleType = '' | '*' | 'superAdmin' | 'admin' | 'user';
export interface UserState {
  avatarName?: string;
  avatarPath?: string;
  createTime?: string;
  dept?: object;
  deptId?: number;
  email?: string;
  enabled?: boolean;
  gender?: string;
  id?: number;
  isAdmin?: boolean;
  jobs?: [];
  nickName?: string;
  password?: string;
  phone?: string;
  pwdResetTime?: string;
  updateBy?: string;
  updateTime?: string;
  username?: string;
  role: RoleType;
}
