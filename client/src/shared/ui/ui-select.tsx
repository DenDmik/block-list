import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { UiTextFieldProps } from "./ui-text-field";

export type TSelectField = UiTextFieldProps & {
  names: string[] | null | undefined;
  theName: string | undefined;
  field: ControllerRenderProps<{
    name: string;
    company: string;
    requestTitle: string;
    description: string;
    goal: string;
    techStack: string;
    applicationScope: string;
    limitations: string;
    teamInvolvement: string;
    preferredTime: string;
    additionalMaterials: string;
    preferredSpecialist:string;
  }>;
};

export function UiSelectField({
  names,
  theName,
  inputProps,
  field,
}: TSelectField) {
  const [namesVisible, setNamesVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && 
          !wrapperRef.current.contains(event.target as Node)) {
        setNamesVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Обработчик выбора значения
  const handleSelect = (value: string) => {
    field.onChange(value);
    setNamesVisible(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {theName ? (
        <input
          {...field}
          {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
          value={field.value || ""}
          readOnly
          placeholder={theName}
          className="rounded border border-slate-300 focus:border-teal-600 px-2 py-1 outline-none w-full"
          onClick={() => setNamesVisible(true)}
        />
      ) : (
        <button
          type="button"
          className="rounded border border-slate-300 focus:border-teal-600 px-2 py-1 outline-none w-full"
          onClick={() => setNamesVisible(true)}
        >
          {field.value || "Не знаю кого выбирать"}
        </button>
      )}

      {namesVisible && (
        <ul
          role="listbox"
          className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full max-h-60 overflow-auto"
        >
          {names?.map((option, i) => (
            <li
              key={i}
              role="option"
              onClick={() => handleSelect(option)}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                field.value === option ? "bg-blue-50" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}