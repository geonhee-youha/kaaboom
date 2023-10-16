export const globalMenus = [
  {
    link: "",
    label: "Artists",
  },
  {
    link: "",
    label: "How it works",
  },
  {
    link: "",
    label: "Join as artist",
  },
];

export const artistsMenus = [
  {
    link: "/explore/artists",
    label: "All artists",
  },
  {
    link: "/explore/groups",
    label: "Find with group",
  },
  {
    link: "/explore/agencies",
    label: "Find with agency",
  },
];

export const sorts = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "price_asc",
    label: "Price (asc)",
  },
  {
    value: "price_desc",
    label: "Price (desc)",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "alphavetical",
    label: "Alphabetical",
  },
];

export const genders = [
  {
    value: "M",
    label: "Male",
  },
  {
    value: "F",
    label: "Female",
  },
  {
    value: "O",
    label: "Other",
  },
];

export type InputProps = {
  value: string;
  error?: boolean;
  helperText?: string;
};

export const inputDefaultProps: InputProps = {
  value: "",
};

export type FileProps = {
  value: string;
  file: File | null;
  error?: boolean;
  helperText?: string;
};

export const fileDefaultProps: FileProps = {
  value: "",
  file: null,
};

export type SelectProps = {
  value: string;
  label: string;
  group?: string;
};

export const selectDefaultProps: SelectProps = {
  value: "",
  label: "",
};
