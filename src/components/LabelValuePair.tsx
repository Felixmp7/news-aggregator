interface Props {
    label: string;
    value: string;
}

export const LabelValuePair = ({ label, value }: Props) => (
    <span className="block">{label} <strong>{value}</strong></span>
)
