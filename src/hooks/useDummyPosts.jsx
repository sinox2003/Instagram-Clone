

// const imageUrls = [
//     'https://th.bing.com/th/id/OIP.jPINN5ICJ3Z2qM9K1D4VHgHaFQ?rs=1&pid=ImgDetMain',
//     'https://wallpaperaccess.com/full/4723250.jpg',
//     'https://wallpaperaccess.com/full/2439702.png',
//     'https://buffer.com/library/content/images/2023/10/free-images.jpg',
//     'https://buffer.com/library/content/images/2023/10/free-images.jpg',
//     'https://buffer.com/library/content/images/2023/10/free-images.jpg',
//     'https://th.bing.com/th/id/OIP.pv7Cd1crIU7DYmTjAEZaoQHaEo?rs=1&pid=ImgDetMain',
//     'https://th.bing.com/th/id/OIP.7mJUo8vxqSw1cTZZf-CM_wHaFj?rs=1&pid=ImgDetMain',
//     'https://images5.alphacoders.com/104/thumb-1920-1046568.jpg',
//     'https://cdn.pixabay.com/photo/2022/11/17/08/47/brown-bear-7597616_1280.jpg',
//     'https://cdn.pixabay.com/photo/2020/11/20/16/26/labrador-5762115_960_720.jpg',
//     'https://cdn.pixabay.com/photo/2021/03/08/12/31/oxford-shoes-6078993_960_720.jpg',
//     'https://cdn.pixabay.com/photo/2024/05/12/09/28/brown-bear-8756478_1280.png',
//     'https://cdn.pixabay.com/photo/2024/04/16/16/25/ai-generated-8700383_960_720.jpg',
//     'https://cdn.pixabay.com/photo/2022/11/04/13/43/car-7569896_960_720.jpg',
//     'https://cdn.pixabay.com/photo/2024/05/06/00/39/one-person-8742116_960_720.jpg',
//     'https://cdn.pixabay.com/photo/2023/05/19/17/18/rose-beetle-8004990_1280.jpg',
//     'https://t3.ftcdn.net/jpg/07/49/30/54/360_F_749305457_SipDhXs5ijYs4l537m4gU6hYwD051Axp.jpg',
//    ' https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
//     'https://imgupscaler.com/images/samples/Imgupscaler_2_2x.webp'
// ];
//
//
// const profilePicURLs=[
//     'https://lh3.googleusercontent.com/-75PEaiU9U3s/VOIS2XRjj1I/AAAAAAAAA8g/hrSIcbRe89s/s2048/cool-and-stylish-profile-pictures-for-facebook-for-girls-2015-cool-and-stylish-profile-pictures-for-facebook-for-girls-2014-1931-AZ.jpg',
//     'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5naXJsc19wcm9maWxlX3BpY3R1cmVzX3NjcmVlbl8xXzE2Njc3MjczMTZfMDE3/screen-1.webp?fakeurl=1&type=.webp',
//     'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
//     'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2OQdcNU14XRv6rMBSCixQJdDkPZ8MAQf4D-sp70YMA&s',
//     'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8',
//     'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
//     'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
//     'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg',
//     'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
//     'https://imgv3.fotor.com/images/gallery/3D-Female-Profile-Picture.jpg',
//     'https://img.freepik.com/premium-photo/beautiful-girl-with-hijab-profile-picture_758374-127.jpg',
//     'https://marketplace.canva.com/EAF21qlw744/1/0/1600w/canva-blue-modern-facebook-profile-picture-mtu4sNVuKIU.jpg',
//     'https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532',
//     'https://cdn4.sharechat.com/cuteprofileDP_b0cb023_1662477438766_sc_cmprsd_75.jpg?tenant=sc&referrer=pwa-sharechat-service&f=rsd_75.jpg'
//
// ];

