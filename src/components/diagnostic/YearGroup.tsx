import { MonthGroup } from "./MonthGroup";
import { YearGroup as YearGroupType } from "./types";

interface YearGroupProps {
  yearGroup: YearGroupType;
  monthNames: string[];
}

export const YearGroup = ({ yearGroup, monthNames }: YearGroupProps) => {
  return (
    <div key={yearGroup.year}>
      <h2 className="text-2xl font-bold mb-4">{yearGroup.year}</h2>
      <div className="space-y-6">
        {yearGroup.months.map((monthGroup) => (
          <MonthGroup
            key={monthGroup.month}
            monthGroup={monthGroup}
            monthName={monthNames[monthGroup.month]}
          />
        ))}
      </div>
    </div>
  );
};