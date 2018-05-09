export const grant_type = process.env.REACT_APP_GRANT_TYPE;
export const client_id = process.env.REACT_APP_CLIENT_ID;
export const client_secret = process.env.REACT_APP_CLIENT_SECRET;
export const device = process.env.REACT_APP_DEVICE; // 1: Android; 2: iOS; 3: Browser
export const deviceToken = process.env.REACT_APP_DEVICE_TOKEN;
export const userDataKey = process.env.REACT_APP_USER_DATA_KEY;
export const optionsBanner = {
    loop:true,
    margin:0,
    nav: true,
    dots: false,
    autoplay:true,
    items: 1,
    autoplayHoverPause:true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
};

export const optionsCategory = {
    loop:false,
    margin:15,
    nav: true,
    dots: false,
    autoplay:true,
    rewind: true,
    autoplayHoverPause:true,
    responsive: {
        0: {
            items: 1
        },
        640: {
            items: 2
        },
        992: {
            items: 3
        },
        1024: {
            items: 4
        },
        1230: {
            items: 5
        }
    },
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
};
