class User {
  admin: boolean
  constructor(public id: string, public name: string, public email: string, public loggedIn: boolean) {
    this.admin = false
  }
}

export default User