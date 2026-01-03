import InputStep from "../steps/InputStep";
import ChoiceGrid from "./ChoiceGrid";
import MultiSelectList from "./MultiSelectList";
import SelectBox from "./SelectBox";
import SearchableSelect from "./SearchableSelect";
import { COUNTRIES } from "../../../lib/data/countries";

export default function StepRenderer({ step }) {
  if (step.type === "input") {
    return (
      <InputStep
        id={step.id}
        placeholderKey={step.placeholderKey}
        unit={step.unit}
        inputMode={step.inputMode}
      />
    );
  }

  if (step.type === "choice") {
    const cols = step.options?.length === 4 ? 2 : 1;
    return <ChoiceGrid id={step.id} options={step.options} columns={cols} />;
  }

  if (step.type === "yn") {
    return <ChoiceGrid id={step.id} options={step.options} columns={2} />;
  }

  if (step.type === "multi") {
    return <MultiSelectList id={step.id} options={step.options} />;
  }

  if (step.type === "select") {
    return (
      <SearchableSelect
        id={step.id}
        options={COUNTRIES}
        placeholderKey={step.placeholderKey}
      />
    );
  }

  if (step.type === "time") {
    return (
      <SelectBox
        id={step.id}
        options={step.options}
        placeholderKey={step.placeholderKey}
      />
    );
  }

  return <div className="text-white">Unknown step type: {step.type}</div>;
}
