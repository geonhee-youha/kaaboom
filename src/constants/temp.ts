import { blue, cyan, orange, purple, yellow } from "@mui/material/colors";

export const categories = [
    {
        label: "아이돌",
        value: "idol",
        icon: "stars",
        color: purple[500],
    },
    {
        label: "배우",
        value: "actor",
        icon: "user-tie-hair",
        color: orange[500],
    },
    {
        label: "가수",
        value: "singer",
        icon: "microphone-stand",
        color: cyan[500],
    },
    {
        label: "인플루언서",
        value: "influencer",
        icon: "circle-nodes",
        color: blue[500],
    },
    {
        label: "스포츠",
        value: "athlete",
        icon: "medal",
        color: yellow[500],
    },
];

export const artists = [
    {
        id: "1",
        name: "D.O.",
        thumbnail: "/temp/artists/do.webp",
    },
    {
        id: "2",
        name: "ZICO",
        thumbnail: "/temp/artists/zico.webp",
    },
    {
        id: "3",
        name: "CHEN",
        thumbnail: "/temp/artists/chen.webp",
    },
    {
        id: "4",
        name: "BAEKHYUN",
        thumbnail: "/temp/artists/baekhyun.webp",
    },
    {
        id: "5",
        name: "XIUMIN",
        thumbnail: "/temp/artists/xiumin.webp",
    },
];

export const missions = [
    {
        id: "1",
        state: "opened",
        artist: artists[0],
        user: {
            id: "1",
            name: "Jinho You",
            thumbnail: "/temp/user/you.webp",
        },
        title: "팔레스타인 하마스 난민 기부 미션",
        amount: {
            goal: 30000000,
            current: 8000000,
        },
        dueDate: new Date("2023-12-01"),
    },
    {
        id: "2",
        state: "opened",
        artist: artists[1],
        user: {
            id: "1",
            name: "Jinho You",
            thumbnail: "/temp/user/you.webp",
        },
        title: "팔레스타인 하마스 난민 기부 미션",
        amount: {
            goal: 30000000,
            current: 6000000,
        },
        dueDate: new Date("2023-12-01"),
    },
    {
        id: "3",
        state: "opened",
        artist: artists[2],
        user: {
            id: "1",
            name: "Jinho You",
            thumbnail: "/temp/user/you.webp",
        },
        title: "팔레스타인 하마스 난민 기부 미션",
        amount: {
            goal: 30000000,
            current: 6000000,
        },
        dueDate: new Date("2023-12-01"),
    },
    {
        id: "4",
        state: "completed",
        artist: artists[0],
        user: {
            id: "1",
            name: "Jinho You",
            thumbnail: "/temp/user/1.webp",
        },
        title: "군장병 맹호부대 황금마차 지원 프로젝트",
        amount: {
            goal: 10000000,
            current: 24638000,
        },
        dueDate: new Date("2023-10-24"),
        src: `/temp/videos/1.mp4`,
    },
];
