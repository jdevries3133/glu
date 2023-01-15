import { z } from "zod";
import { UseFormProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = <TSchema extends z.ZodType>(
  props: Omit<UseFormProps<z.infer<TSchema>>, "resolver"> & {
    schema: TSchema;
  }
) =>
  useForm<z.infer<TSchema>>({
    ...props,
    resolver: zodResolver(props.schema),
  });
