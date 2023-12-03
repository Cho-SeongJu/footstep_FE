export interface ISignupFormData {
  gender: string;
  loginEmail: string;
  nickname: string;
  password: string;
}

export interface IFormData {
  loginEmailId: string;
  loginEmailDomain: string;
  password: string;
  checkPassword: string;
  nickname: string;
  gender: string;
}

export interface ICheckEmail {
  checkEmailMsg: string;
  check: boolean;
}

export interface ICheckNickname {
  checkNicknameMsg: string;
  check: boolean;
}

export interface IGenderType {
  gender: string;
  initial: boolean;
}
