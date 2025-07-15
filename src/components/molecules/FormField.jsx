import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ label, error, className, ...props }) => {
  return (
    <div className={className}>
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;