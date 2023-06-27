let initialState = {
    contactPage: {
        socialMedia: [
            {socialMediaSrc: "https://f.hubspotusercontent30.net/hubfs/2235233/blog-import/2020/20-08-Aug/sm-icons-facebook-logo.png", hrefSocialMedia: "#"},
            {socialMediaSrc: "https://mllj2j8xvfl0.i.optimole.com/KWneUgA.kTyM~36eab/w:auto/h:auto/q:auto/https://s15158.pcdn.co/wp-content/uploads/2021/02/2021-Twitter-logo-blue.png", hrefSocialMedia: "#"},
            {socialMediaSrc: "https://cdn.imgbin.com/2/25/19/imgbin-social-media-photography-computer-icons-instagram-full-metal-TQ8uVqxk9t715Du2Ni3QmHjYw.jpg", hrefSocialMedia: "#"},
        ] as Array<SocialMediaType>,
    } as ContactPageType
}
type SocialMediaType = {
    socialMediaSrc: string
    hrefSocialMedia: string
}
type ContactPageType = {
    socialMedia: Array<SocialMediaType>
}
type InitialStateType = typeof initialState

const contactReducer = (state = initialState):InitialStateType => {
    return state
}

export default contactReducer;