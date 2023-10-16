import { IconName } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash";

export type NationProps = {
  name: string;
  thumbnail: string;
};

export type LinkProps = {
  type: string;
  link: string;
  label?: string;
};

export type VideoTypeProps = {
  value: string;
  label: string;
  maxVideoLength: number;
  maxLetters: number;
  price: number;
};

export const videoTypes: VideoTypeProps[] = [
  {
    value: "mini",
    label: "Mini",
    maxVideoLength: 15,
    maxLetters: 45,
    price: 20,
  },
  {
    value: "long",
    label: "Long",
    maxVideoLength: 45,
    maxLetters: 200,
    price: 90,
  },
];

export const whomTypes = [
  {
    value: "someoneElse",
    label: "Someone else",
  },
  {
    value: "myself",
    label: "Myself",
  },
];

export const toOrFromTypes = [
  {
    value: "he",
    label: "He/Him",
  },
  {
    value: "she",
    label: "She/Her",
  },
  {
    value: "they",
    label: "They/Them",
  },
];

export const deliverySpeeds = [
  {
    value: "standard",
    label: "Standard",
    description: "Up to 7 days",
  },
  {
    value: "24hr",
    label: "24hr Delivery",
    description: "Up to 24 hours",
  },
];

export const paymentMethods = [
  // {
  //   value: "card",
  //   label: "card",
  // }, //추후 추가
  {
    value: "paypal",
    label: "PayPal",
  },
];

export const howKaboomWorks : {icon: IconName, title: string, description: string} []= [
  {
    icon: 'search',
    title: "Find a artist",
    description: "Browse thousands of stars offering personalized videos.",
  },
  {
    icon: 'pen',
    title: "Tell them what to say",
    description:
      "During checkout, you’ll provide the details the celeb will need to make the perfect personalized video.",
  },
  {
    icon: 'envelope-open',
    title: "Get your video",
    description:
      "Celebs have up to 7 days to complete your request. When it’s ready, we’ll send it directly to you.",
  },
  {
    icon: 'share-alt',
    title: "Share with loved ones",
    description:
      "Send the video to friends and family and don’t forget to capture their priceless reactions.",
  },
];

export const howKaboomOrder = [
  {
    title: "Pick a celebrity",
    description: "Browse thousands of stars offering personalized videos.",
  },
  {
    title: "Write your request",
    description:
      "The more details you give, the more personalized your video will be.",
  },
  {
    title: "Review and pay",
    description:
      "Choose your delivery speed and enter your payment information.",
  },
];

export type FaqProps = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

export const faqs: FaqProps[] = [
  {
    question: "How can I check the status of my personalized Cameo video?",
    answer:
      "You can check the status of your Cameo request through the link provided in your confirmation email.",
  },
  {
    question:
      "Is there anything celebrities won’t do in my personalized Cameo video?",
    answer: (
      <>
        Cameo celebrities love connecting with their fans. While they are pretty
        open to most suggestions, celebrities have final say whether they will
        accept or decline a video. For a list of things that we don't allow,
        please take a look at our
        <a target="_blank" href="https://naver.com">
          Acceptable Use Policy and Community Guidelines
        </a>
      </>
    ),
  },
  {
    question: "What should (and shouldn’t) I put in my request?",
    answer: (
      <>
        So long as your request isn't inappropriate or in violation of our{" "}
        <a target="_blank" href="https://naver.com">
          Acceptable Use Policy or Community Guidelines
        </a>
        , feel free to get as creative as you'd like with your request! The
        celebrities do have the right to decline any requests at their own
        discretion, though. Oh, and don't put any links in the request!
      </>
    ),
  },
  {
    question: "What’s the turnaround time for a personalized Cameo video?",
    answer: (
      <>
        Once you send your request over to a celebrity, they'll have up to 7
        days to fulfill the request (for a regular Cameo) or 24 hours (for 24hr
        delivery.) You can check the status of your request in the Cameo app or
        through the link in your confirmation email. When the Talent fulfills
        your request, you'll receive a notification and email with a link to
        view the completed personalized Cameo video!
      </>
    ),
  },
  {
    question:
      "What if the celebrity doesn’t accept or fulfill my request in time?",
    answer: <>If the request is declined or expires, we’ll notify you.</>,
  },
  {
    question: "Do I get to keep my personalized Cameo video?",
    answer: (
      <>
        You sure do! You can always download the Cameo to your device, and it
        will live in your Cameo account.
      </>
    ),
  },
  {
    question:
      "I’m not happy with my personalized Cameo video. Is there anything I can do?",
    answer: (
      <>
        Unfortunately, personalized Cameo videos are non-refundable. If you
        believe your video is unusable or completely missed the mark of your
        request, please reach out to hello@cameo.com so our team can take a
        look.
      </>
    ),
  },
  {
    question: "Can my video include closed captioning?",
    answer: (
      <>
        Yes! Once you receive your Cameo video link, you'll have the option to
        turn on 'CC' at the top right corner of the video player.
      </>
    ),
  },
];
