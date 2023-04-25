import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Post 1", likescount: 44},
                { id: 2, message: "Post 2", likescount: 24},
                { id: 3, message: "Post 3", likescount: 56},
                { id: 4, message: "Post 4", likescount: 1},
            ],
            newPostBody: ""
        },
        dialogsPage: {
            dialogs: [
                { name: "User1", id: 1},
                { name: "User2", id: 2},
                { name: "User3", id: 3},
                { name: "User4", id: 4},
                { name: "User5", id: 5},
                { name: "User6", id: 6},
            ],
            newDialogsBody: "",
            messages: [
                { message: "Hello", id: 1},
                { message: "Hi", id: 2},
                { message: "By", id: 3},
                { message: "Blabla", id: 4},
                { message: "Thanks", id: 5},
                { message: "Beka", id: 6}
            ],
            newMessagesBody: "",
        },
        contactPage: {
            socialMedia: [
                {socialMediaSrc: "https://f.hubspotusercontent30.net/hubfs/2235233/blog-import/2020/20-08-Aug/sm-icons-facebook-logo.png", hrefSocialMedia: "#"},
                {socialMediaSrc: "https://mllj2j8xvfl0.i.optimole.com/KWneUgA.kTyM~36eab/w:auto/h:auto/q:auto/https://s15158.pcdn.co/wp-content/uploads/2021/02/2021-Twitter-logo-blue.png", hrefSocialMedia: "#"},
                {socialMediaSrc: "https://cdn.imgbin.com/2/25/19/imgbin-social-media-photography-computer-icons-instagram-full-metal-TQ8uVqxk9t715Du2Ni3QmHjYw.jpg", hrefSocialMedia: "#"},
            ]
        }

    },
    _rerenderEntireTree(){
    },

    getState() {
        return this._state
    },
    subscribe(observer){
        this._rerenderEntireTree = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

        this._rerenderEntireTree(this._state)
    }
}



export default store;