export interface Note {
  id: number;
  deadline: number;
}

export interface StickyListProps {
  onClose: () => void;
}

export interface StickyListProps {
  onClose: () => void;
  deadline?: number;
  createdDate: number;
}
