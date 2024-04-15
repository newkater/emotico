import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface IProps {
  skills: Skill[];
  values: string[];
  defaultValues?: string[];
  setValues: (values: string[]) => void;
}

export const SkillSelect: FC<IProps> = ({ skills, values, setValues, defaultValues =[]}) => {
  const handleCheckedChange = (checked: boolean, id: string) => {
    const newSkills = values.filter(skill => skill !== id)
    if(checked){
      newSkills.push(id)
    }
    setValues(newSkills)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="text-md">
          Select skills
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Skills:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {skills.map((skill) => (
          <DropdownMenuCheckboxItem
            className="text-md"
            key={skill.id}
            onCheckedChange={(checked) => handleCheckedChange(checked, skill.id)}
            checked={values.includes(skill.id)}
          >
            {skill.name}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setValues(defaultValues)}
          >
            Reset
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
