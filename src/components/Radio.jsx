import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FaCircle } from "react-icons/fa";


const RadioGroup = ({ className, ...props }) => (
  <RadioGroupPrimitive.Root
    className={`flex gap-2 ${className || ""}`}
    {...props}
  />
);

const RadioGroupItem = ({ className, ...props }) => (
  <RadioGroupPrimitive.Item
    className={`aspect-square h-4 w-4 rounded-full border border-red-600 text-red-600 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <FaCircle className="h-2.5 w-2.5 text-red-600" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
);

export { RadioGroup, RadioGroupItem };