//
// const useDummyPosts = () => {
//
//     // const [tmp, setTmp] = useState([])
//     const [isLoading, setIsLoading] = useState(false)
//
//
//     // const posts =useDummyPostSelector.use.dummyPosts();
//     // const setPosts =useDummyPostSelector.use.setDummyPosts();
//     // const post =useDummyPostSelector.use.dummyPost();
//     // const setDummyPost =useDummyPostSelector.use.getDummyPostById();
//
//
//
//     const generateInstagramPosts = (count,username) => {
//
//         const tmp = [];
//         for (let i = 0; i < count; i++) {
//             tmp.push(generateInstagramPost());
//         }
//
//         setPosts(tmp.filter(post => post.createdBy===username));
//         setIsLoading(true);
//     };
//
//     const getDummyPostById=(id)=> {
//
//
//         setDummyPost(posts.find(post => post.id===+id));
//         setIsLoading(true);
//
//     }
//     const getSavedPosts = () => {
//
//
//
//         setIsLoading(true);
//         return posts;
//     };
//
//
//
//
//         return{isLoading,generateInstagramPosts,posts,getDummyPostById,post,getSavedPosts}
//
//     };
//
// export default useDummyPosts;
import { useState } from 'react';

const useDummyPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPost, setCurrentPost] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [followersPosts, setFollowersPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isFollowersLoading, setIsFollowersLoading] = useState(true);
    const [isFollowingLoading, setIsFollowingLoading] = useState(true);
    const [isAllPostsLoading, setIsAllPostsLoading] = useState(true);
    const [isAllUsersLoading, setIsAllUsersLoading] = useState(true);
    const [isSearchLoading, setIsSearchLoading] = useState(false);

    // Get posts by username
    const getPostsByUsername = (username) => {
        setIsLoading(true);
        const user = usersDocument.find(user => user.username === username);

        if (user) {
            const userPosts = postsDocument.filter(post => post.createdBy === user.uid);
            setUserPosts(userPosts);
        }
        setIsLoading(false);
    };

    // Get posts of followings
    const getPostsOfFollowings = (username) => {
        setIsLoading(true);
        const user = usersDocument.find(user => user.username === username);
        if (user) {
            const followersPosts = postsDocument.filter(post => user.following.includes(post.createdBy));
            setFollowersPosts(followersPosts);
        }
        setIsLoading(false);
    };

    // Get post by ID67
    const getPostById = (id) => {
        setIsLoading(true);
        const post = postsDocument.find(post => post.id === id);
        setCurrentPost(post);

        setIsLoading(false);
    };

    // Get saved posts by username
    const getSavedPostsByUsername = (username) => {
        setIsLoading(true);
        const user = usersDocument.find(user => user.username === username);
        if (user) {
            const savedPosts = postsDocument.filter(post => user.savedPosts.includes(post.id));
            setUserPosts(savedPosts);
        }
        setIsLoading(false);
    };

    // Get liked posts by username
    const getLikedPostsByUsername = (username) => {
        setIsLoading(true);
        const user = usersDocument.find(user => user.username === username);
        if (user) {
            const likedPosts = postsDocument.filter(post => user.likedPosts.includes(post.id));
            setUserPosts(likedPosts);
        }
        setIsLoading(false);
    };

    // Get user by username
    const getUserByUsername = (username) => {
        setIsUserLoading(true);
        const user = usersDocument.find(user => user.username === username);
        setIsUserLoading(false);
        return user;
    };

    // Get user by ID
    const getUserById = (id) => {
        setIsUserLoading(true);
        const user = usersDocument.find(user => user.uid === id);
        setIsUserLoading(false);
        return user;
    };

    // Get followers by username
    const getFollowers = (username, value = '') => {
        setIsFollowersLoading(true);
        const user = usersDocument.find(user => user.username === username);
        if (user) {
            let followers = usersDocument.filter(u => user.followers.includes(u.uid));
            if (value !== '') {
                followers = followers.filter(u => u.username.includes(value));
            }
            setFollowers(followers);
        }
        setIsFollowersLoading(false);
    };

    // Check if a user is following another user
    const isFollower = (username, myUsername) => {
        const user = usersDocument.find(user => user.username === username);
        const myUser = usersDocument.find(user => user.username === myUsername);
        if (user && myUser) {
            return myUser.following.includes(user.uid);
        }
    };

    // Get following by username
    const getFollowing = (username, value = '') => {
        setIsFollowingLoading(true);
        const user = usersDocument.find(user => user.username === username);
        if (user) {
            let following = usersDocument.filter(u => user.following.includes(u.uid));
            if (value !== '') {
                following = following.filter(u => u.username.includes(value));
            }
            setUserFollowing(following);
        }
        setIsFollowingLoading(false);
    };

    // Get all posts
    const getAllPosts = () => {
        setIsAllPostsLoading(true);
        setAllPosts(postsDocument);
        setIsAllPostsLoading(false);
    };

    // Get all users
    const getAllUsers = () => {
        setIsAllUsersLoading(true);
        setAllUsers(usersDocument);
        setIsAllUsersLoading(false);
    };

    // Search for users
    const searchUsers = (query) => {
        setIsSearchLoading(true);
        const lowerCaseQuery = query.toLowerCase();
        const results = usersDocument.filter(user =>
            user.username.toLowerCase().includes(lowerCaseQuery)
            || user.fullName.toLowerCase().includes(lowerCaseQuery) // if you want to search by name as well
        );
        setSearchedUsers(results);

        setIsSearchLoading(false);
    };

    // Check if a post is liked by a user
    const isPostLiked = (username, postId) => {
        const user = usersDocument.find(user => user.username === username);
        if (user) {
            return user.likedPosts.includes(postId);
        }
        return false;
    };

    // Check if a post is saved by a user
    const isPostSaved = (username, postId) => {
        const user = usersDocument.find(user => user.username === username);
        if (user) {
            return user.savedPosts.includes(postId);
        }
        return false;
    };

    // Get likes owners by post ID
    const getLikesOwnersByPostId = (postId) => {
        const post = postsDocument.find(post => post.id === postId);
        if (post) {
            return usersDocument.filter(user => post.likes.includes(user.uid));
        }
        return [];
    };

    return {
        isLoading,
        isUserLoading,
        isFollowersLoading,
        isFollowingLoading,
        isAllPostsLoading,
        isAllUsersLoading,
        isSearchLoading,

        isFollower,
        isPostLiked,
        isPostSaved,
        getPostsByUsername,
        getPostsOfFollowings,
        getPostById,
        getUserById,
        getSavedPostsByUsername,
        getLikedPostsByUsername,
        getUserByUsername,
        getFollowers,
        getFollowing,
        getAllPosts,
        getAllUsers,
        searchUsers,
        getLikesOwnersByPostId,
        currentPost,
        userPosts,
        followersPosts,
        followers,
        userFollowing,
        allPosts,
        allUsers,
        searchedUsers,
    };
};

