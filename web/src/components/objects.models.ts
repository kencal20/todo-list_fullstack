interface formProps {
  _id?: string;
  title: string;
  details: string;
  dueDate: string;
  status: "pending" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  category: "work" | "personal" | "shopping" | "health";
}

interface inputProps {
  label: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  className?: string;
  children?: React.ReactNode;
}

interface cardProps {
  title: string;
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export interface componentProps {
  formProps: formProps;
  inputProps: inputProps;
  cardProps: cardProps;
}
