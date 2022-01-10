const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);


interface IMsg {
    getSender(): string;
    getContent(): string;
}

class Msg implements IMsg {
    private sender: string;
    protected content: string;

    constructor(sender: string, content: string) {
        this.sender = sender;
        this.content = content;
    }

    public getSender(): string {
        return this.sender;
    }

    public getContent(): string {
        return this.content;
    }
    public toString(): string {
        return this.getSender() + ":" + this.getContent();
    }
}

class MsgAutodestrutiva extends Msg {
    constructor(sender: string, content: string) {
        super(sender, content);
    }
    public getContent(): string {
        console.log("lendo e apagando")
        let content = super.getContent();
        super.content = "";
        return content;
    }
}

class User {
    private username: string;
    private inbox: IMsg[];
    private sent: IMsg[];
    private read: IMsg[];

    constructor(username: string) {
        this.username = username;
        this.inbox = [];
        this.sent = [];
        this.read = [];
    }

    sendMsg(receiver: User, content: string): void {
        let msg = new Msg(this.username, content);
        this.sent.push(msg);
        receiver.inbox.push(msg);
    }

    sendSelfDestructiveMsg(receiver: User, content: string): void {
        console.log("mensagem destrutiva user")
        let msg = new MsgAutodestrutiva(this.username, content);
        this.sent.push(msg);
        receiver.inbox.push(msg);
    }

    getInbox(): string {
        let output = this.inbox.map(msg => msg.toString()).join("\n");
        for (let msg of this.inbox)
            this.read.push(msg);
        this.inbox = [];
        return output;
    }

    getSent(): string {
        return this.sent.map(msg => msg.toString()).join("\n");
    }

    getRead(): string {
        return this.read.map(msg => msg.toString()).join("\n");
    }
}


class UserManager {
    private users: Map<string, User>;

    public constructor() {
        this.users = new Map<string, User>();
    }

    public getUsernames(): string {
        return Array.from(this.users.keys()).join(" ");
    }

    public cadastrar(user: string) {
        if (this.users.has(user))
            throw new Error("Usuario ja cadastrado");
        this.users.set(user, new User(user));
    }
    
    public obter(user: string): User {
        let answer : undefined | User = this.users.get(user);
        if (answer == undefined)
            throw new Error("Usuario nao encontrado");
        return answer;
    }

    public enviarMsg(sender: string, receiver: string, msg: string) {
        let senderUser = this.obter(sender);
        let receiverUser = this.obter(receiver);
        senderUser.sendMsg(receiverUser, msg);
    }

    public enviarDestructiveMsg(sender: string, receiver: string, msg: string) {
        console.log("mensagem destructiva")
        let senderUser = this.obter(sender);
        let receiverUser = this.obter(receiver);
        senderUser.sendSelfDestructiveMsg(receiverUser, msg);
    }
}

function main() {
    let manager = new UserManager();
    while (true) {
        let ui = input().split(" ");
        let cmd = ui[0];
        try {
            if (cmd == "end") {
                break;
            } else if (cmd == "add") { //add david
                manager.cadastrar(ui[1]);
            } else if (cmd == "show") {
                console.log(manager.getUsernames());
            } else if (cmd == "send") {//send david jose oi meu amigo
                                    //['send', 'david', 'jose', 'oi', 'meu', 'amigo'];
                let sender = ui[1];
                let receiver = ui[2];
                let msg = ui.slice(3).join(" ");
                manager.enviarMsg(sender, receiver, msg);
            } else if (cmd == "erase") {//send david jose oi meu amigo
                //['send', 'david', 'jose', 'oi', 'meu', 'amigo'];
                let sender = ui[1];
                let receiver = ui[2];
                let msg = ui.slice(3).join(" ");
                manager.enviarDestructiveMsg(sender, receiver, msg);
            } else if (cmd == "inbox") {
                console.log(manager.obter(ui[1]).getInbox());
            } else if (cmd == "sent") {
                console.log(manager.obter(ui[1]).getSent());
            } else if (cmd == "read") {
                console.log(manager.obter(ui[1]).getRead());
            } else {
                console.log("Comando inválido");
            }
        } catch (e) {
            console.log((<Error>e).message);
        }
    }
}

main();