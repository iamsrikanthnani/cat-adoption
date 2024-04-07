// REGISTER
export type TYPE_REGISTER = {
  name: string;
  email: string;
  password: string;
};

// LOGIN
export type TYPE_LOGIN = {
  email: string;
  password: string;
};

// USER
export type TYPE_USER = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};