export default useDummyPosts;





const usersDocument = [
    {
        "uid": "1",
        "username": "george_washington",
        "email": "george_washington@example.com",
        "fullName": "George Washington",
        "profilePicURL": "https://lh3.googleusercontent.com/-75PEaiU9U3s/VOIS2XRjj1I/AAAAAAAAA8g/hrSIcbRe89s/s2048/cool-and-stylish-profile-pictures-for-facebook-for-girls-2015-cool-and-stylish-profile-pictures-for-facebook-for-girls-2014-1931-AZ.jpg",
        "bio": "First President of the USA",
        "createdAt": "2024-05-24",
        "followers": ["2","10", "3", "4"],
        "following": ["5", "6"],
        "likedPosts": ["3", "4", "6", "9", "11", "13", "16", "20"],
        "posts": ["1", "2"],
        "savedPosts": ["3", "4"]
    },
    {
        "uid": "2",
        "username": "abraham_lincoln",
        "email": "abraham_lincoln@example.com",
        "fullName": "Abraham Lincoln",
        "profilePicURL": "https://image.winudf.com/v2/image1/bmV0LndsbHBwci5naXJsc19wcm9maWxlX3BpY3R1cmVzX3NjcmVlbl8xXzE2Njc3MjczMTZfMDE3/screen-1.webp?fakeurl=1&type=.webp",
        "bio": "16th President of the USA",
        "createdAt": "2024-05-24",
        "followers": ["10", "3", "5"],
        "following": ["4", "6"],
        "posts": ["3", "4"],
        "savedPosts": ["5", "6"],
        "likedPosts": ["1", "5", "7", "15", "17", "19"],
    },
    {
        "uid": "3",
        "username": "napoleon_bonaparte",
        "email": "napoleon_bonaparte@example.com",
        "fullName": "Napoleon Bonaparte",
        "profilePicURL": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
        "bio": "French military leader",
        "createdAt": "2024-05-24",
        "followers": [ "2", "4"],
        "following": ["5", "6"],
        "posts": ["5", "6"],
        "savedPosts": ["7", "8"],
        "likedPosts": ["1", "2", "6", "8", "10", "12", "14", "18", "20"],
    },
    {
        "uid": "4",
        "username": "cleopatra",
        "email": "cleopatra@example.com",
        "fullName": "Cleopatra",
        "profilePicURL": "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
        "bio": "Queen of Egypt",
        "createdAt": "2024-05-24",
        "followers": [ "2", "3"],
        "following": ["5", "6"],
        "posts": ["7", "8"],
        "savedPosts": ["9", "10"],
        "likedPosts": ["2", "6", "9", "12", "15", "16"],
    },
    {
        "uid": "5",
        "username": "marie_curie",
        "email": "marie_curie@example.com",
        "fullName": "Marie Curie",
        "profilePicURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2OQdcNU14XRv6rMBSCixQJdDkPZ8MAQf4D-sp70YMA&s",
        "bio": "Physicist and Chemist",
        "createdAt": "2024-05-24",
        "followers": [ "2", "4"],
        "following": ["6", "7"],
        "posts": ["9", "10"],
        "savedPosts": ["11", "12"],
        "likedPosts": ["2", "4", "7", "9", "10", "13", "16"],
    },
    {
        "uid": "6",
        "username": "albert_einstein",
        "email": "albert_einstein@example.com",
        "fullName": "Albert Einstein",
        "profilePicURL": "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
        "bio": "Theoretical physicist",
        "createdAt": "2024-05-24",
        "followers": [ "2", "5"],
        "following": ["3", "4"],
        "posts": ["11", "12"],
        "savedPosts": ["13", "14"],
        "likedPosts": ["5", "7", "8", "14", "17", "18"],
    },
    {
        "uid": "7",
        "username": "isaac_newton",
        "email": "isaac_newton@example.com",
        "fullName": "Isaac Newton",
        "profilePicURL": "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
        "bio": "Mathematician and physicist",
        "createdAt": "2024-05-24",
        "followers": ["10", "2", "6"],
        "following": ["3", "4"],
        "posts": ["13", "14"],
        "savedPosts": ["15", "16"],
        "likedPosts": ["14", "18"],
    },
    {
        "uid": "8",
        "username": "galileo_galilei",
        "email": "galileo_galilei@example.com",
        "fullName": "Galileo Galilei",
        "profilePicURL": "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        "bio": "Astronomer and physicist",
        "createdAt": "2024-05-24",
        "followers": ["10", "2", "3"],
        "following": ["4", "5"],
        "posts": ["15", "16"],
        "savedPosts": ["17", "18"],
        "likedPosts": ["19"],
    },
    {
        "uid": "9",
        "username": "leonardo_da_vinci",
        "email": "leonardo_da_vinci@example.com",
        "fullName": "Leonardo da Vinci",
        "profilePicURL": "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg",
        "bio": "Polymath",
        "createdAt": "2024-05-24",
        "followers": [ "2", "8"],
        "following": ["3", "4"],
        "posts": ["17", "18"],
        "savedPosts": ["19", "20"],
        "likedPosts": [],
    },
    {
        "uid": "10",
        "username": "ennouass",
        "email": "ennouass@example.com",
        "fullName": "Ennouass",
        "profilePicURL": "https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944",
        "bio": "Just a cool username",
        "createdAt": "2024-05-24",
        "followers": ["1", "2", "3"],
        "following": ["1","2","7","8"],
        "posts": ["19", "20"],
        "savedPosts": ["1", "2"],
        "likedPosts": ["16","1"],
    }
];



