class Controller{
    private users: Map<string, User>;
    private tweets: Map<number, Tweet>;
    private nextTweetId: number;
    constructor(){
        this.users = new Map<string, User>();
        this.tweets = new Map<number, Tweet>();
        this.nextTweetId = 0;
    }

    public addUser(username: string){
        if(this.users.has(username))
            throw new Error("Nome de usuário já está em uso");
        this.users.set(username, new User(username));
    }

    private createTweet(sender: string, msg: string): Tweet{
        let tweet =  new Tweet(this.nextTweetId, sender, msg);
        this.nextTweetId++;
        return tweet;
    }

    public sendTweet(sender: string, msg: string){
        let user = this.getUser(sender);
        if(user == undefined)
            throw new Error("Usuário não encontrado");

        let tweet = this.createTweet(sender, msg);
        this.tweets.set(tweet.getId(), tweet);

        user.sendTweet(tweet);
    }

    public sendRt(username: string, twId: number, rtMsg: string){
        let user = this.getUser(username);
        let twt: undefined | Tweet = this.tweets.get(twId);

        if(user == undefined)
            throw new Error("Usuário não encontrado");
        if(twt == undefined)
            throw new Error("Tweet não encontrado");
        let rt = this.createTweet(username, rtMsg);
        rt.setRt(twt);

        this.tweets.set(rt.getId(), rt);
        user.sendTweet(rt);
    }

    public rmUser(username: string){
        let user = this.getUser(username);

        user.unfollowAll();
        user.rejectAll();
        user.deleteTweets();

        this.users.delete(username);
    }
    
    public getAllTweets(){
        let aux = [...this.tweets.values()].map(a => a.toString());
        return aux.join("\n");
    }

    public getUser(username: string){
        let usuario =  this.users.get(username);
        if (usuario === undefined)
            throw new Error("Usuário não encontrado");
        return usuario;
    }

    public toString():string{
        let usuarios = [...this.users.values()].map(a => a.toString());
        return "Usuários:\n-" + usuarios.join("\n\n-");
    }
}

class User{
    private seguidores: Map<string, User>;
    private seguindo: Map<string, User>;
    private inbox: Inbox;
    constructor(private username: string){
        this.inbox = new Inbox;
        this.seguidores = new Map<string, User>();
        this.seguindo = new Map<string, User>();
    }

    public follow(user: User){
        if(user === this)
            throw new Error("Não pode seguir você mesmo");
        if(this.seguindo.has(user.getName()))
            return;
        
        this.seguindo.set(user.getName(), user);
        user.seguidores.set(this.getName(), this);
    }

    public unfollow(user: User){
        if(!this.seguindo.has(user.getName()))
            throw new Error("Você não segue este usuário");

        this.seguindo.delete(user.getName());
        user.seguidores.delete(this.getName());

        this.inbox.rmMsgsFrom(user.getName());
    }

    public sendTweet(tweet: Tweet){
        this.inbox.putInMyTweets(tweet);
        this.inbox.storeInTimeLine(tweet);

        for (let [, seguidor] of this.seguidores){
            seguidor.inbox.storeInTimeLine(tweet);
        }
    }

    public deleteTweets(){
        this.inbox.storeInMyTweets();
    }

    public like(idTweet: number){
        let tweet = this.inbox.getTweet(idTweet);
        tweet.like(this.username);
    }

    public unfollowAll(){
        this.seguindo.clear();
    }

    public rejectAll(){
        this.seguidores.clear()
    }

    public getInbox(){
        return this.inbox.getTimeline();
    }

    public getName(){
        return this.username;
    }

    public toString(): string{
        let seguindo = [...this.seguindo.keys()].map(a => a.toString());
        let seguidores = [...this.seguidores.keys()].map(a => a.toString());
        return this.username+"\n seguindo: "+seguindo.join(", ")+"\n seguidores: "+seguidores.join(", ");
    }
}

class Tweet{
    private likes: Array<string>;
    private rt: Array<Tweet>;
    private deleted: boolean;
    constructor(private id: number, private username: string, private msg: string){
        this.deleted = false;
        this.likes = [];
        this.rt = [];
    }

    public like(username: string){
        if(this.username == username)
            return;
        
        this.likes.push(username);
    }

    // public rmLike(pos: number){
    //     console.log("chegou 3")
    //     if(pos == this.likes.length){
    //         this.likes = [];
    //         return;
    //     }
            
    //     this.likes.splice(0,0);
    // }

