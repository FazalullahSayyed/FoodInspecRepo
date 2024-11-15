export class User {
  password: string;
  email: string;
  role: string;

  constructor() {
    this.password = '';  // Initialize password
    this.email = '';     // Initialize email
    this.role = 'USER';  // Default role
  }
}
