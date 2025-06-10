import Service from '@ember/service';
import config from 'assessment-3/config/environment'
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @tracked currentUserId = "";
  @tracked currentUser = null;
  @tracked isAuthenticated = false;
  @tracked users = [];
  @tracked url = "https://" + config.APP.usersApiKey + ".mockapi.io";
  // @tracked url = "https://" + "68340cde464b49963601160e" + ".mockapi.io";
  

  constructor() {
    super(...arguments);
    console.log("usersApiKey : ", config.APP.userApiKey );
    this.initializeUsers();
  }

  async initializeUsers(){
    await this.getCredentials();
    this.currentUserId = sessionStorage.getItem('UserID');
    this.currentUser = this.find(this.currentUserId);
    let status = sessionStorage.getItem('Status');
    this.isAuthenticated = (status == "Logined" );
  }

  async getCurrentUsers(){
    // if (!this.currentUser){
    //   await this.initializeUsers();
    // }
    await this.initializeUsers();
    return this.currentUser;
  }

  async getCredentials() {
    try {
      let getUsersUrl = `${this.url}/users`;
      const response = await fetch(getUsersUrl);
      const data = await response.json();
      this.users = data;
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async addUsers(user){
    try {
      let setUserUrl = `${this.url}/users`
      const response = await fetch(setUserUrl, {
        method: "POST", 
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log("data -> ", data);
      this.getCredentials();
      return data;
    }catch (error){
      console.error("Error Adding user:", error);
    }
  }

  async updateUsers(id, user){
    try {
      let setUserUrl = `${this.url}/users/${id}`
      const response = await fetch(setUserUrl, {
        method: "PUT", 
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log("data -> ", data);
      this.getCredentials();
    }catch (error){
      console.error("Error Adding user:", error);
    }
  }

  async deleteUser(id){
    try {
      let setUserUrl = `${this.url}/users/${id}`
      const response = await fetch(setUserUrl, {
        method: "DELETE", 
        headers: {
        "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log("data -> ", data);
      this.getCredentials();
    }catch (error){
      console.error("Error Adding user:", error);
    }
  }



  // setCredentials(email, password, role) {
  //   let credentials = this.getCredentials();
    
  //   if (!credentials.some(cred => cred.email === email && cred.password === password)) {
  //     let id = this.getNextUserId();
  //     credentials.push({ id, email, password, role});
  //     localStorage.setItem('Credentials', JSON.stringify(credentials));
  //   }
  // }

  // updateCredentials( id, email, password, role){
  //     let credentials = this.getCredentials();

  //     let givenUser = {
  //       id: id,
  //       email: email, 
  //       password: password,
  //       role: role
  //     }

  //     credentials.map(user => user.id ==  givenUser.id ? givenUser : user);

  //     localStorage.setItem('Credentials', JSON.stringify(credentials));
  // }

  login(email, password) {
    const credentials = this.users;
    const isValid = credentials.some(cred => cred.email === email && cred.password === password);

    if (isValid) {
      let currentCrendential = credentials.filter(cred => cred.email === email && cred.password === password);

      this.currentUserId = currentCrendential[0].id;
      this.isAuthenticated = true;
      sessionStorage.setItem('Status', 'Logined');
      sessionStorage.setItem('UserID', this.currentUserId);
      return true;
    }
    return false;
  }

  async signup(username, companyname, email, password, role) {
    
      const userData = await this.addUsers({
        role: role,
        name: username,
        email: email,
        password: password,
        "purchase-data": {},
        "seller-data": {
          "company-name": companyname,
          "selling-approved": false
        }
      })

      this.currentUserId = userData.id;
      this.isAuthenticated = true;

    
    sessionStorage.setItem('Status', 'Logined');
    sessionStorage.setItem('UserID', userData.id);
  }

  isUserExist(username){
    if (this.users.some(cred => cred.name === username)) {
      return true;
    }
    return false
  }

  isEmailExist(email){
    if (this.users.some(cred => cred.email === email)) {
      return true;
    }
    return false
  }

  logout() {
    this.currentUserId = null;
    this.isAuthenticated = false;
    sessionStorage.removeItem('Status');
    sessionStorage.removeItem('UserID');
  }

  // save() {
  //   localStorage.setItem('Credentials', JSON.stringify(this.users));
  // }

  // delete(id) {
  //   this.users = this.users.filter(users => users.id !== id);
  //   this.save();
  // }

  find(id){
    console.log("users : ", this.users);
    console.log("find user : ", this.users.find(user => user.id == id));
    return this.users.find(user => user.id == id);
  }

}