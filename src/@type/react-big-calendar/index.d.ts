declare module "react-big-calendar/lib/localizers/date-fns" {
  import { DateLocalizer } from "react-big-calendar";
  import { Locale } from "date-fns";

  interface DateFnsLocalizerOptions {
    format: (...args: any[]) => string;
    parse: (...args: any[]) => Date;
    startOfWeek: (...args: any[]) => Date;
    getDay: (...args: any[]) => number;
    locales: { [key: string]: Locale };
  }

  export function dateFnsLocalizer(options: DateFnsLocalizerOptions): DateLocalizer;
}
