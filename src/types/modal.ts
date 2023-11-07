export type CoachingModalProps = {
  open: boolean;
  cancel: {
    show: boolean;
    title: React.ReactNode;
    disabled: boolean;
    onClick: () => void;
  };
  confirm: {
    title: React.ReactNode;
    onClick: () => void;
    onConfirm: (e?: any) => void;
  };
  value: number;
};

export const coachingModalDefaultProps = {
  open: false,
  cancel: {
    show: true,
    title: "취소",
    disabled: false,
    onClick: () => {},
  },
  confirm: {
    title: "확인",
    onClick: () => {},
    onConfirm: () => {},
  },
  value: 4,
};

export type IntimacyModalProps = {
  open: boolean;
  cancel: {
    show: boolean;
    title: React.ReactNode;
    disabled: boolean;
    onClick: () => void;
  };
  confirm: {
    title: React.ReactNode;
    onClick: () => void;
    onConfirm: (e?: any) => void;
  };
  value: number;
};

export const intimacyModalDefaultProps = {
  open: false,
  cancel: {
    show: true,
    title: "취소",
    disabled: false,
    onClick: () => {},
  },
  confirm: {
    title: "확인",
    onClick: () => {},
    onConfirm: () => {},
  },
  value: 4,
};

export type FilterDrawerProps = {
  open: boolean;
  type: string;
};

export const filterDrawerDefaultProps = {
  open: false,
  type: "food",
};

export type DateModalProps = {
  open: boolean;
};

export const dateModalDefaultProps = {
  open: false,
};
