import { Portal } from "@chakra-ui/react/portal";
import { Select } from "@chakra-ui/react/select";
import type { ListCollection } from "@chakra-ui/react/collection";

type uniqueMonthListCollectionProps = {
  uniqueMonthListCollection: ListCollection<{
    label: string;
    value: string;
  }>;
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectBox = ({
  uniqueMonthListCollection, selectedMonth, setSelectedMonth
}: uniqueMonthListCollectionProps) => {

  return (
    <Select.Root
      collection={uniqueMonthListCollection}
      value={[selectedMonth]}
      onValueChange={(e) => setSelectedMonth(e.value[0])}
      size="md"
      defaultValue={[selectedMonth]} //初期値は現在の年月
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="年月を選択してください" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="white"
            borderColor="gray.200"
            boxShadow="md"
            className="chakra-theme light"
          >
            {uniqueMonthListCollection.items.map((uniqueMonth) => (
              <Select.Item
                item={uniqueMonth}
                key={uniqueMonth.value}
                bg="white"
                color="black"
                _hover={{ bg: "gray.50" }}
                _selected={{ bg: "blue.50", color: "blue.600" }}
              >
                {uniqueMonth.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
