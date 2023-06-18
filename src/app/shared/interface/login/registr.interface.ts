export interface IRegister {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmedPassword?: string;
}


export interface IRegisterWithExtra extends IRegister {
  address: string;
  order: []
}