    public setRt(tweet: Tweet){
        this.rt.push(tweet);
    }

    public setDeleted(){
        this.msg = "Esse tweet foi deletado";
        this.deleted = true;
    }

    public isDeleted(){
        if(this.deleted == true){
            return true
        }else{
            return false;
        }
    }

    public getId(): number{
        return this.id;
    }
    public getSender(): string{
        return this.username;
    }
    public getMsg(): string{
        return this.msg;
    }
    public getLikes(){
        return this.likes;
    }

    public toString(): string{
        if(this.rt == null){
            if(this.isDeleted()){
                return this.id+": ("+this.msg+") ["+this.likes.join(", ")+"]";
            }
            return this.id+":"+this.username+" ("+this.msg+") ["+this.likes.join(", ")+"]";
        }else{
            let str = "";
            if(this.isDeleted()){
                str += this.id+" ("+this.msg+") ["+this.likes.join(", ")+"]";
            }else{
                str += this.id+":"+this.username+" ("+this.msg+") ["+this.likes.join(", ")+"]";
            }
            for(let a of this.rt){
                str += "\n   >"
                if(a.isDeleted()){
                    str += a.getId()+": ("+a.getMsg()+") ["+a.getLikes().join(", ")+"]";
                }else{
                    str += a.getId()+":"+a.getSender()+" ("+a.getMsg()+") ["+a.getLikes().join(", ")+"]";
                }
            }
            return str;
        }
    }
}

class Inbox{
    private timeline: Map<number, Tweet>;
    private myTweets: Map<number, Tweet>;
    constructor(){
        this.timeline = new Map<number, Tweet>();
        this.myTweets = new Map<number, Tweet>();
    }

    public storeInTimeLine(tweet: Tweet){
        this.timeline.set(tweet.getId(), tweet);
    }

    public putInMyTweets(tweet: Tweet){
        this.myTweets.set(tweet.getId(), tweet);
    }

    public rmMsgsFrom(username: string){
        let idsTm: undefined | Array<number> = [];
        for(let tw of this.timeline.values()){
            if(tw.getSender() == username){
                idsTm.push(tw.getId());
            }
        }
        if(idsTm == undefined){
            throw new Error("Tweet não encontrado");
        }
        for(let a of idsTm){
            this.timeline.delete(a);
        }
    }

    // public rmLikes(user: User){
    //     for(let tw of this.timeline.values()){
    //         for(let i = 0; i <= tw.getLikes().length; i++){
    //             let usLk = tw.getLikes();
    //             if(usLk[i] !== user.getName() || usLk[i] == undefined){

    //             }else{
    //                 tw.rmLike(i);
    //             }
    //         }
    //     }
    // }

    public storeInMyTweets(){
        for(let tw of this.myTweets.values()){
            tw.setDeleted();
        }
    }

    public getTimeline(): string{
        let str = "";
        let tm = Array.from(this.timeline.values()).reverse();
        str += tm.map(a => a.toString()).join("\n");
        return str;
    }
    public getMyTweets(){
        return Array.from(this.myTweets);
    }
    public getTweet(id: number): Tweet{
        let tweet: undefined | Tweet = this.timeline.get(id);
        if (tweet === undefined)
            throw new Error("Tweet não encontrado");
        return tweet;
        
    }

    public toString(): string{
        let str = "";
        let tm = Array.from(this.timeline.values()).reverse();
        str += tm.map(a => a.toString()).join("\n");
        return str;
    }
}

try{
let admin = new Controller();
admin.addUser("wes.lem");
admin.addUser("mariawiie");
admin.addUser("qxcoode");
admin.addUser("ufcqxd");

let weslem = admin.getUser("wes.lem");
let fernanda = admin.getUser("mariawiie");
let qx = admin.getUser("qxcoode");

weslem.follow(fernanda);
weslem.follow(qx);
fernanda.follow(weslem);
qx.follow(weslem);

console.log(admin.toString());

admin.sendTweet("wes.lem", "Ola mundo");
admin.sendTweet("wes.lem", "Fernanda me liga");
admin.sendTweet("mariawiie", "Mais tarde weslem")
admin.sendTweet("qxcoode", "Enviem os trabalhos finais");

weslem.like(3);
weslem.like(2);

weslem.unfollow(qx);

admin.sendRt(weslem.getName(), 3, "Já mandei professor");

admin.rmUser(qx.getName());

console.log(weslem.getInbox());
console.log(admin.toString());

} catch (e) {
    console.log((<Error>e).message);
}