const postsDocument = [
    {
        "id": "1",
        "caption": "Sunset at the beach",
        "imgURL": "https://th.bing.com/th/id/OIP.jPINN5ICJ3Z2qM9K1D4VHgHaFQ?rs=1&pid=ImgDetMain",
        "likes": ["2", "3"],
        "comments": [
            {"createdBy": "2", "comment": "Beautiful view!", "createdAt": "2024-05-24", "postId": "1"},
            {"createdBy": "3", "comment": "I wish I were there.", "createdAt": "2024-05-24", "postId": "1"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "1"
    },
    {
        "id": "2",
        "caption": "Beautiful mountains",
        "imgURL": "https://wallpaperaccess.com/full/4723250.jpg",
        "likes": ["3", "4"],
        "comments": [
            {"createdBy": "4", "comment": "Stunning scenery!", "createdAt": "2024-05-24", "postId": "2"},
            {"createdBy": "5", "comment": "Amazing shot!", "createdAt": "2024-05-24", "postId": "2"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "1"
    },
    {
        "id": "3",
        "caption": "City skyline",
        "imgURL": "https://wallpaperaccess.com/full/2439702.png",
        "likes": ["1", "4"],
        "comments": [
            {"createdBy": "1", "comment": "Love this city!", "createdAt": "2024-05-24", "postId": "3"},
            {"createdBy": "4", "comment": "Great perspective!", "createdAt": "2024-05-24", "postId": "3"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "2"
    },
    {
        "id": "4",
        "caption": "Free images collection",
        "imgURL": "https://buffer.com/library/content/images/2023/10/free-images.jpg",
        "likes": ["1", "5"],
        "comments": [
            {"createdBy": "5", "comment": "So useful!", "createdAt": "2024-05-24", "postId": "4"},
            {"createdBy": "6", "comment": "Thanks for sharing!", "createdAt": "2024-05-24", "postId": "4"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "2"
    },
    {
        "id": "5",
        "caption": "Nature's beauty",
        "imgURL": "https://buffer.com/library/content/images/2023/10/free-images.jpg",
        "likes": ["2", "6"],
        "comments": [
            {"createdBy": "2", "comment": "Nature at its best!", "createdAt": "2024-05-24", "postId": "5"},
            {"createdBy": "6", "comment": "Absolutely stunning!", "createdAt": "2024-05-24", "postId": "5"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "3"
    },
    {
        "id": "6",
        "caption": "Autumn leaves",
        "imgURL": "https://buffer.com/library/content/images/2023/10/free-images.jpg",
        "likes": ["1", "4"],
        "comments": [
            {"createdBy": "1", "comment": "I love autumn!", "createdAt": "2024-05-24", "postId": "5"},
            {"createdBy": "4", "comment": "Such vibrant colors!", "createdAt": "2024-05-24", "postId": "5"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "3"
    },
    {
        "id": "7",
        "caption": "Mountain trek",
        "imgURL": "https://th.bing.com/th/id/OIP.pv7Cd1crIU7DYmTjAEZaoQHaEo?rs=1&pid=ImgDetMain",
        "likes": ["2", "5"],
        "comments": [
            {"createdBy": "2", "comment": "Adventure awaits!", "createdAt": "2024-05-24", "postId": "7"},
            {"createdBy": "5", "comment": "Breathtaking view!", "createdAt": "2024-05-24", "postId": "7"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "4"
    },
    {
        "id": "8",
        "caption": "Desert beauty",
        "imgURL": "https://th.bing.com/th/id/OIP.7mJUo8vxqSw1cTZZf-CM_wHaFj?rs=1&pid=ImgDetMain",
        "likes": ["3", "6"],
        "comments": [
            {"createdBy": "3", "comment": "Silent and serene!", "createdAt": "2024-05-24", "postId": "8"},
            {"createdBy": "6", "comment": "Looks hot!", "createdAt": "2024-05-24", "postId": "8"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "4"
    },
    {
        "id": "9",
        "caption": "Ocean waves",
        "imgURL": "https://images5.alphacoders.com/104/thumb-1920-1046568.jpg",
        "likes": ["1", "4"],
        "comments": [
            {"createdBy": "1", "comment": "So calming!", "createdAt": "2024-05-24", "postId": "9"},
            {"createdBy": "4", "comment": "I can hear the waves.", "createdAt": "2024-05-24", "postId": "9"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "5"
    },
    {
        "id": "10",
        "caption": "Snowy peaks",
        "imgURL": "https://cdn.pixabay.com/photo/2022/11/17/08/47/brown-bear-7597616_1280.jpg",
        "likes": ["3", "5"],
        "comments": [
            {"createdBy": "3", "comment": "Majestic mountains!", "createdAt": "2024-05-24", "postId": "10"},
            {"createdBy": "5", "comment": "So cold and beautiful!", "createdAt": "2024-05-24", "postId": "10"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "5"
    },
    {
        "id": "11",
        "caption": "City lights",
        "imgURL": "https://cdn.pixabay.com/photo/2020/11/20/16/26/labrador-5762115_960_720.jpg",
        "likes": ["1", "2"],
        "comments": [
            {"createdBy": "1", "comment": "City never sleeps!", "createdAt": "2024-05-24", "postId": "11"},
            {"createdBy": "2", "comment": "Bright lights!", "createdAt": "2024-05-24", "postId": "11"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "6"
    },
    {
        "id": "12",
        "caption": "Lush forest",
        "imgURL": "https://cdn.pixabay.com/photo/2021/03/08/12/31/oxford-shoes-6078993_960_720.jpg",
        "likes": ["3", "4"],
        "comments": [
            {"createdBy": "3", "comment": "Nature's embrace.", "createdAt": "2024-05-24", "postId": "12"},
            {"createdBy": "4", "comment": "So green!", "createdAt": "2024-05-24", "postId": "12"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "6"
    },
    {
        "id": "13",
        "caption": "Golden sunrise",
        "imgURL": "https://cdn.pixabay.com/photo/2024/05/12/09/28/brown-bear-8756478_1280.png",
        "likes": ["1", "5"],
        "comments": [
            {"createdBy": "1", "comment": "Good morning!", "createdAt": "2024-05-24", "postId": "13"},
            {"createdBy": "5", "comment": "A new day begins.", "createdAt": "2024-05-24", "postId": "13"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "7"
    },
    {
        "id": "14",
        "caption": "Serene lake",
        "imgURL": "https://cdn.pixabay.com/photo/2024/04/16/16/25/ai-generated-8700383_960_720.jpg",
        "likes": ["3", "7"],
        "comments": [
            {"createdBy": "3", "comment": "Peaceful.", "createdAt": "2024-05-24", "postId": "14"},
            {"createdBy": "7", "comment": "I want to be there.", "createdAt": "2024-05-24", "postId": "14"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "7"
    },
    {
        "id": "15",
        "caption": "Wildflowers",
        "imgURL": "https://cdn.pixabay.com/photo/2022/11/04/13/43/car-7569896_960_720.jpg",
        "likes": [],
        "comments": [
            {"createdBy": "2", "comment": "Such vibrant colors!", "createdAt": "2024-05-24", "postId": "15"},
            {"createdBy": "4", "comment": "Nature's beauty.", "createdAt": "2024-05-24", "postId": "15"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "8"
    },
    {
        "id": "16",
        "caption": "Calm river",
        "imgURL": "https://cdn.pixabay.com/photo/2024/05/06/00/39/one-person-8742116_960_720.jpg",
        "likes": ["1", "5"],
        "comments": [
            {"createdBy": "1", "comment": "So tranquil.", "createdAt": "2024-05-24", "postId": "16"},
            {"createdBy": "5", "comment": "I can hear the water.", "createdAt": "2024-05-24", "postId": "16"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "8"
    },
    {
        "id": "17",
        "caption": "Forest trail",
        "imgURL": "https://cdn.pixabay.com/photo/2023/05/19/17/18/rose-beetle-8004990_1280.jpg",
        "likes": ["2", "6"],
        "comments": [
            {"createdBy": "2", "comment": "Let's go hiking!", "createdAt": "2024-05-24", "postId": "17"},
            {"createdBy": "6", "comment": "Looks inviting.", "createdAt": "2024-05-24", "postId": "17"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "9"
    },
    {
        "id": "18",
        "caption": "Rolling hills",
        "imgURL": "https://t3.ftcdn.net/jpg/07/49/30/54/360_F_749305457_SipDhXs5ijYs4l537m4gU6hYwD051Axp.jpg",
        "likes": ["3", "7"],
        "comments": [
            {"createdBy": "3", "comment": "Beautiful landscape!", "createdAt": "2024-05-24", "postId": "18"},
            {"createdBy": "7", "comment": "So serene.", "createdAt": "2024-05-24", "postId": "18"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "9"
    },
    {
        "id": "19",
        "caption": "Golden hour",
        "imgURL": "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "likes": ["2", "8"],
        "comments": [
            {"createdBy": "2", "comment": "Perfect time of day.", "createdAt": "2024-05-24", "postId": "19"},
            {"createdBy": "8", "comment": "So magical!", "createdAt": "2024-05-24", "postId": "19"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "10"
    },
    {
        "id": "20",
        "caption": "Secluded beach",
        "imgURL": "https://imgupscaler.com/images/samples/Imgupscaler_2_2x.webp",
        "likes": ["1", "3"],
        "comments": [
            {"createdBy": "1", "comment": "Hidden gem!", "createdAt": "2024-05-24", "postId": "20"},
            {"createdBy": "3", "comment": "I want to go there.", "createdAt": "2024-05-24", "postId": "20"}
        ],
        "createdAt": "2024-05-24",
        "createdBy": "10"
    }
];



