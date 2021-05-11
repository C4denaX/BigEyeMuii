export class User {
    constructor(id="", name="", password="", email="") {
        this.id=id;
        this.name=name;
        this.password=password;
        this.email=email;
    }

    id: string;
    name: string;
    email: string;
    password: string;
}
